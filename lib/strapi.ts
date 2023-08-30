import 'server-only';

import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { GetAttributesValues } from '@strapi/strapi';
import { StrapiQuery, cms } from '@/utils/cms';
import { unified } from 'unified';
import QueryString from 'qs';

// memoize/cache the creation of the markdown parser
let parser: ReturnType<typeof getParser> | undefined;

async function getParser() {
  return unified().use(remarkParse).use(remarkRehype).use(remarkGfm).use(rehypeStringify);
}

function getCachedParser() {
  if (!parser) {
    parser = getParser().catch((e) => {
      parser = undefined;
      throw e;
    });
  }
  return parser;
}

export async function getArticleBySlug(slug: string) {
  const articlesQuery = cms(`articles`, {
    filters: { slug: { $eq: slug } },
    populate: {
      hero: { populate: '*' },
      blocks: { populate: '*' },
      seo: { populate: '*' },
      cover: { populate: '*' },
      tags: { populate: '*' },
      authors: { populate: ['username', 'jobTitle', 'avatar'] },
    },
  });
  // console.log({ articlesQuery });

  // Strapi allows findOne, but not by slug. This filter will only return 1 article as slugs are UIDs
  // So take the first item and ignore any others.
  const articles: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
    articlesQuery
  ).then((res) => res.json());

  const article = articles.data[0];
  const transformedArticle = await transformArticleContent(article);

  return transformedArticle;
}

export async function getRiderById(id: number) {
  const ridersQuery = cms(`riders/${id}`, {
    populate: {
      team: { populate: { sponsors: { populate: { logos: { populate: '*' } } } } },
      headshot: { populate: '*' },
    },
  });
  // console.log({ ridersQuery });

  const rider: Strapi.Response<GetAttributesValues<'api::rider.rider'>> = await fetch(
    ridersQuery
  ).then((res) => res.json());

  return rider;
}

async function transformArticleContent(article: GetAttributesValues<'api::article.article'>) {
  if (!article) return undefined;

  // We use a reserved key 'content' to refer to rich text content across all content-types in Strapi

  const blocksToParse =
    article.blocks?.map((block) =>
      'content' in block && !!block.content ? mdToHtml(block.content) : undefined
    ) ?? [];

  // Parse the markdown on article retrieval
  const parsedBlocks = await Promise.all(blocksToParse).catch((e) => {
    throw new Error("Couldn't parse all content blocks", e);
  });

  // replace the raw content found in all blocks with the resulting html string
  article.blocks = article.blocks?.map((block, index) =>
    'content' in block ? { ...block, content: (parsedBlocks[index]?.value as string) ?? '' } : block
  );

  return article;
}

async function mdToHtml(raw: string) {
  const cachedParser = await getCachedParser();
  const html = await cachedParser.process(raw);

  return html;
}

export async function getArticlesPreview(query?: StrapiQuery) {
  const articlesQuery = cms(`articles`, query);
  // console.log({ articlesQuery });

  const articles: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
    articlesQuery
  ).then((res) => res.json());

  return articles;
}

import 'server-only';

import fs from 'fs';
import matter from 'gray-matter';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { GetAttributesValues } from '@strapi/strapi';
import { cms } from '@/utils/cms';
import { join } from 'path';
import { unified } from 'unified';

// memoize/cache the creation of the markdown parser, this sped up the
// building of the blog from ~60s->~10s
let p: ReturnType<typeof getParserPre> | undefined;

async function getParserPre() {
  return unified().use(remarkParse).use(remarkRehype).use(remarkGfm).use(rehypeStringify);
}

function getParser() {
  if (!p) {
    p = getParserPre().catch((e) => {
      p = undefined;
      throw e;
    });
  }
  return p;
}

export async function getArticleBySlug(slug: string) {
  const query = cms(`articles`, {
    filter: { slug: { $eq: slug } },
    populate: ['blocks', 'seo'],
  });

  const article: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
    query
  ).then((res) => res.json());

  return article.data[0];
}

export async function mdToHtml(raw: string) {
  const parser = await getParser();
  const html = await parser.process(raw);

  return html;
}

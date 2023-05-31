import { Block } from '@/components/strapi/components/block';
import { container } from '@/components/tailwind';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';

type ArticleProps = GetAttributesValues<'api::article.article'>;

export function Article(article: ArticleProps) {
  return (
    <article className={clsx(container, 'prose prose-slate w-full lg:prose-lg')}>
      {article.blocks?.map((block, i) => (
        <Block key={i} type={block.__component} block={block} />
      ))}
    </article>
  );
}

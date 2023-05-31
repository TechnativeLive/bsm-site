import { GetAttributesValues } from '@strapi/strapi';

type RichTextProps = GetAttributesValues<'blocks.rich-text'>;

export function RichText(props: RichTextProps) {
  if (!props.content) return null;

  return <div dangerouslySetInnerHTML={{ __html: props.content }} />;
}

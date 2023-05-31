import { StrapiMedia } from '@/types/strapi';
import { GetAttributesValues } from '@strapi/strapi';
import Image from 'next/image';

type HeroProps = GetAttributesValues<'blocks.hero'>;

export function Hero(props: HeroProps) {
  const cover = props.images[0] as StrapiMedia | undefined;
  const sizeProps =
    cover?.height && cover.width ? { height: cover.height, width: cover.width } : { fill: true };

  return (
    <div className='mb-8 last:mb-0'>
      {cover && <Image src={cover.url} alt={props.images[0]} {...sizeProps} />}
      <pre className='not-prose'>{JSON.stringify(props)}</pre>
    </div>
  );
}

import { StrapiMedia } from '@/types/strapi';
import { GetAttributesValues } from '@strapi/strapi';
import Image from 'next/image';

type HeroProps = GetAttributesValues<'blocks.hero'> & { priority?: boolean; embed?: string };

export function Hero(props: HeroProps) {
  const cover = props.images?.[0] as StrapiMedia | undefined;

  return (
    <div className='mb-8 last:mb-0'>
      {props.embed ? (
        <div className='relative aspect-video max-h-[550px] w-full'>
          <iframe
            width='100%'
            height='100%'
            src={props.embed}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen={true}
          ></iframe>
        </div>
      ) : cover ? (
        <div className='relative aspect-video max-h-[550px] w-full'>
          <Image
            className='object-contain object-left-top'
            src={cover.url}
            alt={cover.alternativeText ?? cover.caption ?? 'Banner image'}
            fill
            priority={props.priority}
          />
        </div>
      ) : null}
      {cover?.caption && <caption>{cover.caption}</caption>}
    </div>
  );
}

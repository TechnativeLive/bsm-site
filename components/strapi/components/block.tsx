import { CallToAction } from '@/components/strapi/cta';
import { Hero } from '@/components/strapi/hero';
import { RichText } from '@/components/strapi/rich-text';
import { DynamicZoneValue } from '@strapi/strapi';

type BlockUIDs = Extract<Strapi.ComponentUIDs, `blocks.${string}`>;
type Block = DynamicZoneValue<[BlockUIDs]>[number];
type BlockProps = {
  type: Block['__component'];
  block: Block;
};

export function Block({ block, type }: BlockProps) {
  switch (type) {
    case 'blocks.cta':
      return <CallToAction {...block} />;
    case 'blocks.hero':
      return <Hero {...block} />;
    case 'blocks.rich-text':
      return <RichText {...block} />;
    default:
      exhaustiveCheck(type);
  }
}

function exhaustiveCheck(x: never): never {
  throw new Error(`Block: Unhandled case of ${x}`);
}

import { FooterActiveLink } from '@/components/footer/link';
import { HomeLogo } from '@/components/logos/main';
import { container } from '@/components/tailwind';
import { getFooterLinks, getSocials, getSponsors } from '@/lib/strapi/homepage';
import { StrapiMedia, hasFormats } from '@/types/strapi';
import { groupSponsors } from '@/utils/array';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const Footer = () => (
  <footer className='relative mt-auto w-full bg-primary py-6 text-white'>
    <div className={clsx(container, 'gap-6')}>
      <div className='flex items-center gap-12 border-b border-primary-500 pb-2 text-sm font-medium uppercase'>
        <Suspense>
          {/* @ts-expect-error async component */}
          <FooterLinks />
        </Suspense>
      </div>
      <div className='flex flex-col items-center'>
        <div className='mb-4 font-display text-xl'>OUR PARTNERS</div>
        <Suspense>
          {/* @ts-expect-error async component */}
          <Sponsors />
        </Suspense>
      </div>
      <div className='flex w-full items-center justify-between'>
        <HomeLogo />
        <div className='text-xs'>© 2023 TNL Sports</div>
      </div>
    </div>
  </footer>
);

const Sponsors = async () => {
  const sponsors = await getSponsors();

  if (!sponsors) {
    return null;
  }

  const sponsorTiers = groupSponsors(sponsors);

  return (
    <div className='grid grid-cols-1 divide-y divide-primary-300/40'>
      {sponsorTiers.map((tier, i) => (
        <div key={i} className='flex gap-6 py-3'>
          {tier.map((sponsor, i) =>
            sponsor.url ? (
              <a key={i} href={sponsor.url} target='_blank'>
                <SponsorImage {...sponsor} />
              </a>
            ) : (
              <SponsorImage key={i} {...sponsor} />
            )
          )}
        </div>
      ))}
    </div>
  );
};

const SponsorImage = (sponsor: GetAttributesValues<'api::sponsor.sponsor'>) => {
  const logo =
    sponsor.logos?.find((l) => l.kind === 'light') ?? sponsor.logos?.find((l) => l.kind === 'base');
  if (!logo) {
    return null;
  }

  const image = logo.image as StrapiMedia;

  if (hasFormats(image)) {
    return (
      <Image
        src={image.formats?.thumbnail?.url ?? image.url}
        alt={image.alternativeText ?? sponsor.name}
        width={144}
        height={64}
        className='object-contain'
      />
    );
  }

  return <Image src={image.url} alt={image.alternativeText ?? sponsor.name} fill />;
};

const PLATFORM_ICONS: Record<GetAttributesValues<'shared.social'>['platform'], string> = {
  facebook: 'i-basil-facebook-outline',
  instagram: 'i-basil-instagram-outline',
  meta: 'i-local-meta',
  tiktok: 'i-ic-baseline-tiktok',
  twitter: 'i-basil-twitter-outline',
};

const FooterLinks = async () => {
  const [footerLinks, socials] = await Promise.all([getFooterLinks(), getSocials()]);

  return (
    <>
      <div className='flex gap-6'>
        {footerLinks?.map((link, i) =>
          link.url ? (
            <FooterActiveLink
              key={i}
              href={link.url}
              target={link.isExternal ? '_blank' : undefined}
            >
              {link.label}
            </FooterActiveLink>
          ) : (
            <div
              className='inline-block border-b-2 border-transparent hover:border-secondary'
              key={i}
            >
              {link.label}
            </div>
          )
        )}
      </div>
      <div className='flex grow justify-end gap-1'>
        {socials?.map((social, i) => (
          <a
            key={i}
            href={social.url}
            target='_blank'
            aria-label={social.platform}
            className={clsx(PLATFORM_ICONS[social.platform], 'inline-block hover:text-secondary')}
          />
        ))}
      </div>
    </>
  );
};

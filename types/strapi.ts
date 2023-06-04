export {};

declare global {
  namespace Strapi {
    type Response<T> = {
      data: T & { id: number };
      meta?: Record<string, unknown>;
      error?: {
        status: string; // HTTP status
        name: string; // Strapi error name ('ApplicationError' or 'ValidationError')
        message: string; // A human readable error message
        details: unknown;
      };
    };
  }
}

export type StrapiMedia = Image | SingleImage | SharedMedia;

export function hasFormats(media: StrapiMedia): media is SingleImage {
  return !!media.formats && Object.keys(media.formats).length > 0;
}

type Image = Omit<SharedMedia, 'width' | 'height' | 'formats'> & {
  width: number;
  height: number;
  formats: Record<never, never>;
};

type SingleImage = Omit<SharedMedia, 'width' | 'height' | 'formats'> & {
  width: number;
  height: number;
  formats: Formats;
};

type SharedMedia = {
  id: number;
  name: string;
  width: null;
  height: null;
  formats: null;
  alternativeText: string | null;
  caption: string | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: Date;
  updatedAt: Date;
};

type Formats = {
  thumbnail: Format;
  small: Format;
  medium: Format;
  large: Format;
};

type Format = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
};

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

export type FeaturedProduct = {
  id: string;
  title: string;
  handle: string;
  thumbnail?: string;
};

export type VariantPrice = {
  calculated_price_number: number;
  calculated_price: string;
  original_price_number: number;
  original_price: string;
  currency_code: string;
  price_type: string;
  percentage_diff: string;
};

export type StoreFreeShippingPrice = {
  target_reached: boolean;
  target_remaining: number;
  remaining_percentage: number;
};

export type BlogPost = {
  id: string;
  handle: string;
  title?: string;
  seo_title?: string | null;
  thumbnail?: string;
  body?: Record<string, unknown>; // or replace `any` with a more specific type if known
  draft: boolean;
  /** 
   * The date the product was created.
   */
  created_at: string;
  /** 
   * The date the product was update.
   */
  updated_at: string;
};
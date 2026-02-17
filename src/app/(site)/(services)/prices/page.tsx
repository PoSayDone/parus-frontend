import { getSiteSettings } from "@/lib/data/site-settings";
import PricesTemplate from "@/modules/prices/templates";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = "Цены на ритуальные услуги и товары - Парус";
  const defaultDescription =
    "Актуальные цены на ритуальные услуги и товары от компании Парус. Прозрачное ценообразование без скрытых платежей.";
  const settings = await getSiteSettings();
  const title = settings?.pricesMetaTitle?.trim() || defaultTitle;
  const description =
    settings?.pricesMetaDescription?.trim() || defaultDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/images/og-image.png"],
    },
    alternates: {
      canonical: "/prices",
    },
  };
}

export default async function PricingPage() {
  return <PricesTemplate />;
}

import { getSiteSettings } from "@/lib/data/site-settings";
import AddressesTemplate from "@/modules/addresses/templates";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = "Полезные адреса в Перми - Парус";
  const defaultDescription =
    "Адреса ЗАГСов, моргов и кладбищ в Перми. Вся важная контактная информация в одном месте.";
  const settings = await getSiteSettings();
  const title = settings?.addressesMetaTitle?.trim() || defaultTitle;
  const description =
    settings?.addressesMetaDescription?.trim() || defaultDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/images/og-image.png"],
    },
    alternates: {
      canonical: "/addresses",
    },
  };
}

export default function AddressesPage() {
  return <AddressesTemplate />;
}

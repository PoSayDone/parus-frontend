import { getLandingPage } from "@/lib/data/landing-page";
import { getSiteSettings } from "@/lib/data/site-settings";
import { landingConfig } from "@/modules/landing/puck/config";
import { defaultLandingData } from "@/modules/landing/puck/default-data";
import { Render, type Config, type Data } from "@puckeditor/core";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = "Парус - Ритуальные услуги и товары";
  const defaultDescription =
    "Профессиональные ритуальные услуги и качественные ритуальные товары от компании Парус. Поможем в трудную минуту с уважением и заботой.";
  const settings = await getSiteSettings();
  const title = settings?.landingMetaTitle?.trim() || defaultTitle;
  const description =
    settings?.landingMetaDescription?.trim() || defaultDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/images/og-image.png"],
    },
    alternates: {
      canonical: "/",
    },
  };
}

const normalizeLandingData = (data: Data | null): Data => {
  if (data && Array.isArray(data.content)) {
    const usedIds = new Set<string>();
    const contentWithIds = data.content.map((item, index) => {
      const props = item.props ?? {};
      const existingId =
        typeof props.id === "string" && props.id.trim().length > 0
          ? props.id
          : typeof (item as { id?: string }).id === "string" &&
              (item as { id?: string }).id?.trim()
            ? (item as { id?: string }).id?.trim()
            : `section-${index}`;
      let resolvedId = existingId;
      let suffix = 1;
      while (usedIds.has(resolvedId)) {
        resolvedId = `${existingId}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(resolvedId);

      let nextProps = {
        ...props,
        id: resolvedId,
      };
      return {
        ...item,
        props: {
          ...nextProps,
        },
      };
    });
    return {
      ...data,
      content: contentWithIds,
      root: data.root || { props: {} },
    };
  }
  return defaultLandingData;
};

export default async function Home() {
  const [settings, landingPage] = await Promise.all([
    getSiteSettings(),
    getLandingPage(),
  ]);
  const showCatalog = settings?.showCatalog ?? true;
  const storedData = landingPage?.data as Data | null;
  const baseData = normalizeLandingData(storedData);
  const content = showCatalog
    ? baseData.content
    : (baseData.content || []).filter((item) => item.type !== "RitualProducts");
  const usedIds = new Set<string>();
  const data: Data = {
    ...baseData,
    content: (content || []).map((item, index) => {
      const props = item.props ?? {};
      const existingId =
        typeof props.id === "string" && props.id.trim().length > 0
          ? props.id
          : typeof (item as { id?: string }).id === "string" &&
              (item as { id?: string }).id?.trim()
            ? (item as { id?: string }).id?.trim()
            : `section-${index}`;
      let resolvedId = existingId;
      let suffix = 1;
      while (usedIds.has(resolvedId)) {
        resolvedId = `${existingId}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(resolvedId);

      let nextProps = {
        ...props,
        id: resolvedId,
      };
      return {
        ...item,
        props: {
          ...nextProps,
        },
      };
    }),
    root: baseData.root || { props: {} },
  };

  return <Render config={landingConfig as Config} data={data} />;
}

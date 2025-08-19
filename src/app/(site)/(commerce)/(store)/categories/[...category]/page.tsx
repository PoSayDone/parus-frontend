import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCategoryByHandle, listCategories } from "@lib/data/categories";
import CategoryTemplate from "@modules/categories/templates";

type Props = {
  params: Promise<{ category: string[] }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export async function generateStaticParams() {
  const product_categories = await listCategories();

  if (!product_categories) {
    return [];
  }

  const categoryHandles = product_categories.map(
    (category: any) => category.handle,
  );

  const staticParams = categoryHandles.map((handle: any) => ({
    category: [handle],
  }));

  return staticParams;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  try {
    const productCategory = await getCategoryByHandle(params.category[0]);

    const title = productCategory.name;

    const description = productCategory.description ?? `${title} category.`;

    return {
      title: `${title}`,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
      },
    };
  } catch (error) {
    notFound();
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { page } = searchParams;

  const productCategory = await getCategoryByHandle(params.category[0]);

  if (!productCategory) {
    notFound();
  }

  return (
    <CategoryTemplate
      category={productCategory}
      page={page}
    />
  );
}
import { Metadata } from "next";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import StoreTemplate from "@modules/store/templates";

export const metadata: Metadata = {
  title: "Каталог ритуальных товаров - Парус",
  description: "Широкий ассортимент ритуальных товаров высокого качества. Гроб, венки, кресты, одежда, кремационные услуги и многое другое.",
  keywords: ["ритуальные товары", "гроб", "венки", "кресты", "одежда для умерших", "ритуальные принадлежности"],
  openGraph: {
    title: "Каталог ритуальных товаров - Парус",
    description: "Широкий ассортимент ритуальных товаров высокого качества. Гроб, венки, кресты, одежда, кремационные услуги и многое другое.",
    images: ["/images/store-og-image.jpg"],
  },
};

type Params = {
	searchParams: Promise<{
		sortBy?: SortOptions;
		page?: string;
	}>;
};

export default async function StorePage(props: Params) {
	const searchParams = await props.searchParams;
	const { sortBy, page } = searchParams;

	return <StoreTemplate page={page} sortBy={sortBy} />;
}

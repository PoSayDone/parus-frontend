import type { Metadata } from "next";
import PricesTemplate from "@/modules/prices/templates";

export const metadata: Metadata = {
	title: "Цены на ритуальные услуги и товары - Парус",
	description:
		"Актуальные цены на ритуальные услуги и товары от компании Парус. Прозрачное ценообразование без скрытых платежей.",
	keywords: [
		"цены",
		"ритуальные услуги",
		"ритуальные товары",
		"стоимость",
		"тарифы",
	],
	openGraph: {
		title: "Цены на ритуальные услуги и товары - Парус",
		description:
			"Актуальные цены на ритуальные услуги и товары от компании Парус. Прозрачное ценообразование без скрытых платежей.",
		images: ["/images/og-image.png"],
	},
};

export default async function PricingPage() {
	return <PricesTemplate />;
}

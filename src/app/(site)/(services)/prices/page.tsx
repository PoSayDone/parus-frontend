import { Metadata } from "next";
import PricesTemplate from "@/modules/prices/templates";

export const metadata: Metadata = {
  title: "Цены на ритуальные услуги и товары - Парус",
  description: "Актуальные цены на ритуальные услуги и товары от компании Парус. Прозрачное ценообразование без скрытых платежей.",
  keywords: ["цены", "ритуальные услуги", "ритуальные товары", "стоимость", "тарифы"],
  openGraph: {
    title: "Цены на ритуальные услуги и товары - Парус",
    description: "Актуальные цены на ритуальные услуги и товары от компании Парус. Прозрачное ценообразование без скрытых платежей.",
    images: ["/images/prices-og-image.jpg"],
  },
};

export default function PricingPage() {
	return <PricesTemplate />;
}

import type { Metadata } from "next";
import ServicesTemplate from "@/modules/services/templates";

export const metadata: Metadata = {
	title: "Ритуальные услуги - Парус",
	description:
		"Профессиональные ритуальные услуги от компании Парус. Организация похорон, кремация, транспортировка, бальзамирование и другие услуги.",
	keywords: [
		"ритуальные услуги",
		"организация похорон",
		"кремация",
		"транспортировка",
		"бальзамирование",
	],
	openGraph: {
		title: "Ритуальные услуги - Парус",
		description:
			"Профессиональные ритуальные услуги от компании Парус. Организация похорон, кремация, транспортировка, бальзамирование и другие услуги.",
		images: ["/images/og-image.png"],
	},
	alternates: {
		canonical: "/services",
	},
};

export default function ServicesPage() {
	return <ServicesTemplate />;
}

import type { Metadata } from "next";
import AddressesTemplate from "@/modules/addresses/templates";

export const metadata: Metadata = {
	title: "Полезные адреса в Перми - Парус",
	description:
		"Адреса ЗАГСов, моргов и кладбищ в Перми. Вся важная контактная информация в одном месте.",
	keywords: ["адреса", "ЗАГС", "морги", "кладбища", "Пермь", "контакты"],
	openGraph: {
		title: "Полезные адреса в Перми - Парус",
		description:
			"Адреса ЗАГСов, моргов и кладбищ в Перми. Вся важная контактная информация в одном месте.",
		images: ["/images/og-image.png"],
	},
	alternates: {
		canonical: "/addresses",
	},
};

export default function AddressesPage() {
	return <AddressesTemplate />;
}

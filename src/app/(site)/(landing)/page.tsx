import type { Metadata } from "next";
import AboutUs from "@/modules/landing/components/about-us";
import LandingAddresses from "@/modules/landing/components/addresses";
import WhatShouldIDo from "@/modules/landing/components/actions";
import Hero from "@/modules/landing/components/hero";
import { Interaction } from "@/modules/landing/components/Interaction";
import WhereToFindUs from "@/modules/landing/components/location";
import Memorials from "@/modules/landing/components/memorials";
import Posts from "@/modules/landing/components/posts";
import Pricing from "@/modules/landing/components/pricing";
import QnA from "@/modules/landing/components/q-n-a";
import RitualProducts from "@/modules/landing/components/ritual-products";
import Services from "@/modules/landing/components/services";
import WhyUs from "@/modules/landing/components/why-us";
import { getSiteSettings } from "@/lib/data/site-settings";

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
		keywords: [
			"ритуальные услуги",
			"ритуальные товары",
			"похороны",
			"кремация",
			"гроб",
			"венки",
			"надгробия",
		],
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

export default async function Home() {
	const settings = await getSiteSettings();
	const showCatalog = settings?.showCatalog ?? true;

	return (
		<div className="text-xl">
			<Hero />
			<Services />
			<WhyUs />
			<Pricing />
			<AboutUs />
			<WhatShouldIDo />
			{showCatalog ? <RitualProducts /> : null}
			<Memorials />
			<QnA />
			<Interaction />
			<Posts />
			<LandingAddresses />
			<WhereToFindUs />
		</div>
	);
}

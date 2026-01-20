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

export const metadata: Metadata = {
	title: "Парус - Ритуальные услуги и товары",
	description:
		"Профессиональные ритуальные услуги и качественные ритуальные товары от компании Парус. Поможем в трудную минуту с уважением и заботой.",
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
		title: "Парус - Ритуальные услуги и товары",
		description:
			"Профессиональные ритуальные услуги и качественные ритуальные товары от компании Парус. Поможем в трудную минуту с уважением и заботой.",
		images: ["/images/og-image.png"],
	},
};

export default function Home() {
	return (
		<div className="text-xl">
			<Hero />
			<Services />
			<WhyUs />
			<Pricing />
			<AboutUs />
			<WhatShouldIDo />
			<RitualProducts />
			<Memorials />
			<QnA />
			<Interaction />
			<Posts />
			<LandingAddresses />
			<WhereToFindUs />
		</div>
	);
}

import React from "react";
import { Metadata } from "next";
import RitualProducts from "@/modules/landing/components/ritual-products";
import QnA from "@/modules/landing/components/q-n-a";
import { Interaction } from "@/modules/landing/components/Interaction";
import Posts from "@/modules/landing/components/posts";
import WhatShouldIDo from "@/modules/landing/components/actions";
import AboutUs from "@/modules/landing/components/about-us";
import WhyUs from "@/modules/landing/components/why-us";
import Services from "@/modules/landing/components/services";
import Hero from "@/modules/landing/components/hero";
import WhereToFindUs from "@/modules/landing/components/location";
import Pricing from "@/modules/landing/components/pricing";
import Memorials from "@/modules/landing/components/memorials";

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
			<WhereToFindUs />
		</div>
	);
}

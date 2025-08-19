import React from "react";
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

export default function Home() {
	return (
		<div className="text-base md:text-xl">
			<Hero />
			<Services />
			<WhyUs />
			<Pricing />
			<AboutUs />
			<WhatShouldIDo />
			<RitualProducts />
			<QnA />
			<Interaction />
			<Posts />
			<WhereToFindUs />
		</div>
	);
}

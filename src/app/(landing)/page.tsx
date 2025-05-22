import React from "react";
import RitualProducts from "./_components/RitualProducts";
import QnA from "./_components/QnA";
import { Interaction } from "./_components/Interaction";
import Posts from "./_components/Posts";
import WhatShouldIDo from "./_components/WhatShouldIDo";
import AboutUs from "./_components/AboutUs";
import WhyUs from "./_components/WhyUs";
import Services from "./_components/Services";
import Hero from "./_components/Hero";
import WhereToFindUs from "./_components/WhereToFindUs";

export default function Home() {
	return (
		<div className="text-base md:text-xl">
			<Hero />
			<Services />
			<WhyUs />
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

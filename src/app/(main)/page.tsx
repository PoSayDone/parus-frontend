import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import Card from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import RitualProducts from "./sections/RitualProducts";
import QnA from "./sections/QnA";
import { Interaction } from "./sections/Interaction";
import Posts from "./sections/Posts";
import WhatShouldIDo from "./sections/WhatShouldIDo";
import AboutUs from "./sections/AboutUs";
import WhyUs from "./sections/WhyUs";
import Services from "./sections/Services";
import Hero from "./sections/Hero";

export default function Home() {
	return (
		<>
			<Hero />
			<Services />
			<WhyUs />
			<AboutUs />
			<WhatShouldIDo />
			<RitualProducts />
			<QnA />
			<Interaction />
			<Posts />
		</>
	);
}

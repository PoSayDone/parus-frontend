import type { Config } from "@puckeditor/core";
import AboutUs from "@/modules/landing/components/about-us";
import WhatShouldIDo from "@/modules/landing/components/actions";
import Hero from "@/modules/landing/components/hero";
import { Interaction } from "@/modules/landing/components/Interaction";
import LandingAddresses from "@/modules/landing/components/addresses";
import Memorials from "@/modules/landing/components/memorials";
import Posts from "@/modules/landing/components/posts";
import Pricing from "@/modules/landing/components/pricing";
import QnAServer from "@/modules/landing/components/q-n-a-server";
import RitualProducts from "@/modules/landing/components/ritual-products";
import Services from "@/modules/landing/components/services";
import WhereToFindUsServer from "@/modules/landing/components/location-server";
import WhyUs from "@/modules/landing/components/why-us";
import TextBlock from "@/modules/landing/components/text-block";

export const landingConfig: Config = {
	components: {
		Hero: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<Hero {...props} />
			),
		},
		Services: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<Services {...props} />
			),
		},
		WhyUs: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<WhyUs {...props} />
			),
		},
		Pricing: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<Pricing {...props} />
			),
		},
		AboutUs: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<AboutUs {...props} />
			),
		},
		Actions: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<WhatShouldIDo {...props} />
			),
		},
		RitualProducts: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<RitualProducts {...props} />
			),
		},
		Memorials: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<Memorials {...props} />
			),
		},
		QnA: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<QnAServer {...props} />
			),
		},
		Interaction: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<Interaction {...props} />
			),
		},
		Posts: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<Posts {...props} />
			),
		},
		LandingAddresses: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<LandingAddresses {...props} />
			),
		},
		WhereToFindUs: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<WhereToFindUsServer {...props} />
			),
		},
		TextBlock: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<TextBlock {...props} />
			),
		},
	},
};

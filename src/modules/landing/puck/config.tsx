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
				<Hero {...(props as any)} />
			),
		},
		Services: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<Services {...(props as any)} />
			),
		},
		WhyUs: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<WhyUs {...(props as any)} />
			),
		},
		Pricing: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<Pricing {...(props as any)} />
			),
		},
		AboutUs: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<AboutUs {...(props as any)} />
			),
		},
		Actions: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<WhatShouldIDo {...(props as any)} />
			),
		},
		RitualProducts: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<RitualProducts {...(props as any)} />
			),
		},
		Memorials: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<Memorials {...(props as any)} />
			),
		},
		QnA: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<QnAServer {...(props as any)} />
			),
		},
		Interaction: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<Interaction {...(props as any)} />
			),
		},
		Posts: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<Posts {...(props as any)} />
			),
		},
		LandingAddresses: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<LandingAddresses {...(props as any)} />
			),
		},
		WhereToFindUs: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<WhereToFindUsServer {...(props as any)} />
			),
		},
		TextBlock: {
			render: ({ renderDropZone, dragRef, isEditing, metadata, ...props }) => (
				<TextBlock {...(props as any)} />
			),
		},
	},
};

import type { Config } from "@puckeditor/core";
import AboutUs from "@/modules/landing/components/about-us";
import WhatShouldIDo from "@/modules/landing/components/actions";
import Hero from "@/modules/landing/components/hero";
import { Interaction } from "@/modules/landing/components/interaction";
import Cemetries from "@/modules/landing/components/cemeteries";
import Memorials from "@/modules/landing/components/memorials";
import Posts from "@/modules/landing/components/posts";
import Pricing from "@/modules/landing/components/pricing";
import QnA from "@/modules/landing/components/q-n-a";
import RitualProducts from "@/modules/landing/components/ritual-products";
import Services from "@/modules/landing/components/services";
import OurLocation from "@/modules/landing/components/location";
import WhyUs from "@/modules/landing/components/why-us";
import TextBlock from "@/modules/landing/components/text-block";
import type { LandingComponents } from "./types";

export const landingConfig = {
	components: {
		Hero: {
			render: ({
				title,
				subtitle,
				ctaLabel,
				ctaHref,
				actionCardText,
				actionCardHref,
			}) => (
				<Hero
					title={title}
					subtitle={subtitle}
					ctaLabel={ctaLabel}
					ctaHref={ctaHref}
					actionCardText={actionCardText}
					actionCardHref={actionCardHref}
				/>
			),
		},
		Services: {
			render: ({ title, subtitle }) => (
				<Services title={title} subtitle={subtitle} />
			),
		},
		WhyUs: {
			render: ({
				title,
				item1Title,
				item1Description,
				item2Title,
				item2Description,
				item3Title,
				item3Description,
			}) => (
				<WhyUs
					title={title}
					item1Title={item1Title}
					item1Description={item1Description}
					item2Title={item2Title}
					item2Description={item2Description}
					item3Title={item3Title}
					item3Description={item3Description}
				/>
			),
		},
		Pricing: {
			render: ({ title, subtitle, buttonLabel, buttonHref }) => (
				<Pricing
					title={title}
					subtitle={subtitle}
					buttonLabel={buttonLabel}
					buttonHref={buttonHref}
				/>
			),
		},
		AboutUs: {
			render: ({
				title,
				paragraph1,
				paragraph2,
				buttonLabel,
				buttonDisabled,
			}) => (
				<AboutUs
					title={title}
					paragraph1={paragraph1}
					paragraph2={paragraph2}
					buttonLabel={buttonLabel}
					buttonDisabled={buttonDisabled}
				/>
			),
		},
		Actions: {
			render: ({
				title,
				subtitle,
				step1Title,
				step1Description,
				step2Title,
				step2Description,
				step3Title,
				step3Description,
				step4Title,
				step4Description,
				ctaLabel,
				ctaNote,
			}) => (
				<WhatShouldIDo
					title={title}
					subtitle={subtitle}
					step1Title={step1Title}
					step1Description={step1Description}
					step2Title={step2Title}
					step2Description={step2Description}
					step3Title={step3Title}
					step3Description={step3Description}
					step4Title={step4Title}
					step4Description={step4Description}
					ctaLabel={ctaLabel}
					ctaNote={ctaNote}
				/>
			),
		},
		RitualProducts: {
			render: ({ title, subtitle }) => (
				<RitualProducts title={title} subtitle={subtitle} />
			),
		},
		Memorials: {
			render: ({ title, subtitle, features, paragraph, ctaLabel }) => (
				<Memorials
					title={title}
					subtitle={subtitle}
					features={features}
					paragraph={paragraph}
					ctaLabel={ctaLabel}
				/>
			),
		},
		QnA: {
			render: ({ title, subtitle, questions }) => (
				<QnA title={title} subtitle={subtitle} questions={questions} />
			),
		},
		Interaction: {
			render: ({ title, highlight, description, ctaLabel, ctaHref }) => (
				<Interaction
					title={title}
					highlight={highlight}
					description={description}
					ctaLabel={ctaLabel}
					ctaHref={ctaHref}
				/>
			),
		},
		Posts: {
			render: ({ title, subtitle, buttonLabel, buttonHref }) => (
				<Posts
					title={title}
					subtitle={subtitle}
					buttonLabel={buttonLabel}
					buttonHref={buttonHref}
				/>
			),
		},
		Cemetries: {
			render: ({ title, subtitle }) => (
				<Cemetries title={title} subtitle={subtitle} />
			),
		},
		WhereToFindUs: {
			render: ({ title, subtitle, lat, lng, zoom }) => (
				<OurLocation
					title={title}
					subtitle={subtitle}
					lat={lat}
					lng={lng}
					zoom={zoom}
				/>
			),
		},
		TextBlock: {
			render: ({ title, text, id }) => (
				<TextBlock title={title} text={text} id={id} />
			),
		},
	},
} satisfies Config<LandingComponents>;

import type { Config } from "@puckeditor/core";
import AboutUs from "@/modules/landing/components/about-us";
import WhatShouldIDo from "@/modules/landing/components/actions";
import Hero from "@/modules/landing/components/hero";
import { Interaction } from "@/modules/landing/components/Interaction";
import Memorials from "@/modules/landing/components/memorials";
import QnA from "@/modules/landing/components/q-n-a";
import WhereToFindUs from "@/modules/landing/components/location";
import WhyUs from "@/modules/landing/components/why-us";
import { landingComponentFields } from "./fields";
import {
	LandingAddressesEditor,
	PricingEditor,
	PostsEditor,
	RitualProductsEditor,
	ServicesEditor,
	WhereToFindUsEditor,
	TextBlockEditor,
} from "./editor-components";

export const landingEditorConfig: Config = {
	components: {
		Hero: {
			label: "Герой",
			...landingComponentFields.Hero,
			render: (props) => <Hero {...(props as any)} />,
		},
		Services: {
			label: "Услуги (список)",
			...landingComponentFields.Services,
			render: (props) => <ServicesEditor {...(props as any)} />,
		},
		WhyUs: {
			label: "Почему мы",
			...landingComponentFields.WhyUs,
			render: (props) => <WhyUs {...(props as any)} />,
		},
		Pricing: {
			label: "Цены (список)",
			...landingComponentFields.Pricing,
			render: (props) => <PricingEditor {...(props as any)} />,
		},
		AboutUs: {
			label: "О нас",
			...landingComponentFields.AboutUs,
			render: (props) => <AboutUs {...(props as any)} />,
		},
		Actions: {
			label: "Что делать",
			...landingComponentFields.Actions,
			render: (props) => <WhatShouldIDo {...(props as any)} />,
		},
		RitualProducts: {
			label: "Ритуальные товары",
			...landingComponentFields.RitualProducts,
			render: (props) => <RitualProductsEditor {...(props as any)} />,
		},
		Memorials: {
			label: "Памятники",
			...landingComponentFields.Memorials,
			render: (props) => <Memorials {...(props as any)} />,
		},
		QnA: {
			label: "Вопрос-ответ",
			...landingComponentFields.QnA,
			render: (props) => <QnA {...(props as any)} />,
		},
		Interaction: {
			label: "Связаться",
			...landingComponentFields.Interaction,
			render: (props) => <Interaction {...(props as any)} />,
		},
		Posts: {
			label: "Статьи (список)",
			...landingComponentFields.Posts,
			render: (props) => <PostsEditor {...(props as any)} />,
		},
		LandingAddresses: {
			label: "Адреса",
			...landingComponentFields.LandingAddresses,
			render: (props) => <LandingAddressesEditor {...(props as any)} />,
		},
		WhereToFindUs: {
			label: "Карта и контакты",
			...landingComponentFields.WhereToFindUs,
			render: (props) => <WhereToFindUsEditor {...(props as any)} />,
		},
		TextBlock: {
			label: "Заголовок + текст",
			...landingComponentFields.TextBlock,
			render: (props) => <TextBlockEditor {...(props as any)} />,
		},
	},
};

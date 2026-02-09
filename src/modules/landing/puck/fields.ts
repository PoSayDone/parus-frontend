export const landingComponentFields = {
	Hero: {
		fields: {
			title: { type: "textarea" },
			subtitle: { type: "textarea" },
			ctaLabel: { type: "text" },
			ctaHref: { type: "text" },
			actionCardText: { type: "textarea" },
			actionCardHref: { type: "text" },
		},
	},
	Services: {
		fields: {
			title: { type: "text" },
			subtitle: { type: "textarea" },
		},
	},
	WhyUs: {
		fields: {
			title: { type: "textarea" },
			item1Title: { type: "text" },
			item1Description: { type: "textarea" },
			item2Title: { type: "text" },
			item2Description: { type: "textarea" },
			item3Title: { type: "text" },
			item3Description: { type: "textarea" },
		},
	},
	Pricing: {
		fields: {
			title: { type: "text" },
			subtitle: { type: "textarea" },
			buttonLabel: { type: "text" },
			buttonHref: { type: "text" },
		},
	},
	AboutUs: {
		fields: {
			title: { type: "text" },
			paragraph1: { type: "textarea" },
			paragraph2: { type: "textarea" },
			buttonLabel: { type: "text" },
			buttonDisabled: {
				type: "radio",
				options: [
					{ label: "Включена", value: false },
					{ label: "Выключена", value: true },
				],
			},
		},
	},
	Actions: {
		fields: {
			title: { type: "textarea" },
			subtitle: { type: "textarea" },
			step1Title: { type: "textarea" },
			step1Description: { type: "textarea" },
			step2Title: { type: "textarea" },
			step2Description: { type: "textarea" },
			step3Title: { type: "textarea" },
			step3Description: { type: "textarea" },
			step4Title: { type: "textarea" },
			step4Description: { type: "textarea" },
			ctaLabel: { type: "text" },
			ctaNote: { type: "text" },
		},
	},
	RitualProducts: {
		fields: {
			title: { type: "text" },
			subtitle: { type: "textarea" },
		},
	},
	Memorials: {
		fields: {
			title: { type: "text" },
			subtitle: { type: "textarea" },
			features: {
				type: "array",
				arrayFields: {
					title: { type: "text" },
					description: { type: "textarea" },
				},
				getItemSummary: (item: { title?: string }) =>
					item.title || "Преимущество",
				defaultItemProps: {
					title: "Новый пункт",
					description: "Описание пункта",
				},
			},
			paragraph: { type: "textarea" },
			ctaLabel: { type: "text" },
		},
	},
	QnA: {
		fields: {
			title: { type: "text" },
			subtitle: { type: "textarea" },
			questions: {
				type: "array",
				arrayFields: {
					title: { type: "text" },
					description: { type: "textarea" },
				},
				getItemSummary: (item: { title?: string }) =>
					item.title || "Вопрос",
				defaultItemProps: {
					title: "Новый вопрос",
					description: "Ответ на вопрос",
				},
			},
		},
	},
	Interaction: {
		fields: {
			title: { type: "text" },
			highlight: { type: "text" },
			description: { type: "textarea" },
			ctaLabel: { type: "text" },
			ctaHref: { type: "text" },
		},
	},
	Posts: {
		fields: {
			title: { type: "text" },
			subtitle: { type: "text" },
			buttonLabel: { type: "text" },
			buttonHref: { type: "text" },
		},
	},
	LandingAddresses: {
		fields: {
			title: { type: "text" },
			subtitle: { type: "text" },
		},
	},
	WhereToFindUs: {
		fields: {
			title: { type: "text" },
			subtitle: { type: "text" },
			lat: { type: "number" },
			lng: { type: "number" },
			zoom: { type: "number" },
		},
	},
	TextBlock: {
		fields: {
			title: { type: "text" },
			text: { type: "textarea" },
		},
	},
};

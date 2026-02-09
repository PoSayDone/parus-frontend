import { z } from "zod";

export const siteSettingsFormSchema = z.object({
	phone: z.string().min(1, { message: "Телефон обязателен" }),
	email: z.email("Введите корректный email"),
	address: z.string().min(1, { message: "Адрес обязателен" }),
	footerNote: z
		.string()
		.min(1, { message: "Текст футера обязателен" }),
	showCatalog: z.boolean(),
	landingMetaTitle: z.string().optional().or(z.literal("")),
	landingMetaDescription: z.string().optional().or(z.literal("")),
	addressesMetaTitle: z.string().optional().or(z.literal("")),
	addressesMetaDescription: z.string().optional().or(z.literal("")),
	pricesMetaTitle: z.string().optional().or(z.literal("")),
	pricesMetaDescription: z.string().optional().or(z.literal("")),
	blogMetaTitle: z.string().optional().or(z.literal("")),
	blogMetaDescription: z.string().optional().or(z.literal("")),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsFormSchema>;

import { z } from "zod";

export const siteSettingsFormSchema = z.object({
	phone: z.string().min(1, { message: "Телефон обязателен" }),
	email: z.email("Введите корректный email"),
	address: z.string().min(1, { message: "Адрес обязателен" }),
	footerNote: z
		.string()
		.min(1, { message: "Текст футера обязателен" }),
	showCatalog: z.boolean(),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsFormSchema>;

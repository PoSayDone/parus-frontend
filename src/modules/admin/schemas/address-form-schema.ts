import { z } from "zod";

export const addressFormSchema = z.object({
	type: z.enum(["zags", "morgue", "cemetery"], {
		message: "Тип адреса обязателен",
	}),
	handle: z.string().optional().or(z.literal("")),
	name: z
		.string()
		.min(2, { message: "Название должно содержать минимум 2 символа" })
		.max(200, {
			message: "Название должно содержать максимум 200 символов",
		}),
	address: z
		.string()
		.min(5, { message: "Адрес должен содержать минимум 5 символов" })
		.max(500, { message: "Адрес должен содержать максимум 500 символов" }),
	phone: z.array(z.string().min(2)).optional(),
	schedule: z.string().optional().or(z.literal("")),
	district: z.string().optional().or(z.literal("")),
	description: z.string().optional().or(z.literal("")),
	cemeteryStatus: z.string().optional().or(z.literal("")),
	cemeteryDocuments: z.array(z.string().min(2)).optional(),
	cemeteryNote: z.string().optional().or(z.literal("")),
	cemeteryImages: z.array(z.string().min(2)).optional(),
	cemeteryThumbnail: z.string().optional().or(z.literal("")),
	cemeteryLat: z.string().optional().or(z.literal("")),
	cemeteryLng: z.string().optional().or(z.literal("")),
	metaTitle: z.string().optional().or(z.literal("")),
	metaDescription: z.string().optional().or(z.literal("")),
	active: z.boolean(),
}).superRefine((values, ctx) => {
	if (values.handle && !/^[a-z0-9-]+$/.test(values.handle)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ["handle"],
			message: "Слаг может содержать только латиницу, цифры и дефисы",
		});
	}

	if (values.type === "cemetery" && !values.handle?.trim()) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ["handle"],
			message: "Для кладбища нужен слаг для страницы",
		});
	}
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;

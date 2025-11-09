import { z } from "zod";

export const addressFormSchema = z.object({
	type: z.enum(["zags", "morgue", "cemetery"], {
		required_error: "Тип адреса обязателен",
	}),
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
	phone: z.string().optional(),
	schedule: z.string().optional(),
	district: z.string().optional(),
	location: z.string().optional(),
	active: z.boolean().default(true),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;

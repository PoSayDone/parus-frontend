import { z } from "zod";

export const pricePlanFormSchema = z.object({
	title: z
		.string()
		.min(2, { message: "Название должно содержать минимум 2 символа" })
		.max(200, {
			message: "Название должно содержать максимум 200 символов",
		}),
	description: z
		.string()
		.min(10, { message: "Описание должно содержать минимум 10 символов" }),
	price: z.string().min(1, { message: "Цена обязательна" }),
	included: z.array(z.string()),
	creditPrice: z.string().optional(),
	order: z.coerce
		.number()
		.int({ message: "Порядок должен быть целым числом" })
		.min(0, { message: "Порядок не может быть меньше 0" })
		.default(0),
	popular: z.boolean().default(false),
	active: z.boolean().default(true),
});

export type PricePlanFormValues = z.infer<typeof pricePlanFormSchema>;

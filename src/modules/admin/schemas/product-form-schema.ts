import z from "zod";

export const productFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Название продукта обязательно" })
		.max(200, {
			message: "Название продукта должно быть не более 200 символов",
		}),
	description: z
		.string()
		.max(2000, { message: "Описание должно быть не более 2000 символов" })
		.optional(),
	handle: z
		.string()
		.min(1, { message: "URL (handle) обязателен" })
		.regex(/^[a-z0-9-]+$/, {
			message:
				"URL может содержать только строчные буквы, цифры и дефисы",
		}),
	thumbnail: z
		.string()
		.optional()
		.or(z.string().max(0)),
	images: z.array(z.string()).optional(),
	price: z
		.string()
		.refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
			message: "Цена должна быть неотрицательным числом",
		}),
	active: z.boolean(),
	categories: z
		.array(z.string())
		.min(1, { message: "Выберите хотя бы одну категорию" }),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

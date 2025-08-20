import * as z from "zod";

export const categoryFormSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Название категории обязательно" })
		.max(100, {
			message: "Название категории должно быть не более 100 символов",
		}),
	description: z
		.string()
		.max(500, { message: "Описание должно быть не более 500 символов" })
		.optional(),
	handle: z
		.string()
		.min(1, { message: "URL (handle) обязателен" })
		.regex(/^[a-z0-9-]+$/, {
			message:
				"URL может содержать только строчные буквы, цифры и дефисы",
		}),
	active: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

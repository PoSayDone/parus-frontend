import z from "zod";

export const postFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Заголовок статьи обязателен" })
		.max(200, {
			message: "Заголовок статьи должен быть не более 200 символов",
		}),
	handle: z
		.string()
		.min(1, { message: "URL (handle) обязателен" })
		.regex(/^[a-z0-9-]+$/, {
			message:
				"URL может содержать только строчные буквы, цифры и дефисы",
		}),
	description: z
		.string()
		.max(500, {
			message: "Краткое описание должно быть не более 500 символов",
		})
		.optional(),
	body: z.any().optional(),
	seoTitle: z
		.string()
		.max(60, { message: "SEO заголовок должен быть не более 60 символов" })
		.optional(),
	seoDescription: z
		.string()
		.max(160, {
			message:
				"SEO описание должно быть не более 160 символов",
		})
		.optional(),
	thumbnail: z.string().optional(),
	draft: z.boolean(),
	type: z.enum(["article", "info", "document"]),
	author: z
		.string()
		.min(1, { message: "Автор обязателен" })
		.max(100, { message: "Имя автора должно быть не более 100 символов" }),
});

export type PostFormValues = z.infer<typeof postFormSchema>;

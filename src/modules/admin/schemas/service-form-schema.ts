import { iconNames } from "lucide-react/dynamic";
import { z } from "zod";

export const serviceFormSchema = z.object({
	title: z
		.string()
		.min(2, { message: "Название должно содержать минимум 2 символа" })
		.max(200, {
			message: "Название должно содержать максимум 200 символов",
		}),
	handle: z
		.string()
		.min(1, { message: "URL (handle) обязателен" })
		.regex(/^[a-z0-9-]+$/, {
			message:
				"URL может содержать только строчные буквы, цифры и дефисы",
		}),
	shortDescription: z
		.string()
		.max(500, {
			message: "Краткое описание должно содержать максимум 500 символов",
		})
		.optional(),
	description: z
		.string()
		.min(10, { message: "Описание должно содержать минимум 10 символов" }),
	icon: z.enum([...iconNames, ""]).optional(),
	thumbnail: z.string().optional(),
	images: z.array(z.string()).optional(),
	price: z.string().min(1, { message: "Цена обязательна" }),
	duration: z.string().optional(),
	features: z.array(z.string()).optional(),
	included: z.array(z.string()).optional(),
	active: z.boolean().default(true),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

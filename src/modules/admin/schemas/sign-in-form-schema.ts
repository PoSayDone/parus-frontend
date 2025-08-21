import z from "zod";

export const signInFormSchema = z.object({
	email: z.email({ message: "Введите корректный email" }),
	password: z
		.string()
		.min(6, { message: "Пароль должен содержать минимум 6 символов" }),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;

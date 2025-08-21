import z from "zod";

// Schema for creating a new user (password required)
export const createUserFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Имя должно содержать минимум 2 символа" }),
	email: z.string().email({ message: "Введите корректный email" }),
	password: z
		.string()
		.min(6, { message: "Пароль должен содержать минимум 6 символов" }),
	role: z.enum(["admin", "user"], {
		required_error: "Пожалуйста, выберите роль пользователя",
	}),
});

// Schema for updating an existing user (password optional)
export const updateUserFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Имя должно содержать минимум 2 символа" }),
	email: z.string().email({ message: "Введите корректный email" }),
	password: z
		.string()
		.min(6, { message: "Пароль должен содержать минимум 6 символов" })
		.optional()
		.or(z.literal("")),
	role: z.enum(["admin", "user"], {
		required_error: "Пожалуйста, выберите роль пользователя",
	}),
});

// Combined schema that makes password optional but validates it when provided
export const userFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Имя должно содержать минимум 2 символа" }),
	email: z.string().email({ message: "Введите корректный email" }),
	password: z
		.string()
		.min(6, { message: "Пароль должен содержать минимум 6 символов" })
		.optional()
		.or(z.literal("")),
	role: z.enum(["admin", "user"], {
		required_error: "Пожалуйста, выберите роль пользователя",
	}),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;
export type CreateUserFormSchema = z.infer<typeof createUserFormSchema>;
export type UpdateUserFormSchema = z.infer<typeof updateUserFormSchema>;

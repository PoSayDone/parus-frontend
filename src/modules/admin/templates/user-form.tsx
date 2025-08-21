"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userFormSchema, UserFormSchema } from "../schemas/user-form-schema";
import { AdminFormLayout } from "@/modules/admin/templates/admin-form-layout";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getUserById, updateUser, createUser } from "@/lib/data/users";

export function UserForm({ userId }: { userId?: string }) {
	const router = useRouter();
	const [loading, setLoading] = useState(!!userId);

	const form = useForm<UserFormSchema>({
		resolver: zodResolver(userFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			role: "user",
		},
	});

	useEffect(() => {
		const fetchUser = async () => {
			if (userId) {
				try {
					const user = await getUserById(userId);
					if (user) {
						form.reset({
							name: user.name,
							email: user.email,
							password: "",
							role: user.role as "admin" | "user",
						});
					} else {
						toast.error("Пользователь не найден");
						router.push("/admin/users");
					}
				} catch (error) {
					console.error("Error fetching user:", error);
					toast.error("Ошибка при загрузке данных пользователя");
					router.push("/admin/users");
				} finally {
					setLoading(false);
				}
			}
		};

		fetchUser();
	}, [userId, form, router]);

	async function onSubmit(values: UserFormSchema) {
		try {
			let result;
			if (userId) {
				// Update existing user
				result = await updateUser(userId, values);
			} else {
				// Create new user
				// Validate that password is provided for new users
				if (!values.password || values.password === "") {
					throw new Error("Password is required for new users");
				}
				result = await createUser(values);
			}

			toast.success(
				`Пользователь успешно ${userId ? "обновлен" : "создан"}`,
			);
			router.push("/admin/users");
			router.refresh();
		} catch (error: any) {
			toast.error(
				error.message ||
					`Произошла ошибка при ${userId ? "обновлении" : "создании"} пользователя`,
			);
		}
	}

	if (loading) {
		return <div className="p-6">Загрузка пользователя...</div>;
	}

	const mainContent = (
		<>
			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Основная информация</CardTitle>
					<CardDescription>
						{userId
							? "Обновите данные о пользователе"
							: "Заполните основные данные о пользователе"}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input
										placeholder="Иван Иванов"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="user@example.com"
										autoComplete="one-time-code"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{userId
										? "Новый пароль (оставьте пустым, чтобы не менять)"
										: "Пароль"}
								</FormLabel>
								<FormControl>
									<Input
										type="password"
										autoComplete="one-time-code"
										placeholder={
											userId
												? "•••••• (оставьте пустым, чтобы не менять)"
												: "••••••"
										}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>
		</>
	);

	const sidebarContent = (
		<Card className="bg-transparent border-border-variant">
			<CardHeader>
				<CardTitle>Настройки</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Роль</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Выберите роль" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="admin">
										Администратор
									</SelectItem>
									<SelectItem value="user">
										Пользователь
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);

	return (
		<AdminFormLayout<UserFormSchema>
			title={userId ? "Редактировать пользователя" : "Новый пользователь"}
			description={
				userId
					? "Изменение информации о пользователе"
					: "Добавьте нового пользователя"
			}
			backHref="/admin/users"
			backLabel="Назад к пользователям"
			sidebar={sidebarContent}
			submitLabel={userId ? "Сохранить изменения" : "Создать"}
			form={form}
			onSubmit={onSubmit}
		>
			{mainContent}
		</AdminFormLayout>
	);
}

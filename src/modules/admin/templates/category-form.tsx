"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { SlugHandler } from "../components/slug-handler";
import {
	categoryFormSchema,
	CategoryFormValues,
} from "../schemas/category-form-schema";
import {
	getCategoryByHandle,
	createCategory,
	updateCategory,
} from "@/lib/data/categories";

export default function CategoryForm({
	categoryHandle,
}: {
	categoryHandle?: string;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(!!categoryHandle);
	const [saving, setSaving] = useState(false);

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: "",
			description: "",
			handle: "",
			active: true,
		},
		mode: "onChange",
	});

	const { handleFieldChange: handleNameChange } = SlugHandler({
		form,
		fieldName: "name",
		slugFieldName: "handle",
	});

	// Fetch category data for edit mode
	useEffect(() => {
		const fetchCategory = async () => {
			if (!categoryHandle) return;

			try {
				const categoryData = await getCategoryByHandle(categoryHandle);

				if (categoryData) {
					form.reset({
						name: categoryData.name,
						description: categoryData.description || "",
						handle: categoryData.handle,
						active:
							categoryData.active !== undefined
								? categoryData.active
								: true,
					});
				} else {
					console.error("Category not found");
				}
			} catch (error) {
				console.error("Error fetching category:", error);
			} finally {
				setLoading(false);
			}
		};

		if (categoryHandle) {
			fetchCategory();
		}
	}, [categoryHandle, form]);

	const onSubmit = async (values: CategoryFormValues) => {
		setSaving(true);

		try {
			let result;
			if (categoryHandle) {
				// Update existing category using server action
				result = await updateCategory(categoryHandle, values);
			} else {
				// Create new category using server action
				result = await createCategory(values);
			}

			if (result) {
				router.push("/admin/categories");
			} else {
				alert(
					categoryHandle
						? "Ошибка при обновлении категории"
						: "Ошибка при создании категории",
				);
			}
		} catch (error) {
			console.error("Error saving category:", error);
			alert(
				categoryHandle
					? "Ошибка при обновлении категории"
					: "Ошибка при создании категории",
			);
		} finally {
			setSaving(false);
		}
	};

	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		handleNameChange(value);
		form.setValue("name", value);
	};

	if (loading) {
		return <div className="p-6">Загрузка категории...</div>;
	}

	return (
		<div className="space-y-6">
			<div className="flex flex-col items-start space-x-4">
				<Link
					href="/admin/categories"
					className={buttonVariants({
						variant: "ghost",
						size: "sm",
						className: "mb-2",
					})}
				>
					<ArrowLeft className="h-4 w-4" />
					Назад к категориям
				</Link>
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						{categoryHandle
							? "Редактировать категорию"
							: "Новая категория"}
					</h2>
					<p className="text-muted-foreground">
						{categoryHandle
							? "Изменение информации о категории"
							: "Создайте новую категорию товаров"}
					</p>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="grid gap-6 lg:grid-cols-3">
						<div className="lg:col-span-2">
							<Card className="bg-transparent border-border-variant">
								<CardHeader>
									<CardTitle>Основная информация</CardTitle>
									<CardDescription>
										{categoryHandle
											? "Обновите данные категории"
											: "Заполните данные о новой категории"}
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Название категории
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="Введите название категории"
														onChange={onNameChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="handle"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													URL (handle)
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="url-kategorii"
													/>
												</FormControl>
												<FormDescription>
													Будет использоваться в URL:
													/categories/
													{form.watch("handle") ||
														"url-kategorii"}
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Описание</FormLabel>
												<FormControl>
													<Textarea
														{...field}
														placeholder="Краткое описание категории"
														rows={3}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</div>

						<div>
							<Card className="bg-transparent border-border-variant">
								<CardHeader>
									<CardTitle>Настройки</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="active"
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between">
												<div className="space-y-0.5">
													<FormLabel className="text-base">
														Активная категория
													</FormLabel>
													<FormDescription>
														Показывать категорию на
														сайте
													</FormDescription>
												</div>
												<FormControl>
													<Switch
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							<div className="flex flex-col space-y-2 mt-6">
								<Button
									type="submit"
									className="w-full"
									disabled={saving}
								>
									<Save />
									{saving
										? categoryHandle
											? "Сохранение..."
											: "Создание..."
										: categoryHandle
											? "Сохранить изменения"
											: "Создать категорию"}
								</Button>
								<Link
									href="/admin/categories"
									className={buttonVariants({
										variant: "outline",
										className: "w-full bg-transparent",
									})}
								>
									Отмена
								</Link>
							</div>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}

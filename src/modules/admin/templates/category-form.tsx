"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
	createCategory,
	getCategoryByHandle,
	updateCategory,
} from "@/lib/data/categories";
import { uploadFile } from "@/lib/data/uploads";
import { SlugHandler } from "../components/slug-handler";
import {
	type CategoryFormValues,
	categoryFormSchema,
} from "../schemas/category-form-schema";
import { AdminFormLayout } from "./admin-form-layout";

export default function CategoryForm({
	categoryHandle,
}: {
	categoryHandle?: string;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(!!categoryHandle);
	const [uploading, setUploading] = useState(false);
	const [image, setImage] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

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

					if (categoryData.thumbnail) {
						setImage(categoryData.thumbnail);
					}
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
		try {
			// Include thumbnail in the values
			const categoryData = {
				...values,
				thumbnail: image || "",
			};

			let result;
			if (categoryHandle) {
				result = await updateCategory(categoryHandle, categoryData);
			} else {
				result = await createCategory(categoryData);
			}

			if (result) {
				router.push("/admin/categories");
			} else {
				toast.error(
					categoryHandle
						? "Ошибка при обновлении категории"
						: "Ошибка при создании категории",
				);
			}
		} catch (error) {
			console.error("Error saving category:", error);
			toast.error(
				categoryHandle
					? "Ошибка при обновлении категории"
					: "Ошибка при создании категории",
			);
		}
	};

	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		handleNameChange(value);
		form.setValue("name", value);
	};

	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		setUploading(true);
		try {
			const file = files[0];
			const url = await uploadFile(file);

			setImage(url);
		} catch (error) {
			console.error("Error uploading image:", error);
			toast.error("Ошибка при загрузке изображения");
		} finally {
			setUploading(false);
			if (e.target) {
				e.target.value = "";
			}
		}
	};

	const triggerFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const removeImage = () => {
		setImage(null);
	};

	if (loading) {
		return <div className="p-6">Загрузка категории...</div>;
	}

	const mainContent = (
		<>
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
								<FormLabel>Название категории</FormLabel>
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
								<FormLabel>URL (handle)</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="url-kategorii"
									/>
								</FormControl>
								<FormDescription>
									Будет использоваться в URL: /categories/
									{form.watch("handle") || "url-kategorii"}
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

			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Изображение категории</CardTitle>
					<CardDescription>
						{categoryHandle
							? "Управление изображением категории"
							: "Добавьте изображение для категории"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{image && (
						<div className="mb-4 relative group">
							<img
								src={image}
								alt="Category thumbnail"
								className="w-full h-48 object-cover rounded-lg border"
							/>
							<Button
								type="button"
								size="icon"
								variant="destructive"
								className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={removeImage}
								title="Удалить"
							>
								<X className="h-3 w-3" />
							</Button>
						</div>
					)}

					<div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
						<Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
						<div className="mt-4">
							<Input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								disabled={uploading || !!image} // Disable if image exists
								className="hidden"
								id="image-upload"
							/>
							<Button
								type="button"
								variant="outline"
								onClick={triggerFileInput}
								disabled={uploading || !!image} // Disable if image exists
							>
								{uploading
									? "Загрузка..."
									: image
										? "Изображение загружено"
										: "Загрузить изображение"}
							</Button>
						</div>
						<p className="mt-2 text-sm text-muted-foreground">
							Выберите изображение для категории
						</p>
					</div>
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
					name="active"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center space-x-3 space-y-0">
							<div className="space-y-1 leading-none w-full">
								<FormLabel>Активная категория</FormLabel>
								<FormDescription>
									Если отмечено, категория будет видна
									пользователям
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);

	return (
		<AdminFormLayout<CategoryFormValues>
			onSubmit={onSubmit}
			title={
				categoryHandle ? "Редактировать категорию" : "Новая категория"
			}
			description={
				categoryHandle
					? "Изменение информации о категории"
					: "Создайте новую категорию товаров"
			}
			backHref="/admin/categories"
			backLabel="Назад к категориям"
			form={form}
			sidebar={sidebarContent}
			submitLabel={
				categoryHandle ? "Сохранить изменения" : "Создать категорию"
			}
			cancelHref="/admin/categories"
		>
			{mainContent}
		</AdminFormLayout>
	);
}

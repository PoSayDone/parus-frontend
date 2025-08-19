"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";
import LabelInput from "@/components/ui/floating-input";

export default function EditProductPage() {
	const router = useRouter();
	const params = useParams();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		handle: "",
		thumbnail: "",
		price: "",
		status: "draft",
		categories: [] as string[],
	});
	const [categories, setCategories] = useState<
		{ id: string; name: string; handle: string }[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const handle = params.id as string;

	// Fetch product data
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch categories
				const categoriesResponse = await fetch("/api/admin/categories");
				const categoriesData = await categoriesResponse.json();
				if (categoriesResponse.ok) {
					setCategories(categoriesData.categories);
				}

				// Fetch product
				const productResponse = await fetch(
					`/api/admin/products/${handle}`,
				);
				const productData = await productResponse.json();

				if (productResponse.ok) {
					setFormData({
						title: productData.product.title,
						description: productData.product.description || "",
						handle: productData.product.handle,
						thumbnail: productData.product.thumbnail || "",
						price: productData.product.price.toString(),
						status: productData.product.status,
						categories:
							productData.product.categories?.map(
								(cat: any) => cat.handle,
							) || [],
					});
				} else {
					console.error("Error fetching product:", productData.error);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		if (handle) {
			fetchData();
		}
	}, [handle]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			const response = await fetch(`/api/admin/products/${handle}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: formData.title,
					description: formData.description,
					handle: formData.handle,
					thumbnail: formData.thumbnail,
					price: parseFloat(formData.price) || 0,
					status: formData.status,
					categoryHandles: formData.categories,
				}),
			});

			if (response.ok) {
				router.push("/admin/products");
			} else {
				const error = await response.json();
				console.error("Error updating product:", error.error);
				alert("Ошибка при обновлении продукта");
			}
		} catch (error) {
			console.error("Error updating product:", error);
			alert("Ошибка при обновлении продукта");
		} finally {
			setSaving(false);
		}
	};

	const handleInputChange = (
		field: string,
		value: string | string[] | boolean,
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	if (loading) {
		return <div className="p-6">Загрузка продукта...</div>;
	}

	return (
		<div className="space-y-6">
			<div className="flex flex-col items-start space-x-4">
				<Link
					href="/admin/products"
					className={buttonVariants({
						variant: "ghost",
						size: "sm",
						className: "mb-2",
					})}
				>
					<ArrowLeft className="h-4 w-4" />
					Назад к товарам
				</Link>
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Редактировать продукт
					</h2>
					<p className="text-muted-foreground">
						Изменение информации о товаре
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2 space-y-6">
						<Card className="bg-transparent border-border-variant">
							<CardHeader>
								<CardTitle>Основная информация</CardTitle>
								<CardDescription>
									Обновите данные о продукте
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<LabelInput
										id="title"
										label="Название продукта"
										value={formData.title}
										onChange={(e) =>
											handleInputChange(
												"title",
												e.target.value,
											)
										}
										placeholder="Введите название продукта"
										required
									/>
								</div>

								<div className="space-y-2">
									<LabelInput
										id="handle"
										label="URL (handle)"
										value={formData.handle}
										onChange={(e) =>
											handleInputChange(
												"handle",
												e.target.value,
											)
										}
										placeholder="url-produkta"
										required
									/>
									<p className="text-sm text-muted-foreground">
										Будет использоваться в URL: /products/
										{formData.handle}
									</p>
								</div>

								<div className="space-y-2">
									<Label htmlFor="description">
										Описание
									</Label>
									<Textarea
										id="description"
										value={formData.description}
										onChange={(e) =>
											handleInputChange(
												"description",
												e.target.value,
											)
										}
										placeholder="Подробное описание продукта"
										rows={4}
									/>
								</div>

								<div className="grid gap-4 sm:grid-cols-2 items-end">
									<div className="space-y-2">
										<Label htmlFor="categories">
											Категории
										</Label>
										<Select
											value={formData.categories[0] || ""}
											onValueChange={(value) =>
												handleInputChange(
													"categories",
													[value],
												)
											}
										>
											<SelectTrigger className="mb-0 w-full">
												<SelectValue placeholder="Выберите категорию" />
											</SelectTrigger>
											<SelectContent>
												{categories.map((category) => (
													<SelectItem
														key={category.handle}
														value={category.handle}
													>
														{category.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<LabelInput
											id="price"
											label="Цена (₽)"
											type="number"
											value={formData.price}
											onChange={(e) =>
												handleInputChange(
													"price",
													e.target.value,
												)
											}
											placeholder="0"
											min="0"
											step="100"
											required
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-transparent border-border-variant">
							<CardHeader>
								<CardTitle>Изображение</CardTitle>
								<CardDescription>
									Управление главным изображением
								</CardDescription>
							</CardHeader>
							<CardContent>
								{formData.thumbnail && (
									<div className="mb-4">
										<img
											src={
												formData.thumbnail ||
												"/placeholder.svg"
											}
											alt="Product thumbnail"
											className="w-full h-48 object-cover rounded-lg border"
										/>
									</div>
								)}

								<div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
									<Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
									<div className="mt-4">
										<LabelInput
											id="thumbnail"
											label="URL изображения"
											value={formData.thumbnail}
											onChange={(e) =>
												handleInputChange(
													"thumbnail",
													e.target.value,
												)
											}
										/>
										<p className="mt-2 text-sm text-muted-foreground">
											Введите URL изображения
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card className="bg-transparent border-border-variant">
							<CardHeader>
								<CardTitle>Настройки</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="status">Статус</Label>
									<Select
										value={formData.status}
										onValueChange={(value) =>
											handleInputChange("status", value)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="draft">
												Черновик
											</SelectItem>
											<SelectItem value="published">
												Опубликован
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						<div className="flex flex-col space-y-2">
							<Button
								type="submit"
								className="w-full"
								disabled={saving}
							>
								<Save />
								{saving
									? "Сохранение..."
									: "Сохранить изменения"}
							</Button>
							<Link
								href="/admin/products"
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
		</div>
	);
}

"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Upload, X, Star } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SlugHandler } from "../components/slug-handler";
import { AdminFormLayout } from "./admin-form-layout";
import {
	productFormSchema,
	ProductFormValues,
} from "../schemas/product-form-schema";
import {
	getProductByHandle,
	createProduct,
	updateProduct,
} from "@/lib/data/products";
import { listCategories } from "@/lib/data/categories";
import { uploadFile } from "@/lib/data/uploads";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function ProductForm({
	productHandle,
}: {
	productHandle?: string;
}) {
	const router = useRouter();
	const [categories, setCategories] = useState<
		{ id: string; name: string; handle: string }[]
	>([]);
	const [loading, setLoading] = useState(!!productHandle);
	const [images, setImages] = useState<string[]>([]);
	const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(0);
	const [uploading, setUploading] = useState(false);

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			title: "",
			description: "",
			handle: "",
			thumbnail: "",
			images: [],
			price: "",
			active: false,
			categories: [],
		},
		mode: "onChange",
	});

	const { handleFieldChange: handleTitleChange } = SlugHandler({
		form,
		fieldName: "title",
		slugFieldName: "handle",
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch categories using server action
				const {
					response: { data: categoriesData },
				} = await listCategories({});
				setCategories(categoriesData);

				if (productHandle) {
					// Fetch product using server action
					const productData = await getProductByHandle(productHandle);

					if (productData) {
						form.reset({
							title: productData.title,
							description: productData.description || "",
							handle: productData.handle,
							thumbnail: productData.thumbnail || "",
							images: productData.images || [],
							price: productData.price.toString(),
							active: productData.active,
							categories:
								productData.categories?.map(
									(cat: any) => cat.handle,
								) || [],
						});

						// Set images and primary image
						if (
							productData.images &&
							productData.images.length > 0
						) {
							setImages(productData.images);
							// Find primary image index (if thumbnail matches one of the images)
							const primaryIndex = productData.images.indexOf(
								productData.thumbnail || "",
							);
							if (primaryIndex !== -1) {
								setPrimaryImageIndex(primaryIndex);
							}
						}
					} else {
						console.error("Product not found");
					}
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				if (productHandle) {
					setLoading(false);
				}
			}
		};

		fetchData();
	}, [productHandle, form]);

	const onSubmit = async (values: ProductFormValues) => {
		try {
			// Use the first image or the explicitly set primary image as thumbnail
			const thumbnail =
				images.length > 0
					? images[primaryImageIndex]
					: values.thumbnail;

			const productData = {
				...values,
				thumbnail,
				images,
				price: parseFloat(values.price),
			};

			let result;
			if (productHandle) {
				// Update existing product using server action
				result = await updateProduct(productHandle, productData);
			} else {
				// Create new product using server action
				result = await createProduct(productData);
			}

			if (result) {
				router.push("/admin/products");
			} else {
				toast.error(
					productHandle
						? "Ошибка при обновлении продукта"
						: "Ошибка при создании продукта",
				);
			}
		} catch (error) {
			console.error("Error saving product:", error);
			toast.error(
				productHandle
					? "Ошибка при обновлении продукта"
					: "Ошибка при создании продукта",
			);
		}
	};

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		handleTitleChange(value);
		form.setValue("title", value);
	};

	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		setUploading(true);
		try {
			const uploadedUrls: string[] = [];
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const url = await uploadFile(file);
				uploadedUrls.push(url);
			}

			// Add new images to existing images
			const newImages = [...images, ...uploadedUrls];
			setImages(newImages);
			form.setValue("images", newImages);

			// If this is the first image, set it as primary
			if (images.length === 0 && uploadedUrls.length > 0) {
				setPrimaryImageIndex(0);
				form.setValue("thumbnail", uploadedUrls[0]);
			}
		} catch (error) {
			console.error("Error uploading images:", error);
			toast.error("Ошибка при загрузке изображений");
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

	const removeImage = (index: number) => {
		const newImages = [...images];
		newImages.splice(index, 1);
		setImages(newImages);
		form.setValue("images", newImages);

		if (index === primaryImageIndex && newImages.length > 0) {
			setPrimaryImageIndex(0);
			form.setValue("thumbnail", newImages[0]);
		} else if (index < primaryImageIndex) {
			setPrimaryImageIndex(primaryImageIndex - 1);
		} else if (primaryImageIndex >= newImages.length) {
			setPrimaryImageIndex(Math.max(0, newImages.length - 1));
		}

		if (newImages.length > 0) {
			form.setValue(
				"thumbnail",
				newImages[primaryImageIndex] || newImages[0],
			);
		} else {
			form.setValue("thumbnail", "");
		}
	};

	const setPrimaryImage = (index: number) => {
		setPrimaryImageIndex(index);
		form.setValue("thumbnail", images[index]);
	};

	if (loading) {
		return <div className="p-6">Загрузка продукта...</div>;
	}

	const mainContent = (
		<>
			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Основная информация</CardTitle>
					<CardDescription>
						{productHandle
							? "Обновите данные о продукте"
							: "Заполните основные данные о продукте"}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Название продукта</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите название продукта"
										onChange={onTitleChange}
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
										placeholder="url-produkta"
									/>
								</FormControl>
								<FormDescription>
									Будет использоваться в URL: /products/
									{form.watch("handle") || "url-produkta"}
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
										placeholder="Подробное описание продукта"
										rows={4}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid gap-4 items-end sm:grid-cols-2">
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Цена (₽)</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="number"
											placeholder="0"
											min="0"
											step="0.01"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</CardContent>
			</Card>

			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Категории</CardTitle>
					<CardDescription>
						Выберите категории для продукта
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FormField
						control={form.control}
						name="categories"
						render={() => (
							<FormItem>
								<div className="grid grid-cols-2 gap-4">
									{categories.map((category) => (
										<FormField
											key={category.handle}
											control={form.control}
											name="categories"
											render={({ field }) => {
												return (
													<FormItem
														key={category.handle}
														className="flex flex-row items-start space-x-3 space-y-0"
													>
														<FormControl>
															<Checkbox
																checked={field.value?.includes(
																	category.handle,
																)}
																onCheckedChange={(
																	checked,
																) => {
																	return checked
																		? field.onChange(
																				[
																					...field.value,
																					category.handle,
																				],
																			)
																		: field.onChange(
																				field.value?.filter(
																					(
																						value,
																					) =>
																						value !==
																						category.handle,
																				),
																			);
																}}
															/>
														</FormControl>
														<FormLabel className="font-normal">
															{category.name}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Изображения</CardTitle>
					<CardDescription>
						{productHandle
							? "Управление изображениями продукта"
							: "Добавьте изображения для продукта"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{images.length > 0 && (
						<div className="grid grid-cols-3 gap-4 mb-4">
							{images.map((image, index) => (
								<div key={index} className="relative group">
									<img
										src={image}
										alt={`Product image ${index + 1}`}
										className={`w-full h-32 object-cover rounded-lg border ${
											primaryImageIndex === index
												? "border-primary ring-2 ring-primary/20"
												: "border-border"
										}`}
									/>
									{primaryImageIndex === index && (
										<div className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded flex items-center">
											<Star className="h-3 w-3 mr-1" />
											Основное
										</div>
									)}
									<div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
										<Button
											type="button"
											size="icon"
											variant="secondary"
											className="h-6 w-6 rounded-full"
											onClick={() =>
												setPrimaryImage(index)
											}
											title="Сделать основным"
										>
											<Star className="h-3 w-3" />
										</Button>
										<Button
											type="button"
											size="icon"
											variant="destructive"
											className="h-6 w-6 rounded-full"
											onClick={() => removeImage(index)}
											title="Удалить"
										>
											<X className="h-3 w-3" />
										</Button>
									</div>
								</div>
							))}
						</div>
					)}

					<div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
						<Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
						<div className="mt-4">
							<Input
								ref={fileInputRef}
								type="file"
								multiple
								accept="image/*"
								onChange={handleImageUpload}
								disabled={uploading}
								className="hidden"
								id="image-upload"
							/>
							<Button
								type="button"
								variant="outline"
								onClick={triggerFileInput}
								disabled={uploading}
							>
								{uploading
									? "Загрузка..."
									: "Загрузить изображения"}
							</Button>
						</div>
						<p className="mt-2 text-sm text-muted-foreground">
							Выберите одно или несколько изображений
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
								<FormLabel>Активный продукт</FormLabel>
								<FormDescription>
									Если отмечено, продукт будет виден
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
		<AdminFormLayout<ProductFormValues>
			onSubmit={onSubmit}
			title={productHandle ? "Редактировать продукт" : "Новый продукт"}
			description={
				productHandle
					? "Изменение информации о товаре"
					: "Добавьте новый товар в каталог"
			}
			backHref="/admin/products"
			backLabel="Назад к товарам"
			form={form}
			sidebar={sidebarContent}
			submitLabel={
				productHandle ? "Сохранить изменения" : "Создать продукт"
			}
			cancelHref="/admin/products"
		>
			{mainContent}
		</AdminFormLayout>
	);
}

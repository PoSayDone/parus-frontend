"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import WysiwygEditor from "@/modules/admin/components/wysiwyg-editor";
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
import { IconPicker } from "@/components/ui/icon-picker";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TagsInput } from "@/components/ui/tags-input";
import { Textarea } from "@/components/ui/textarea";
import { createService, getService, updateService } from "@/lib/data/services";
import { uploadFile } from "@/lib/data/uploads";
import { cn } from "@/lib/utils";
import { SlugHandler } from "../components/slug-handler";
import {
	type ServiceFormValues,
	serviceFormSchema,
} from "../schemas/service-form-schema";
import { AdminFormLayout } from "./admin-form-layout";

export default function ServiceForm({
	serviceHandle,
}: {
	serviceHandle?: string;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(!!serviceHandle);
	const [images, setImages] = useState<string[]>([]);
	const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(0);
	const [uploading, setUploading] = useState(false);

	const form = useForm<ServiceFormValues>({
		resolver: zodResolver(serviceFormSchema),
		defaultValues: {
			title: "",
			metaTitle: "",
			metaDescription: "",
			handle: "",
			shortDescription: "",
			description: "",
			icon: undefined,
			thumbnail: "",
			images: [],
			price: "",
			duration: "",
			features: [],
			included: [],
			active: true,
		},
		mode: "onChange",
	});

	const { handleFieldChange: handleNameChange } = SlugHandler({
		form,
		fieldName: "title",
		slugFieldName: "handle",
	});

	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		handleNameChange(value);
		form.setValue("title", value);
	};

	// Fetch service data for edit mode
	useEffect(() => {
		const fetchService = async () => {
			if (!serviceHandle) return;

			try {
				const serviceData = await getService(serviceHandle);

				if (serviceData) {
					form.reset({
						title: serviceData.title,
						metaTitle: serviceData.metaTitle || "",
						metaDescription: serviceData.metaDescription || "",
						handle: serviceData.handle,
						shortDescription: serviceData.shortDescription || "",
						description: serviceData.description,
						icon: serviceData.icon
							? (serviceData.icon as ServiceFormValues["icon"])
							: undefined,
						thumbnail: serviceData.thumbnail || "",
						images: serviceData.images || [],
						price: serviceData.price,
						duration: serviceData.duration || "",
						features: serviceData.features || [],
						included: serviceData.included || [],
						active: serviceData.active,
					});

					if (serviceData.images && serviceData.images.length > 0) {
						setImages(serviceData.images);
						// Find primary image index (if thumbnail matches one of the images)
						const primaryIndex = serviceData.images.indexOf(
							serviceData.thumbnail || "",
						);
						if (primaryIndex !== -1) {
							setPrimaryImageIndex(primaryIndex);
						}
					}
				} else {
					console.error("Service not found");
				}
			} catch (error) {
				console.error("Error fetching service:", error);
			} finally {
				setLoading(false);
			}
		};

		if (serviceHandle) {
			fetchService();
		}
	}, [serviceHandle, form]);

	const onSubmit = async (values: ServiceFormValues) => {
		try {
			const thumbnail =
				images.length > 0
					? images[primaryImageIndex]
					: values.thumbnail;

			// Normalize optional fields for Prisma
			const serviceData = {
				...values,
				thumbnail: thumbnail || null,
				images,
				shortDescription: values.shortDescription || null,
				metaTitle: values.metaTitle || null,
				metaDescription: values.metaDescription || null,
				icon: values.icon || null,
				duration: values.duration || null,
				features: values.features || [],
				included: values.included || [],
			};

			let result;
			if (serviceHandle) {
				result = await updateService(serviceHandle, serviceData);
			} else {
				result = await createService(serviceData);
			}

			if (result) {
				router.push("/admin/services");
				router.refresh();
			} else {
				toast.error(
					serviceHandle
						? "Ошибка при обновлении услуги"
						: "Ошибка при создании услуги",
				);
			}
		} catch (error) {
			console.error("Error saving service:", error);
			toast.error(
				serviceHandle
					? "Ошибка при обновлении услуги"
					: "Ошибка при создании услуги",
			);
		}
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
		return <div className="p-6">Загрузка услуги...</div>;
	}

	const mainContent = (
		<>
			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Основная информация</CardTitle>
					<CardDescription>
						{serviceHandle
							? "Обновите данные услуги"
							: "Заполните данные о новой услуге"}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Название *</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите название услуги"
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
										placeholder="url-servisa"
									/>
								</FormControl>
								<FormDescription>
									Будет использоваться в URL: /service/
									{form.watch("handle") || "url-servisa"}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="shortDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Краткое описание</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Краткое описание услуги"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание *</FormLabel>
								<FormControl>
									<WysiwygEditor
										value={field.value}
										onChange={(event) =>
											field.onChange(
												event.target.value,
											)
										}
										placeholder="Полное описание услуги"
										minHeight={160}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="metaTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Meta title</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Meta title (до 200 символов)"
									/>
								</FormControl>
								<FormDescription>
									Если не задано, будет использовано
									название услуги
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="metaDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Meta description</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Meta description (до 500 символов)"
										rows={3}
									/>
								</FormControl>
								<FormDescription>
									Если не задано, будет использовано
									краткое описание
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Цена *</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите цену услуги"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="duration"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Длительность</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите длительность услуги"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="icon"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Иконка</FormLabel>
								<FormControl>
									<IconPicker
										triggerPlaceholder="Выбрать иконку"
										searchPlaceholder="Название иконки..."
										value={field.value}
										onValueChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="features"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Особенности услуги</FormLabel>
								<FormControl>
									<TagsInput
										placeholder="Добавьте особенность и нажмите Enter"
										value={field.value || []}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="included"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Включено в услугу</FormLabel>
								<FormControl>
									<TagsInput
										placeholder="Добавьте пункт и нажмите Enter"
										value={field.value || []}
										onChange={field.onChange}
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
					<CardTitle>Изображения</CardTitle>
					<CardDescription>
						{serviceHandle
							? "Управление изображениями услуги"
							: "Добавьте изображения для услуги"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{images.length > 0 && (
						<div className="grid grid-cols-3 gap-4 mb-4">
							{images.map((image, index) => (
								<div key={image} className="relative group">
									<img
										src={image}
										alt={`Product ${index + 1}`}
										className={cn(
											"w-full h-32 object-cover rounded-lg border",
											primaryImageIndex === index
												? "border-primary ring-2 ring-primary/20"
												: "border-border",
										)}
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
								<FormLabel>Активная услуга</FormLabel>
								<FormDescription>
									Если отмечено, услуга будет видна
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
		<AdminFormLayout<ServiceFormValues>
			title={serviceHandle ? "Редактировать услугу" : "Новая услуга"}
			description={
				serviceHandle
					? "Изменение информации об услуге"
					: "Добавьте новую услугу"
			}
			backHref="/admin/services"
			backLabel="Назад к услугам"
			sidebar={sidebarContent}
			submitLabel={serviceHandle ? "Сохранить изменения" : "Создать"}
			form={form}
			onSubmit={onSubmit}
		>
			{mainContent}
		</AdminFormLayout>
	);
}

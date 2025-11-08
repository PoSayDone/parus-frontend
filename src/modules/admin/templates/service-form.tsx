"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
	createService,
	getService,
	updateService,
} from "@/lib/data/services-db";
import { uploadFile } from "@/lib/data/uploads";
import {
	type ServiceFormValues,
	serviceFormSchema,
} from "../schemas/service-form-schema";
import { AdminFormLayout } from "./admin-form-layout";

export default function ServiceForm({ serviceId }: { serviceId?: string }) {
	const router = useRouter();
	const [loading, setLoading] = useState(!!serviceId);
	const [images, setImages] = useState<string[]>([]);
	const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(0);
	const [uploading, setUploading] = useState(false);

	const form = useForm<ServiceFormValues>({
		resolver: zodResolver(serviceFormSchema),
		defaultValues: {
			title: "",
			shortDescription: "",
			description: "",
			icon: "",
			image: "",
			thumbnail: "",
			images: [],
			price: "",
			duration: "",
			features: [],
			included: [],
			gallery: [],
			active: true,
		},
		mode: "onChange",
	});

	// Fetch service data for edit mode
	useEffect(() => {
		const fetchService = async () => {
			if (!serviceId) return;

			try {
				const serviceData = await getService(serviceId);

				if (serviceData) {
					form.reset({
						title: serviceData.title,
						shortDescription: serviceData.shortDescription || "",
						description: serviceData.description,
						icon: serviceData.icon || "",
						image: serviceData.image || "",
						thumbnail: serviceData.thumbnail || "",
						images: serviceData.images || [],
						price: serviceData.price,
						duration: serviceData.duration || "",
						features: serviceData.features || [],
						included: serviceData.included || [],
						gallery: serviceData.gallery || [],
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

		if (serviceId) {
			fetchService();
		}
	}, [serviceId, form]);

	const onSubmit = async (values: ServiceFormValues) => {
		try {
			const thumbnail =
				images.length > 0
					? images[primaryImageIndex]
					: values.thumbnail;

			// Include images in the values
			const serviceData = {
				...values,
				thumbnail,
				images,
			};

			let result;
			if (serviceId) {
				result = await updateService(serviceId, serviceData);
			} else {
				result = await createService(serviceData);
			}

			if (result) {
				router.push("/admin/services");
				router.refresh();
			} else {
				toast.error(
					serviceId
						? "Ошибка при обновлении услуги"
						: "Ошибка при создании услуги",
				);
			}
		} catch (error) {
			console.error("Error saving service:", error);
			toast.error(
				serviceId
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
						{serviceId
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
									/>
								</FormControl>
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
									<Textarea
										{...field}
										placeholder="Полное описание услуги"
										rows={4}
									/>
								</FormControl>
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
									<Input
										{...field}
										placeholder="Введите имя иконки"
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
						{serviceId
							? "Управление изображениями услуги"
							: "Добавьте изображения для услуги"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{images.length > 0 && (
						<div className="grid grid-cols-3 gap-4 mb-4">
							{images.map((image, index) => (
								<div key={index} className="relative group">
									// eslint-disable-next-line
									@next/next/no-img-element
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
			title={serviceId ? "Редактировать услугу" : "Новая услуга"}
			description={
				serviceId
					? "Изменение информации об услуге"
					: "Добавьте новую услугу"
			}
			backHref="/admin/services"
			backLabel="Назад к услугам"
			sidebar={sidebarContent}
			submitLabel={serviceId ? "Сохранить изменения" : "Создать"}
			form={form}
			onSubmit={onSubmit}
		>
			{mainContent}
		</AdminFormLayout>
	);
}

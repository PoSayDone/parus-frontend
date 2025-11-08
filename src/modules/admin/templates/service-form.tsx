"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FormControl,
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
import {
	type ServiceFormValues,
	serviceFormSchema,
} from "../schemas/service-form-schema";
import { AdminFormLayout } from "./admin-form-layout";

export default function ServiceForm({ serviceId }: { serviceId?: string }) {
	const router = useRouter();
	const [loading, setLoading] = useState(!!serviceId);

	const form = useForm<ServiceFormValues>({
		resolver: zodResolver(serviceFormSchema),
		defaultValues: {
			title: "",
			shortDescription: "",
			description: "",
			icon: "",
			image: "",
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
						price: serviceData.price,
						duration: serviceData.duration || "",
						features: serviceData.features || [],
						included: serviceData.included || [],
						gallery: serviceData.gallery || [],
						active: serviceData.active,
					});
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
			let result;
			if (serviceId) {
				result = await updateService(serviceId, values);
			} else {
				result = await createService(values);
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

					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Изображение</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите URL изображения"
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
					name="active"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
							<div className="space-y-0.5">
								<FormLabel>Активна</FormLabel>
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

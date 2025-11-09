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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TagsInput } from "@/components/ui/tags-input";
import { Textarea } from "@/components/ui/textarea";
import {
	createPricePlan,
	getPricePlan,
	updatePricePlan,
} from "@/lib/data/pricing-db";
import {
	type PricePlanFormValues,
	pricePlanFormSchema,
} from "../schemas/price-plan-form-schema";
import { AdminFormLayout } from "./admin-form-layout";

export default function PricePlanForm({
	pricePlanId,
}: {
	pricePlanId?: string;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(!!pricePlanId);

	const form = useForm<PricePlanFormValues>({
		resolver: zodResolver(pricePlanFormSchema),
		defaultValues: {
			title: "",
			description: "",
			price: "",
			creditPrice: "",
			popular: false,
			active: true,
		},
		mode: "onChange",
	});

	// Fetch price plan data for edit mode
	useEffect(() => {
		const fetchPricePlan = async () => {
			if (!pricePlanId) return;

			try {
				const pricePlanData = await getPricePlan(pricePlanId);

				if (pricePlanData) {
					form.reset({
						title: pricePlanData.title,
						included: pricePlanData.included || [],
						description: pricePlanData.description,
						price: pricePlanData.price,
						creditPrice: pricePlanData.creditPrice || "",
						popular: pricePlanData.popular,
						active: pricePlanData.active,
					});
				} else {
					console.error("Price plan not found");
				}
			} catch (error) {
				console.error("Error fetching price plan:", error);
			} finally {
				setLoading(false);
			}
		};

		if (pricePlanId) {
			fetchPricePlan();
		}
	}, [pricePlanId, form]);

	const onSubmit = async (values: PricePlanFormValues) => {
		try {
			let result;
			if (pricePlanId) {
				result = await updatePricePlan(pricePlanId, values);
			} else {
				result = await createPricePlan(values);
			}

			if (result) {
				router.push("/admin/pricing");
				router.refresh();
			} else {
				toast.error(
					pricePlanId
						? "Ошибка при обновлении плана цен"
						: "Ошибка при создании плана цен",
				);
			}
		} catch (error) {
			console.error("Error saving price plan:", error);
			toast.error(
				pricePlanId
					? "Ошибка при обновлении плана цен"
					: "Ошибка при создании плана цен",
			);
		}
	};

	if (loading) {
		return <div className="p-6">Загрузка плана цен...</div>;
	}

	const mainContent = (
		<>
			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Основная информация</CardTitle>
					<CardDescription>
						{pricePlanId
							? "Обновите данные плана цен"
							: "Заполните данные о новом плане цен"}
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
										placeholder="Введите название плана"
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
										placeholder="Введите описание плана"
										rows={3}
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
										placeholder="Введите цену"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="creditPrice"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Цена в рассрочку</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите цену в рассрочку"
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
								<FormLabel>Включено в пакет</FormLabel>
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
					name="popular"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center space-x-3 space-y-0">
							<div className="space-y-1 leading-none w-full">
								<FormLabel>Популярный</FormLabel>
								<FormDescription>
									Если отмечено, пакет услуг будет отмечен как
									популярный
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

				<FormField
					control={form.control}
					name="active"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center space-x-3 space-y-0">
							<div className="space-y-1 leading-none w-full">
								<FormLabel>Активный</FormLabel>
								<FormDescription>
									Если отмечено, пакет услуг будет виден
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
		<AdminFormLayout<PricePlanFormValues>
			title={pricePlanId ? "Редактировать план цен" : "Новый план цен"}
			description={
				pricePlanId
					? "Изменение информации о плане цен"
					: "Добавьте новый план цен"
			}
			backHref="/admin/pricing"
			backLabel="Назад к планам цен"
			sidebar={sidebarContent}
			submitLabel={pricePlanId ? "Сохранить изменения" : "Создать"}
			form={form}
			onSubmit={onSubmit}
		>
			{mainContent}
		</AdminFormLayout>
	);
}

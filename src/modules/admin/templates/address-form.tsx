"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AdminFormLayout } from "./admin-form-layout";
import {
	addressFormSchema,
	AddressFormValues,
} from "../schemas/address-form-schema";
import {
	getAddress,
	createAddress,
	updateAddress,
} from "@/lib/data/addresses-db";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function AddressForm({ addressId }: { addressId?: string }) {
	const router = useRouter();
	const [loading, setLoading] = useState(!!addressId);

	const form = useForm<AddressFormValues>({
		resolver: zodResolver(addressFormSchema),
		defaultValues: {
			type: "zags",
			name: "",
			address: "",
			phone: "",
			schedule: "",
			district: "",
			location: "",
		},
		mode: "onChange",
	});

	// Fetch address data for edit mode
	useEffect(() => {
		const fetchAddress = async () => {
			if (!addressId) return;

			try {
				const addressData = await getAddress(addressId);

				if (addressData) {
					form.reset({
						type: addressData.type,
						name: addressData.name,
						address: addressData.address || "",
						phone: addressData.phone || "",
						schedule: addressData.schedule || "",
						district: addressData.district || "",
						location: addressData.location || "",
					});
				} else {
					console.error("Address not found");
				}
			} catch (error) {
				console.error("Error fetching address:", error);
			} finally {
				setLoading(false);
			}
		};

		if (addressId) {
			fetchAddress();
		}
	}, [addressId, form]);

	const onSubmit = async (values: AddressFormValues) => {
		try {
			let result;
			if (addressId) {
				result = await updateAddress(addressId, values);
			} else {
				result = await createAddress(values);
			}

			if (result) {
				router.push("/admin/addresses");
				router.refresh();
			} else {
				toast.error(
					addressId
						? "Ошибка при обновлении адреса"
						: "Ошибка при создании адреса",
				);
			}
		} catch (error) {
			console.error("Error saving address:", error);
			toast.error(
				addressId
					? "Ошибка при обновлении адреса"
					: "Ошибка при создании адреса",
			);
		}
	};

	if (loading) {
		return <div className="p-6">Загрузка адреса...</div>;
	}

	const mainContent = (
		<>
			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Основная информация</CardTitle>
					<CardDescription>
						{addressId
							? "Обновите данные адреса"
							: "Заполните данные о новом адресе"}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Тип *</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Выберите тип адреса" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="zags">
											ЗАГС
										</SelectItem>
										<SelectItem value="morgue">
											Морг
										</SelectItem>
										<SelectItem value="cemetery">
											Кладбище
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Название *</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите название"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Адрес *</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите адрес"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Телефон</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите телефон"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="schedule"
						render={({ field }) => (
							<FormItem>
								<FormLabel>График работы</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите график работы"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="district"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Район</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите район"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Расположение</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Введите расположение"
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
								<FormLabel>Активен</FormLabel>
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
		<AdminFormLayout<AddressFormValues>
			title={addressId ? "Редактировать адрес" : "Новый адрес"}
			description={
				addressId
					? "Изменение информации об адресе"
					: "Добавьте новый адрес"
			}
			backHref="/admin/addresses"
			backLabel="Назад к адресам"
			sidebar={sidebarContent}
			submitLabel={addressId ? "Сохранить изменения" : "Создать"}
			form={form}
			onSubmit={onSubmit}
		>
			{mainContent}
		</AdminFormLayout>
	);
}

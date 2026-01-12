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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createAddress, getAddress, updateAddress } from "@/lib/data/addresses";
import {
	type AddressFormValues,
	addressFormSchema,
} from "../schemas/address-form-schema";
import { AdminFormLayout } from "./admin-form-layout";

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
			active: true,
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
						active: addressData.active,
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
			const payload = {
				...values,
				phone: values.phone || null,
				schedule: values.schedule || null,
				district: values.district || null,
				location: values.location || null,
			};
			let result;
			if (addressId) {
				result = await updateAddress(addressId, payload);
			} else {
				result = await createAddress(payload);
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

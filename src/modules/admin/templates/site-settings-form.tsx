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
import { Textarea } from "@/components/ui/textarea";
import {
	getSiteSettings,
	updateSiteSettings,
} from "@/lib/data/site-settings";
import {
	siteSettingsFormSchema,
	type SiteSettingsFormValues,
} from "../schemas/site-settings-form-schema";
import { AdminFormLayout } from "./admin-form-layout";

const DEFAULT_SETTINGS: SiteSettingsFormValues = {
	phone: "+79999999999",
	email: "parus@perm.ru",
	address: "г. Пермь, Советской армии 52\nэтаж 128, офис 812",
	footerNote:
		"Похоронное бюро в СПб ООО «Центр РУ». © 2025. ИНН: 7813661578, КПП: 780601001",
};

export default function SiteSettingsForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	const form = useForm<SiteSettingsFormValues>({
		resolver: zodResolver(siteSettingsFormSchema),
		defaultValues: DEFAULT_SETTINGS,
		mode: "onChange",
	});

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const settings = await getSiteSettings();
				if (settings) {
					form.reset({
						phone: settings.phone,
						email: settings.email,
						address: settings.address,
						footerNote: settings.footerNote,
					});
				} else {
					form.reset(DEFAULT_SETTINGS);
				}
			} catch (error) {
				console.error("Error fetching site settings:", error);
				toast.error("Не удалось загрузить настройки");
			} finally {
				setLoading(false);
			}
		};

		fetchSettings();
	}, [form]);

	const onSubmit = async (values: SiteSettingsFormValues) => {
		try {
			await updateSiteSettings(values);
			toast.success("Настройки обновлены");
			router.refresh();
		} catch (error) {
			console.error("Error updating site settings:", error);
			toast.error("Ошибка при сохранении настроек");
		}
	};

	if (loading) {
		return <div className="p-6">Загрузка настроек...</div>;
	}

	const mainContent = (
		<Card className="bg-transparent border-border-variant">
			<CardHeader>
				<CardTitle>Контактные данные</CardTitle>
				<CardDescription>
					Телефон, адрес и текст футера
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Телефон *</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="+79999999999"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email *</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="email"
									placeholder="info@example.com"
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
								<Textarea
									{...field}
									placeholder="Город, улица, дом"
									rows={3}
								/>
							</FormControl>
							<FormDescription>
								Перенос строки сохраняется
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="footerNote"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Строка в футере *</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Юридическая строка"
									rows={3}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);

	const sidebarContent = (
		<Card className="bg-transparent border-border-variant">
			<CardHeader>
				<CardTitle>Подсказка</CardTitle>
				<CardDescription>
					Эти данные отображаются в футере сайта
				</CardDescription>
			</CardHeader>
		</Card>
	);

	return (
		<AdminFormLayout<SiteSettingsFormValues>
			title="Настройки"
			description="Контакты и строка футера"
			backHref="/admin"
			backLabel="Назад в панель"
			sidebar={sidebarContent}
			submitLabel="Сохранить"
			form={form}
			onSubmit={onSubmit}
		>
			{mainContent}
		</AdminFormLayout>
	);
}

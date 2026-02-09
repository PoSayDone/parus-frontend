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
	showCatalog: true,
	landingMetaTitle: "",
	landingMetaDescription: "",
	addressesMetaTitle: "",
	addressesMetaDescription: "",
	pricesMetaTitle: "",
	pricesMetaDescription: "",
	blogMetaTitle: "",
	blogMetaDescription: "",
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
						showCatalog: settings.showCatalog ?? true,
						landingMetaTitle:
							settings.landingMetaTitle || "",
						landingMetaDescription:
							settings.landingMetaDescription || "",
						addressesMetaTitle:
							settings.addressesMetaTitle || "",
						addressesMetaDescription:
							settings.addressesMetaDescription || "",
						pricesMetaTitle:
							settings.pricesMetaTitle || "",
						pricesMetaDescription:
							settings.pricesMetaDescription || "",
						blogMetaTitle: settings.blogMetaTitle || "",
						blogMetaDescription:
							settings.blogMetaDescription || "",
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
		<>
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

					<FormField
						control={form.control}
						name="showCatalog"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center space-x-3 space-y-0">
								<div className="space-y-1 leading-none w-full">
									<FormLabel>Показывать каталог</FormLabel>
									<FormDescription>
										Если отключено, раздел каталога будет скрыт
										из навигации и sitemap
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

			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>SEO для страниц</CardTitle>
					<CardDescription>
						Meta title и meta description для ключевых разделов
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="landingMetaTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Главная: Meta title</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Meta title для главной"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="landingMetaDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Главная: Meta description
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Meta description для главной"
										rows={3}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="addressesMetaTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Адреса: Meta title</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Meta title для страницы адресов"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="addressesMetaDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Адреса: Meta description
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Meta description для страницы адресов"
										rows={3}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="pricesMetaTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Цены: Meta title</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Meta title для страницы цен"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="pricesMetaDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Цены: Meta description</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Meta description для страницы цен"
										rows={3}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="blogMetaTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Блог: Meta title</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Meta title для блога"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="blogMetaDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Блог: Meta description</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Meta description для блога"
										rows={3}
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

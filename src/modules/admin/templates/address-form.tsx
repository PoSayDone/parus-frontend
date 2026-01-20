"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
import { TagsInput } from "@/components/ui/tags-input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createAddress, getAddress, updateAddress } from "@/lib/data/addresses";
import { uploadFile } from "@/lib/data/uploads";
import {
	type AddressFormValues,
	addressFormSchema,
} from "../schemas/address-form-schema";
import { AdminFormLayout } from "./admin-form-layout";

export default function AddressForm({ addressId }: { addressId?: string }) {
	const router = useRouter();
	const [loading, setLoading] = useState(!!addressId);
	const [images, setImages] = useState<string[]>([]);
	const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(0);
	const [uploading, setUploading] = useState(false);

	const form = useForm<AddressFormValues>({
		resolver: zodResolver(addressFormSchema),
		defaultValues: {
			type: "zags",
			handle: "",
			name: "",
			address: "",
			phone: [],
			schedule: "",
			district: "",
			description: "",
			cemeteryStatus: "",
			cemeteryDocuments: [],
			cemeteryNote: "",
			cemeteryImages: [],
			cemeteryThumbnail: "",
			cemeteryLat: "",
			cemeteryLng: "",
			active: true,
		},
		mode: "onChange",
	});
	const addressType = form.watch("type");
	const isCemetery = addressType === "cemetery";

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
						handle: addressData.handle || "",
						name: addressData.name,
						address: addressData.address || "",
						phone: addressData.phone || [],
						schedule: addressData.schedule || "",
						district: addressData.district || "",
						description: addressData.description || "",
						cemeteryStatus: addressData.cemeteryStatus || "",
						cemeteryDocuments:
							addressData.cemeteryDocuments || [],
						cemeteryNote: addressData.cemeteryNote || "",
						cemeteryImages: addressData.cemeteryImages || [],
						cemeteryThumbnail:
							addressData.cemeteryThumbnail || "",
						cemeteryLat: addressData.cemeteryLat
							? addressData.cemeteryLat.toString()
							: "",
						cemeteryLng: addressData.cemeteryLng
							? addressData.cemeteryLng.toString()
							: "",
					});

					if (
						addressData.cemeteryImages &&
						addressData.cemeteryImages.length > 0
					) {
						setImages(addressData.cemeteryImages);
						const primaryIndex =
							addressData.cemeteryImages.indexOf(
								addressData.cemeteryThumbnail || "",
							);
						if (primaryIndex !== -1) {
							setPrimaryImageIndex(primaryIndex);
						}
					}
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

	const fileInputRef = useRef<HTMLInputElement>(null);

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

			const newImages = [...images, ...uploadedUrls];
			setImages(newImages);
			form.setValue("cemeteryImages", newImages);

			if (images.length === 0 && uploadedUrls.length > 0) {
				setPrimaryImageIndex(0);
				form.setValue("cemeteryThumbnail", uploadedUrls[0]);
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
		form.setValue("cemeteryImages", newImages);

		if (index === primaryImageIndex && newImages.length > 0) {
			setPrimaryImageIndex(0);
			form.setValue("cemeteryThumbnail", newImages[0]);
		} else if (index < primaryImageIndex) {
			setPrimaryImageIndex(primaryImageIndex - 1);
		} else if (primaryImageIndex >= newImages.length) {
			setPrimaryImageIndex(Math.max(0, newImages.length - 1));
		}

		if (newImages.length > 0) {
			form.setValue(
				"cemeteryThumbnail",
				newImages[primaryImageIndex] || newImages[0],
			);
		} else {
			form.setValue("cemeteryThumbnail", "");
		}
	};

	const setPrimaryImage = (index: number) => {
		setPrimaryImageIndex(index);
		form.setValue("cemeteryThumbnail", images[index]);
	};

	const onSubmit = async (values: AddressFormValues) => {
		try {
			const normalizedHandle = values.handle?.trim().toLowerCase() || "";
			const cemeteryPayload = values.type === "cemetery";
			const thumbnail = cemeteryPayload
				? images[primaryImageIndex] || ""
				: "";
			const parseCoordinate = (value: string | undefined) => {
				if (!value) return null;
				const parsed = Number(value);
				return Number.isFinite(parsed) ? parsed : null;
			};
			const payload = {
				...values,
				handle: cemeteryPayload ? normalizedHandle || null : null,
				phone: values.phone || [],
				schedule: values.schedule || null,
				district: values.district || null,
				description: values.description || null,
				cemeteryStatus: cemeteryPayload
					? values.cemeteryStatus || null
					: null,
				cemeteryDocuments: cemeteryPayload
					? values.cemeteryDocuments || []
					: [],
				cemeteryNote: cemeteryPayload
					? values.cemeteryNote || null
					: null,
				cemeteryImages: cemeteryPayload ? images : [],
				cemeteryThumbnail: cemeteryPayload ? thumbnail || null : null,
				cemeteryLat: cemeteryPayload
					? parseCoordinate(values.cemeteryLat)
					: null,
				cemeteryLng: cemeteryPayload
					? parseCoordinate(values.cemeteryLng)
					: null,
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

					{isCemetery && (
						<FormField
							control={form.control}
							name="handle"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Слаг страницы *</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="severnoe-okulovskoe"
										/>
									</FormControl>
									<FormDescription>
										Используется в URL страницы
										кладбища.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}

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
								<FormLabel>Телефоны</FormLabel>
								<FormControl>
									<TagsInput
										placeholder="Добавьте телефон и нажмите Enter"
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
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Краткое описание адреса"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			{isCemetery && (
				<Card className="bg-transparent border-border-variant">
					<CardHeader>
						<CardTitle>Информация о кладбище</CardTitle>
						<CardDescription>
							Данные для страницы конкретного кладбища
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="cemeteryStatus"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Статус захоронений</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Опишите статус захоронений"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="cemeteryDocuments"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Документы для захоронения</FormLabel>
									<FormControl>
										<TagsInput
											placeholder="Добавьте документ и нажмите Enter"
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
							name="cemeteryNote"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Примечание</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Дополнительные условия или примечания"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid gap-4 md:grid-cols-2">
							<FormField
								control={form.control}
								name="cemeteryLat"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Широта</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												step="0.000001"
												placeholder="58.0105"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="cemeteryLng"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Долгота</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												step="0.000001"
												placeholder="56.2502"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="space-y-3">
							<div className="text-sm font-medium">
								Изображения кладбища
							</div>
							{images.length > 0 && (
								<div className="grid grid-cols-3 gap-4">
									{images.map((image, index) => (
										<div
											key={image}
											className="relative group"
										>
											<img
												src={image}
												alt={`Cemetery ${index + 1}`}
												className={`w-full h-28 object-cover rounded-lg border ${
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
												<button
													type="button"
													className="h-6 w-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center"
													onClick={() =>
														setPrimaryImage(index)
													}
													title="Сделать основным"
												>
													<Star className="h-3 w-3" />
												</button>
												<button
													type="button"
													className="h-6 w-6 rounded-full bg-destructive text-white flex items-center justify-center"
													onClick={() =>
														removeImage(index)
													}
													title="Удалить"
												>
													<X className="h-3 w-3" />
												</button>
											</div>
										</div>
									))}
								</div>
							)}

							<div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
								<Upload className="mx-auto h-10 w-10 text-muted-foreground/50" />
								<div className="mt-3">
									<Input
										ref={fileInputRef}
										type="file"
										multiple
										accept="image/*"
										onChange={handleImageUpload}
										disabled={uploading}
										className="hidden"
									/>
									<button
										type="button"
										onClick={triggerFileInput}
										disabled={uploading}
										className="inline-flex items-center justify-center rounded-full border border-input bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
									>
										{uploading
											? "Загрузка..."
											: "Загрузить изображения"}
									</button>
								</div>
								<p className="mt-2 text-sm text-muted-foreground">
									Выберите одно или несколько изображений
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
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

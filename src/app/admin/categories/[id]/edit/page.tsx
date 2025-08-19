"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Package, Flower, Shirt, Wrench } from "lucide-react";
import Link from "next/link";
import LabelInput from "@/components/ui/floating-input";

const iconOptions = [
	{ value: "Package", label: "Коробка", icon: Package },
	{ value: "Flower", label: "Цветок", icon: Flower },
	{ value: "Shirt", label: "Одежда", icon: Shirt },
	{ value: "Wrench", label: "Инструменты", icon: Wrench },
];

export default function EditCategoryPage() {
	const router = useRouter();
	const params = useParams();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		handle: "",
		icon: "Package",
		status: true,
	});
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const handle = params.id as string;

	// Fetch category data
	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const response = await fetch(`/api/admin/categories/${handle}`);
				const data = await response.json();

				if (response.ok) {
					setFormData({
						name: data.category.name,
						description: data.category.description || "",
						handle: data.category.handle,
						icon: data.category.icon || "Package",
						status: data.category.status === "active",
					});
				} else {
					console.error("Error fetching category:", data.error);
				}
			} catch (error) {
				console.error("Error fetching category:", error);
			} finally {
				setLoading(false);
			}
		};

		if (handle) {
			fetchCategory();
		}
	}, [handle]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			const response = await fetch(`/api/admin/categories/${handle}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formData.name,
					description: formData.description,
					handle: formData.handle,
					icon: formData.icon,
					status: formData.status ? "active" : "inactive",
				}),
			});

			if (response.ok) {
				router.push("/admin/categories");
			} else {
				const error = await response.json();
				console.error("Error updating category:", error.error);
				alert("Ошибка при обновлении категории");
			}
		} catch (error) {
			console.error("Error updating category:", error);
			alert("Ошибка при обновлении категории");
		} finally {
			setSaving(false);
		}
	};

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const getSelectedIcon = () => {
		const selected = iconOptions.find(
			(option) => option.value === formData.icon,
		);
		return selected ? <selected.icon className="h-4 w-4" /> : null;
	};

	if (loading) {
		return <div className="p-6">Загрузка категории...</div>;
	}

	return (
		<div className="space-y-6">
			<div className="flex flex-col items-start space-x-4">
				<Link
					href="/admin/categories"
					className={buttonVariants({
						variant: "ghost",
						size: "sm",
						className: "mb-2",
					})}
				>
					<ArrowLeft className="h-4 w-4" />
					Назад к категориям
				</Link>
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Редактировать категорию
					</h2>
					<p className="text-muted-foreground">
						Изменение информации о категории
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<Card className="bg-transparent border-border-variant">
							<CardHeader>
								<CardTitle>Основная информация</CardTitle>
								<CardDescription>
									Обновите данные категории
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<LabelInput
										id="name"
										label="Название категории"
										value={formData.name}
										onChange={(e) =>
											handleInputChange(
												"name",
												e.target.value,
											)
										}
										placeholder="Введите название категории"
										required
									/>
								</div>

								<div className="space-y-2">
									<LabelInput
										id="handle"
										label="URL (handle)"
										value={formData.handle}
										onChange={(e) =>
											handleInputChange(
												"handle",
												e.target.value,
											)
										}
										placeholder="url-kategorii"
										required
									/>
									<p className="text-sm text-muted-foreground">
										Будет использоваться в URL: /categories/
										{formData.handle}
									</p>
								</div>

								<div className="space-y-2">
									<Label htmlFor="description">
										Описание
									</Label>
									<Textarea
										id="description"
										value={formData.description}
										onChange={(e) =>
											handleInputChange(
												"description",
												e.target.value,
											)
										}
										placeholder="Краткое описание категории"
										rows={3}
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					<div>
						<Card className="bg-transparent border-border-variant">
							<CardHeader>
								<CardTitle>Настройки</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Активная категория</Label>
										<p className="text-sm text-muted-foreground">
											Показывать категорию на сайте
										</p>
									</div>
									<Switch
										checked={formData.status}
										onCheckedChange={(checked) =>
											handleInputChange("status", checked)
										}
									/>
								</div>
							</CardContent>
						</Card>

						<div className="flex flex-col space-y-2 mt-6">
							<Button
								type="submit"
								className="w-full"
								disabled={saving}
							>
								<Save className="mr-2 h-4 w-4" />
								{saving
									? "Сохранение..."
									: "Сохранить изменения"}
							</Button>
							<Link
								href="/admin/categories"
								className={buttonVariants({
									variant: "outline",
									className: "w-full bg-transparent",
								})}
							>
								Отмена
							</Link>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

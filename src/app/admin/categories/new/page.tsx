"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import LabelInput from "@/components/ui/floating-input";

export default function NewCategoryPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		handle: "",
		icon: "Package",
		status: true,
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			let handle = formData.handle;
			if (!handle) {
				handle = formData.name
					.toLowerCase()
					.replace(/[^a-zа-я0-9\s]/g, "")
					.replace(/\s+/g, "-")
					.replace(/^-+|-+$/g, "");
			}

			const response = await fetch("/api/admin/categories", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formData.name,
					description: formData.description,
					handle: handle,
					icon: formData.icon,
					status: formData.status ? "active" : "inactive",
				}),
			});

			if (response.ok) {
				router.push("/admin/categories");
			} else {
				const error = await response.json();
				console.error("Error creating category:", error.error);
				alert("Ошибка при создании категории");
			}
		} catch (error) {
			console.error("Error creating category:", error);
			alert("Ошибка при создании категории");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => {
			const updated = { ...prev, [field]: value };
			// Auto-generate handle from name
			if (field === "name" && typeof value === "string" && !prev.handle) {
				updated.handle = value
					.toLowerCase()
					.replace(/[^a-zа-я0-9\s]/g, "")
					.replace(/\s+/g, "-")
					.replace(/^-+|-+$/g, "");
			}
			return updated;
		});
	};

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
						Новая категория
					</h2>
					<p className="text-muted-foreground">
						Создайте новую категорию товаров
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
									Заполните данные о новой категории
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
										{formData.handle || "url-kategorii"}
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
								disabled={loading}
							>
								<Save />
								{loading ? "Создание..." : "Создать категорию"}
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

"use client";

import type React from "react";

import { useState, useRef } from "react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";
import LabelInput from "@/components/ui/floating-input";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/modules/admin/components/editor"), {
	ssr: false,
});

export default function NewBlogPostPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		title: "",
		handle: "",
		excerpt: "",
		body: null as any,
		seoTitle: "",
		thumbnail: "",
		draft: true,
		type: "article",
		author: "Администратор",
	});
	const [loading, setLoading] = useState(false);
	const editorRef = useRef<any>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Save editor content
			let editorContent = formData.body;
			if (editorRef.current) {
				editorContent = await editorRef.current.save();
			}

			// Auto-generate handle from title if not provided
			let handle = formData.handle;
			if (!handle) {
				handle = formData.title
					.toLowerCase()
					.replace(/[^a-zа-я0-9\s]/g, "")
					.replace(/\s+/g, "-")
					.replace(/^-+|-+$/g, "");
			}

			const response = await fetch("/api/admin/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: formData.title,
					handle: handle,
					excerpt: formData.excerpt,
					body: editorContent,
					seoTitle: formData.seoTitle,
					thumbnail: formData.thumbnail,
					draft: formData.draft,
					type: formData.type,
					author: formData.author,
				}),
			});

			if (response.ok) {
				router.push("/admin/posts");
			} else {
				const error = await response.json();
				console.error("Error creating post:", error.error);
				alert("Ошибка при создании статьи");
			}
		} catch (error) {
			console.error("Error creating post:", error);
			alert("Ошибка при создании статьи");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (
		field: string,
		value: string | boolean | any,
	) => {
		setFormData((prev) => {
			const updated = { ...prev, [field]: value };
			// Auto-generate handle from title
			if (
				field === "title" &&
				typeof value === "string" &&
				!prev.handle
			) {
				updated.handle = value
					.toLowerCase()
					.replace(/[^a-zа-я0-9\s]/g, "")
					.replace(/\s+/g, "-")
					.replace(/^-+|-+$/g, "");
			}
			return updated;
		});
	};

	const handlePublish = () => {
		setFormData((prev) => ({
			...prev,
			draft: false,
		}));
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col items-start space-x-4">
				<Link
					href="/admin/posts"
					className={buttonVariants({
						variant: "ghost",
						size: "sm",
						className: "mb-2",
					})}
				>
					<ArrowLeft />
					Назад к блогу
				</Link>
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Новая статья
					</h2>
					<p className="text-muted-foreground">
						Создайте новую публикацию для блога
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2 space-y-6">
						<Card className="bg-transparent border-border-variant">
							<CardHeader>
								<CardTitle>Основное содержание</CardTitle>
								<CardDescription>
									Заполните основную информацию о статье
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<LabelInput
										id="title"
										label="Заголовок статьи"
										value={formData.title}
										onChange={(e) =>
											handleInputChange(
												"title",
												e.target.value,
											)
										}
										placeholder="Введите заголовок статьи"
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
										placeholder="url-stati"
										required
									/>
									<p className="text-sm text-muted-foreground">
										Будет использоваться в URL: /blog/
										{formData.handle || "url-stati"}
									</p>
								</div>

								<div className="space-y-2">
									<LabelInput
										id="excerpt"
										label="Краткое описание"
										value={formData.excerpt}
										onChange={(e) =>
											handleInputChange(
												"excerpt",
												e.target.value,
											)
										}
										placeholder="Краткое описание статьи для превью"
										rows={3}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="body">
										Содержание статьи
									</Label>
									<div className="border rounded-md p-2 min-h-[300px]">
										<Editor
											data={formData.body}
											onChange={(data) =>
												handleInputChange("body", data)
											}
											holder="editorjs"
										/>
										<div id="editorjs" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-transparent border-border-variant">
							<CardHeader>
								<CardTitle>Изображение статьи</CardTitle>
								<CardDescription>
									Добавьте главное изображение для статьи
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
									<Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
									<div className="mt-4">
										<LabelInput
											id="thumbnail"
											label="URL изображения"
											value={formData.thumbnail}
											onChange={(e) =>
												handleInputChange(
													"thumbnail",
													e.target.value,
												)
											}
										/>
										<p className="mt-2 text-sm text-muted-foreground">
											Введите URL изображения
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-transparent border-border-variant">
							<CardHeader>
								<CardTitle>SEO настройки</CardTitle>
								<CardDescription>
									Оптимизация для поисковых систем
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<LabelInput
										id="seoTitle"
										label="SEO Заголовок"
										value={formData.seoTitle}
										onChange={(e) =>
											handleInputChange(
												"seoTitle",
												e.target.value,
											)
										}
										placeholder="Заголовок для поисковых систем"
									/>
									<p className="text-sm text-muted-foreground">
										Рекомендуется 50-60 символов
									</p>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card className="bg-transparent border-border-variant">
							<CardHeader>
								<CardTitle>Публикация</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="type">Тип</Label>
									<Select
										value={formData.type}
										onValueChange={(value) =>
											handleInputChange("type", value)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="article">
												Статья
											</SelectItem>
											<SelectItem value="info">
												Информация
											</SelectItem>
											<SelectItem value="document">
												Документ
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<LabelInput
										id="author"
										label="Автор"
										value={formData.author}
										onChange={(e) =>
											handleInputChange(
												"author",
												e.target.value,
											)
										}
										placeholder="Автор статьи"
									/>
								</div>

								<Label className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Черновик</Label>
										<p className="text-sm text-muted-foreground">
											Статья не будет опубликована
										</p>
									</div>
									<Switch
										value={"draft"}
										checked={!formData.draft}
										onCheckedChange={(checked) =>
											handleInputChange("draft", !checked)
										}
									/>
								</Label>
							</CardContent>
						</Card>

						<Card className="bg-transparent border-border-variant">
							<CardHeader>
								<CardTitle>Предварительный просмотр</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<h3 className="font-medium text-sm">
										{formData.title || "Заголовок статьи"}
									</h3>
									<p className="text-xs text-muted-foreground">
										{formData.excerpt ||
											"Краткое описание статьи..."}
									</p>
								</div>
							</CardContent>
						</Card>

						<div className="flex flex-col space-y-2 mt-6">
							<Button
								type="button"
								onClick={handlePublish}
								className="w-full"
								disabled={!formData.draft}
							>
								<Save />
								Опубликовать
							</Button>
							<Button
								type="submit"
								variant="outline"
								className="w-full bg-transparent"
								disabled={loading}
							>
								<Save />
								{loading ? "Создание..." : "Сохранить черновик"}
							</Button>
							<Link
								href="/admin/posts"
								className={buttonVariants({
									variant: "destructive",
									className: "w-full",
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

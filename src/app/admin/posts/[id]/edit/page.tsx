"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
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
import Editor from "@/components/admin/editor";

export default function EditBlogPostPage() {
	const router = useRouter();
	const params = useParams();
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
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const editorRef = useRef<any>(null);

	const handle = params.id as string;

	// Fetch post data
	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await fetch(`/api/admin/posts/${handle}`);
				const data = await response.json();

				if (response.ok) {
					setFormData({
						title: data.post.title,
						handle: data.post.handle,
						excerpt: data.post.excerpt || "",
						body: data.post.body || null,
						seoTitle: data.post.seoTitle || "",
						thumbnail: data.post.thumbnail || "",
						draft: data.post.draft,
						type: data.post.type,
						author: data.post.author || "Администратор",
					});
				} else {
					console.error("Error fetching post:", data.error);
				}
			} catch (error) {
				console.error("Error fetching post:", error);
			} finally {
				setLoading(false);
			}
		};

		if (handle) {
			fetchPost();
		}
	}, [handle]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			// Save editor content
			let editorContent = formData.body;
			if (editorRef.current) {
				editorContent = await editorRef.current.save();
			}

			const response = await fetch(`/api/admin/posts/${handle}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: formData.title,
					handle: formData.handle,
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
				console.error("Error updating post:", error.error);
				alert("Ошибка при обновлении статьи");
			}
		} catch (error) {
			console.error("Error updating post:", error);
			alert("Ошибка при обновлении статьи");
		} finally {
			setSaving(false);
		}
	};

	const handleInputChange = (
		field: string,
		value: string | boolean | any,
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handlePublish = () => {
		setFormData((prev) => ({
			...prev,
			draft: false,
		}));
	};

	if (loading) {
		return <div className="p-6">Загрузка статьи...</div>;
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center space-x-4">
				<Link
					href="/admin/posts"
					className={buttonVariants({ variant: "ghost", size: "sm" })}
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Назад к блогу
				</Link>
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Редактировать статью
					</h2>
					<p className="text-muted-foreground">
						Изменение содержания публикации
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2 space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Основное содержание</CardTitle>
								<CardDescription>
									Обновите информацию о статье
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
										{formData.handle}
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
											holder="editorjs-edit"
										/>
										<div id="editorjs-edit" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Изображение статьи</CardTitle>
								<CardDescription>
									Управление главным изображением
								</CardDescription>
							</CardHeader>
							<CardContent>
								{formData.thumbnail && (
									<div className="mb-4">
										<img
											src={
												formData.thumbnail ||
												"/placeholder.svg"
											}
											alt="Post thumbnail"
											className="w-full h-48 object-cover rounded-lg border"
										/>
									</div>
								)}

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

						<Card>
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
						<Card>
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

								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Черновик</Label>
										<p className="text-sm text-muted-foreground">
											Статья не будет опубликована
										</p>
									</div>
									<Switch
										checked={!formData.draft}
										onCheckedChange={(checked) =>
											handleInputChange("draft", !checked)
										}
									/>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="flex flex-col space-y-2">
									<Button
										type="button"
										onClick={handlePublish}
										className="w-full"
										disabled={!formData.draft}
									>
										<Save className="mr-2 h-4 w-4" />
										Опубликовать
									</Button>
									<Button
										type="submit"
										variant="outline"
										className="w-full bg-transparent"
										disabled={saving}
									>
										<Save className="mr-2 h-4 w-4" />
										{saving
											? "Сохранение..."
											: "Сохранить изменения"}
									</Button>
									<Link
										href="/admin/posts"
										className={buttonVariants({
											variant: "ghost",
											className: "w-full",
										})}
									>
										Отмена
									</Link>
								</div>
							</CardContent>
						</Card>

						<Card>
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
					</div>
				</div>
			</form>
		</div>
	);
}

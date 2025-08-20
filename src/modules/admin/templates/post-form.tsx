"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
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
	FormDescription,
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
import { SlugHandler } from "../components/slug-handler";
import { postFormSchema, PostFormValues } from "../schemas/post-form-schema";
import { getPostByHandle, createPost, updatePost } from "@/lib/data/blog";

const Editor = dynamic(() => import("@/modules/admin/components/editor"), {
	ssr: false,
});

export default function PostForm({ postHandle }: { postHandle?: string }) {
	const router = useRouter();
	const [loading, setLoading] = useState(!!postHandle);
	const [saving, setSaving] = useState(false);
	const editorRef = useRef<any>(null);

	const form = useForm<PostFormValues>({
		resolver: zodResolver(postFormSchema),
		defaultValues: {
			title: "",
			handle: "",
			excerpt: "",
			body: null,
			seoTitle: "",
			thumbnail: "",
			draft: true,
			type: "article",
			author: "Администратор",
		},
		mode: "onChange",
	});

	// Initialize slug handler
	const { handleFieldChange: handleTitleChange } = SlugHandler({
		form,
		fieldName: "title",
		slugFieldName: "handle",
	});

	// Fetch post data for edit mode
	useEffect(() => {
		const fetchPost = async () => {
			if (!postHandle) return;

			try {
				const postData = await getPostByHandle(postHandle);

				if (postData) {
					form.reset({
						title: postData.title,
						handle: postData.handle,
						excerpt: postData.excerpt || "",
						body: postData.body || null,
						seoTitle: postData.seoTitle || "",
						thumbnail: postData.thumbnail || "",
						draft: postData.draft,
						type: postData.type,
						author: postData.author || "Администратор",
					});
				} else {
					console.error("Post not found");
				}
			} catch (error) {
				console.error("Error fetching post:", error);
			} finally {
				setLoading(false);
			}
		};

		if (postHandle) {
			fetchPost();
		}
	}, [postHandle, form]);

	const onSubmit = async (values: PostFormValues) => {
		setSaving(true);

		try {
			// Save editor content
			let editorContent = values.body;
			if (editorRef.current) {
				editorContent = await editorRef.current.save();
			}

			const postData = {
				...values,
				body: editorContent,
			};

			let result;
			if (postHandle) {
				// Update existing post using server action
				result = await updatePost(postHandle, postData);
			} else {
				// Create new post using server action
				result = await createPost(postData);
			}

			if (result) {
				router.push("/admin/posts");
			} else {
				alert(
					postHandle
						? "Ошибка при обновлении статьи"
						: "Ошибка при создании статьи",
				);
			}
		} catch (error) {
			console.error("Error saving post:", error);
			alert(
				postHandle
					? "Ошибка при обновлении статьи"
					: "Ошибка при создании статьи",
			);
		} finally {
			setSaving(false);
		}
	};

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		handleTitleChange(value);
		form.setValue("title", value);
	};

	const handlePublish = () => {
		form.setValue("draft", false);
	};

	if (loading) {
		return <div className="p-6">Загрузка статьи...</div>;
	}

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
						{postHandle ? "Редактировать статью" : "Новая статья"}
					</h2>
					<p className="text-muted-foreground">
						{postHandle
							? "Изменение содержания публикации"
							: "Создайте новую публикацию для блога"}
					</p>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="grid gap-6 lg:grid-cols-3">
						<div className="lg:col-span-2 space-y-6">
							<Card className="bg-transparent border-border-variant">
								<CardHeader>
									<CardTitle>Основное содержание</CardTitle>
									<CardDescription>
										{postHandle
											? "Обновите информацию о статье"
											: "Заполните основную информацию о статье"}
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="title"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Заголовок статьи
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="Введите заголовок статьи"
														onChange={onTitleChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="handle"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													URL (handle)
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="url-stati"
													/>
												</FormControl>
												<FormDescription>
													Будет использоваться в URL:
													/blog/
													{form.watch("handle") ||
														"url-stati"}
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="excerpt"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Краткое описание
												</FormLabel>
												<FormControl>
													<Textarea
														{...field}
														placeholder="Краткое описание статьи для превью"
														rows={3}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="body"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Содержание статьи
												</FormLabel>
												<FormControl>
													<div className="border rounded-md p-2 min-h-[300px]">
														<Editor
															data={field.value}
															onChange={
																field.onChange
															}
															holder={
																postHandle
																	? "editorjs-edit"
																	: "editorjs"
															}
														/>
														<div
															id={
																postHandle
																	? "editorjs-edit"
																	: "editorjs"
															}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							<Card className="bg-transparent border-border-variant">
								<CardHeader>
									<CardTitle>Изображение статьи</CardTitle>
									<CardDescription>
										{postHandle
											? "Управление главным изображением"
											: "Добавьте главное изображение для статьи"}
									</CardDescription>
								</CardHeader>
								<CardContent>
									{postHandle && form.watch("thumbnail") && (
										<div className="mb-4">
											<img
												src={
													form.watch("thumbnail") ||
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
											<FormField
												control={form.control}
												name="thumbnail"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															URL изображения
														</FormLabel>
														<FormControl>
															<Input
																{...field}
																placeholder="https://example.com/image.jpg"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<p className="mt-2 text-sm text-muted-foreground">
											Введите URL изображения
										</p>
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
									<FormField
										control={form.control}
										name="seoTitle"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													SEO Заголовок
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="Заголовок для поисковых систем"
													/>
												</FormControl>
												<FormDescription>
													Рекомендуется 50-60 символов
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</div>

						<div className="space-y-6">
							<Card className="bg-transparent border-border-variant">
								<CardHeader>
									<CardTitle>Публикация</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="type"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Тип</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
													</FormControl>
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
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="author"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Автор</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="Автор статьи"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							<Card className="bg-transparent border-border-variant">
								<CardHeader>
									<CardTitle>
										Предварительный просмотр
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<h3 className="font-medium text-sm">
											{form.watch("title") ||
												"Заголовок статьи"}
										</h3>
										<p className="text-xs text-muted-foreground">
											{form.watch("excerpt") ||
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
									disabled={!form.watch("draft")}
								>
									<Save />
									Опубликовать
								</Button>
								<Button
									type="submit"
									variant="outline"
									className="w-full bg-transparent"
									disabled={saving}
								>
									<Save />
									{saving
										? postHandle
											? "Сохранение..."
											: "Создание..."
										: postHandle
											? "Сохранить изменения"
											: "Сохранить черновик"}
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
			</Form>
		</div>
	);
}

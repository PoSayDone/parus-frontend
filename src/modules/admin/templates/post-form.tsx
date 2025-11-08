"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { createPost, getPostByHandle, updatePost } from "@/lib/data/blog";
import { uploadFile } from "@/lib/data/uploads";
import { SlugHandler } from "../components/slug-handler";
import {
	type PostFormValues,
	postFormSchema,
} from "../schemas/post-form-schema";
import { AdminFormLayout } from "./admin-form-layout";

const Editor = dynamic(() => import("@/modules/admin/components/editor"), {
	ssr: false,
});

export default function PostForm({ postHandle }: { postHandle?: string }) {
	const router = useRouter();
	const [loading, setLoading] = useState(!!postHandle);
	const [uploading, setUploading] = useState(false);
	const [image, setImage] = useState<string | null>(null);
	const editorRef = useRef<any>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const form = useForm<PostFormValues>({
		resolver: zodResolver(postFormSchema),
		defaultValues: {
			title: "",
			handle: "",
			description: "",
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
						description: postData.description || "",
						body: postData.body || null,
						seoTitle: postData.seoTitle || "",
						thumbnail: postData.thumbnail || "",
						draft: postData.draft,
						type: postData.type,
						author: postData.author || "Администратор",
					});

					if (postData.thumbnail) {
						setImage(postData.thumbnail);
					}
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
		try {
			let editorContent = values.body;
			if (editorRef.current) {
				editorContent = await editorRef.current.save();
			}

			const postData = {
				...values,
				body: editorContent,
				thumbnail: image || "", // Use the image state for thumbnail
			};

			let result;
			if (postHandle) {
				result = await updatePost(postHandle, postData);
			} else {
				result = await createPost(postData);
			}

			if (result) {
				router.push("/admin/posts");
			} else {
				toast.error(
					postHandle
						? "Ошибка при обновлении статьи"
						: "Ошибка при создании статьи",
				);
			}
		} catch (error) {
			console.error("Error saving post:", error);
			toast.error(
				postHandle
					? "Ошибка при обновлении статьи"
					: "Ошибка при создании статьи",
			);
		}
	};

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		handleTitleChange(value);
		form.setValue("title", value);
	};

	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		setUploading(true);
		try {
			const file = files[0];
			const url = await uploadFile(file);

			setImage(url);
			form.setValue("thumbnail", url);
		} catch (error) {
			console.error("Error uploading image:", error);
			toast.error("Ошибка при загрузке изображения");
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

	const removeImage = () => {
		setImage(null);
		form.setValue("thumbnail", "");
	};

	if (loading) {
		return <div className="p-6">Загрузка статьи...</div>;
	}

	const mainContent = (
		<>
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
								<FormLabel>Заголовок статьи</FormLabel>
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
								<FormLabel>URL (handle)</FormLabel>
								<FormControl>
									<Input {...field} placeholder="url-stati" />
								</FormControl>
								<FormDescription>
									Будет использоваться в URL: /blog/
									{form.watch("handle") || "url-stati"}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Краткое описание</FormLabel>
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
								<FormLabel>Содержание статьи</FormLabel>
								<FormControl>
									<div>
										<Editor
											data={field.value}
											onChange={field.onChange}
											holder={
												postHandle
													? "editorjs-edit"
													: "editorjs"
											}
											className="border rounded-md p-2 min-h-[300px]"
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
					{image && (
						<div className="mb-4 relative group">
							<img
								src={image}
								alt="Post thumbnail"
								className="w-full h-48 object-cover rounded-lg border"
							/>
							<Button
								type="button"
								size="icon"
								variant="destructive"
								className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={removeImage}
								title="Удалить"
							>
								<X className="h-3 w-3" />
							</Button>
						</div>
					)}

					<div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
						<Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
						<div className="mt-4">
							<Input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								disabled={uploading || !!image} // Disable if image exists
								className="hidden"
								id="image-upload"
							/>
							<Button
								type="button"
								variant="outline"
								onClick={triggerFileInput}
								disabled={uploading || !!image} // Disable if image exists
							>
								{uploading
									? "Загрузка..."
									: image
										? "Изображение загружено"
										: "Загрузить изображение"}
							</Button>
						</div>
						<p className="mt-2 text-sm text-muted-foreground">
							Выберите изображение для статьи
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
								<FormLabel>SEO Заголовок</FormLabel>
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
		</>
	);

	const sidebarContent = (
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
								onValueChange={field.onChange}
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
								<Input {...field} placeholder="Автор статьи" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="draft"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center space-x-3 space-y-0">
							<div className="space-y-1 leading-none w-full">
								<FormLabel>Черновик</FormLabel>
								<FormDescription>
									Если отмечено, статья будет видна только
									администраторам
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
		<AdminFormLayout<PostFormValues>
			onSubmit={onSubmit}
			title={postHandle ? "Редактировать статью" : "Новая статья"}
			description={
				postHandle
					? "Изменение содержания публикации"
					: "Создайте новую публикацию для блога"
			}
			backHref="/admin/posts"
			backLabel="Назад к блогу"
			form={form}
			sidebar={sidebarContent}
			submitLabel={postHandle ? "Сохранить" : "Создать"}
			cancelHref="/admin/posts"
		>
			{mainContent}
		</AdminFormLayout>
	);
}

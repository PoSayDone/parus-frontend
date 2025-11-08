"use client";

import { Calendar, Plus, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { deletePost, listPosts } from "@/lib/data/blog";
import { AdminTable } from "@/modules/admin/components/admin-table";
import { PostTypeBadge } from "@/modules/admin/components/post-type-badge";
import { StatCard } from "@/modules/admin/components/stat-card";
import { StatusBadge } from "@/modules/admin/components/status-badge";
import type { BlogPost } from "@/types/admin";

export default function BlogPage() {
	const formatDate = (dateString: string | null) => {
		if (!dateString) return "—";
		return new Date(dateString).toLocaleDateString("ru-RU");
	};

	const handleDelete = async (handle: string) => {
		try {
			await deletePost(handle);
			toast.success("Статья успешно удалена");
		} catch (error: any) {
			console.error("Error deleting post:", error);
			toast.error(error.message || "Ошибка при удалении статьи");
			throw error;
		}
	};

	const columns = [
		{
			key: "title",
			label: "Статья",
			render: (value: string, row: BlogPost) => (
				<div className="flex items-center space-x-3">
					<img
						src={row.thumbnail || "/placeholder.svg"}
						alt={row.title}
						className="h-10 w-10 rounded-md object-cover"
					/>
					<div className="max-w-xs">
						<div className="font-medium">{row.title}</div>
						<div className="text-sm text-muted-foreground truncate">
							{row.description}
						</div>
					</div>
				</div>
			),
		},
		{
			key: "author",
			label: "Автор",
			render: (value: string | null) => (
				<div className="flex items-center space-x-1">
					<User className="h-3 w-3 text-muted-foreground" />
					<span className="text-sm">{value || "Администратор"}</span>
				</div>
			),
		},
		{
			key: "type",
			label: "Тип",
			render: (value: "article" | "info" | "document") => (
				<PostTypeBadge type={value} />
			),
		},
		{
			key: "draft",
			label: "Статус",
			render: (value: boolean) => (
				<StatusBadge
					status={value ? "draft" : "published"}
					label={value ? "Черновик" : "Опубликован"}
				/>
			),
		},
		{
			key: "createdAt",
			label: "Дата публикации",
			render: (value: string | null) => (
				<div className="flex items-center space-x-1">
					<Calendar className="h-3 w-3 text-muted-foreground" />
					<span className="text-sm">{formatDate(value)}</span>
				</div>
			),
		},
		{
			key: "views",
			label: "Просмотры",
		},
	];

	const actions = [
		{
			type: "view" as const,
			label: "Просмотр",
			href: "/blog/post/{key}",
		},
		{
			type: "edit" as const,
			label: "Редактировать",
			href: "/admin/posts/{key}/edit",
		},
		{ type: "delete" as const, label: "Удалить", onClick: handleDelete },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Блог
					</h2>
					<p className="text-muted-foreground">
						Управляйте статьями и публикациями
					</p>
				</div>
				<Link
					href="/admin/posts/new"
					className={buttonVariants({ variant: "default" })}
				>
					<Plus />
					Написать статью
				</Link>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard title="Всего статей" value="0" />
				<StatCard title="Опубликовано" value="0" />
				<StatCard title="Черновики" value="0" />
				<StatCard title="Всего просмотров" value="0" />
			</div>

			<AdminTable
				columns={columns}
				data={[]}
				actions={actions}
				getKey={(row) => row.handle}
				fetchDataAction={listPosts}
				initialPage={1}
				initialLimit={10}
			/>
		</div>
	);
}

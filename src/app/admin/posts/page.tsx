"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BlogPost } from "@/types/admin";
import { AdminTable } from "@/modules/admin/components/admin-table";
import { SearchInput } from "@/modules/admin/components/search-input";
import { StatusBadge } from "@/modules/admin/components/status-badge";
import { StatCard } from "@/modules/admin/components/stat-card";
import { Plus, Calendar, User } from "lucide-react";

export default function BlogPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);

	// Fetch posts from API
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/admin/posts");
				const data = await response.json();
				if (response.ok) {
					setPosts(data.posts);
				}
			} catch (error) {
				console.error("Error fetching posts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	const filteredPosts = posts.filter(
		(post) =>
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const formatDate = (dateString: string | null) => {
		if (!dateString) return "—";
		return new Date(dateString).toLocaleDateString("ru-RU");
	};

	const handleDelete = async (handle: string) => {
		if (!confirm("Вы уверены, что хотите удалить эту статью?")) return;

		try {
			const response = await fetch(`/api/admin/posts/${handle}`, {
				method: "DELETE",
			});

			if (response.ok) {
				// Remove the post from the state
				setPosts(posts.filter((post) => post.handle !== handle));
			} else {
				const error = await response.json();
				console.error("Error deleting post:", error.error);
				alert("Ошибка при удалении статьи");
			}
		} catch (error) {
			console.error("Error deleting post:", error);
			alert("Ошибка при удалении статьи");
		}
	};

	if (loading) {
		return <div className="p-6">Загрузка статей...</div>;
	}

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
							{row.excerpt}
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
			key: "publishedAt",
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
			href: "/admin/posts/{key}",
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
				<StatCard title="Всего статей" value={posts.length} />
				<StatCard
					title="Опубликовано"
					value={posts.filter((p) => !p.draft).length}
				/>
				<StatCard
					title="Черновики"
					value={posts.filter((p) => p.draft).length}
				/>
				<StatCard
					title="Всего просмотров"
					value={posts.reduce((sum, post) => sum + post.views, 0)}
				/>
			</div>

			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Статьи блога</CardTitle>
					<CardDescription>
						Управление публикациями и контентом
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center space-x-2 mb-4">
						<SearchInput
							value={searchTerm}
							onChange={setSearchTerm}
							placeholder="Поиск статей..."
						/>
					</div>

					<AdminTable
						columns={columns}
						data={filteredPosts}
						actions={actions}
						getKey={(row) => row.handle}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Package, FolderOpen, FileText, Plus } from "lucide-react";
import { useAdminStats } from "@/lib/hooks/use-admin-data";
import { StatCard } from "@/modules/admin/components/stat-card";

export default function AdminDashboard() {
	const stats = useAdminStats();

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-medium tracking-tight">
					Панель управления
				</h2>
				<p className="text-muted-foreground">
					Управляйте продуктами, категориями и блог-постами
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<StatCard
					title="Продукты"
					value={stats.totalProducts}
					description="Всего продуктов в каталоге"
					className="bg-card"
				>
					<Package className="h-4 w-4 text-muted-foreground" />
				</StatCard>

				<StatCard
					title="Категории"
					value={stats.totalCategories}
					description="Активных категорий"
					className="bg-card"
				>
					<FolderOpen className="h-4 w-4 text-muted-foreground" />
				</StatCard>

				<StatCard
					title="Блог-посты"
					value={stats.totalBlogPosts}
					description="Опубликованных статей"
					className="bg-card"
				>
					<FileText className="h-4 w-4 text-muted-foreground" />
				</StatCard>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Опубликовано"
					value={stats.publishedPosts}
					description="Статей в блоге"
				/>
				<StatCard
					title="Черновики"
					value={stats.draftPosts}
					description="Неопубликованных"
				/>
				<StatCard
					title="Просмотры"
					value={stats.totalViews}
					description="Всего по блогу"
				/>
				<StatCard
					title="Средние просмотры"
					value={
						stats.publishedPosts > 0
							? Math.round(
									stats.totalViews / stats.publishedPosts,
								)
							: 0
					}
					description="На статью"
				/>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Быстрые действия</CardTitle>
					<CardDescription>
						Часто используемые функции для управления контентом
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-row flex-wrap gap-2">
					<Link
						href="/admin/products/new"
						className={buttonVariants({})}
					>
						<Plus />
						Добавить продукт
					</Link>
					<Link
						href="/admin/categories/new"
						className={buttonVariants({})}
					>
						<Plus />
						Создать категорию
					</Link>
					<Link
						href="/admin/posts/new"
						className={buttonVariants({})}
					>
						<Plus />
						Написать пост
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}

"use client";

import { FileText, FolderOpen, Package, Plus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/modules/admin/components/stat-card";

interface AdminStatsClientProps {
	initialStats: {
		totalProducts: number;
		totalCategories: number;
		totalBlogPosts: number;
		publishedPosts: number;
		draftPosts: number;
		totalViews: number;
		totalAddresses: number;
		totalServices: number;
		totalPricePlans: number;
	};
}

export function AdminStatsClient({ initialStats }: AdminStatsClientProps) {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-medium tracking-tight">
					Панель управления
				</h2>
				<p className="text-muted-foreground">
					Управляйте продуктами, категориями, адресами, услугами,
					планами цен и блог-постами
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<StatCard
					title="Продукты"
					value={initialStats.totalProducts}
					description="Всего продуктов в каталоге"
					className="bg-card"
				>
					<Package className="h-4 w-4 text-muted-foreground" />
				</StatCard>

				<StatCard
					title="Категории"
					value={initialStats.totalCategories}
					description="Активных категорий"
					className="bg-card"
				>
					<FolderOpen className="h-4 w-4 text-muted-foreground" />
				</StatCard>

				<StatCard
					title="Блог-посты"
					value={initialStats.totalBlogPosts}
					description="Опубликованных статей"
					className="bg-card"
				>
					<FileText className="h-4 w-4 text-muted-foreground" />
				</StatCard>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<StatCard
					title="Адреса"
					value={initialStats.totalAddresses}
					description="Всего адресов"
					className="bg-card"
				>
					<FolderOpen className="h-4 w-4 text-muted-foreground" />
				</StatCard>

				<StatCard
					title="Услуги"
					value={initialStats.totalServices}
					description="Всего услуг"
					className="bg-card"
				>
					<FolderOpen className="h-4 w-4 text-muted-foreground" />
				</StatCard>

				<StatCard
					title="Планы цен"
					value={initialStats.totalPricePlans}
					description="Всего ценовых планов"
					className="bg-card"
				>
					<FolderOpen className="h-4 w-4 text-muted-foreground" />
				</StatCard>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Опубликовано"
					value={initialStats.publishedPosts}
					description="Статей в блоге"
				/>
				<StatCard
					title="Черновики"
					value={initialStats.draftPosts}
					description="Неопубликованных"
				/>
				<StatCard
					title="Просмотры"
					value={initialStats.totalViews}
					description="Всего по блогу"
				/>
				<StatCard
					title="Средние просмотры"
					value={
						initialStats.publishedPosts > 0
							? Math.round(
									initialStats.totalViews /
										initialStats.publishedPosts,
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
					<Link
						href="/admin/addresses/new"
						className={buttonVariants({})}
					>
						<Plus />
						Добавить адрес
					</Link>
					<Link
						href="/admin/services/new"
						className={buttonVariants({})}
					>
						<Plus />
						Добавить услугу
					</Link>
					<Link
						href="/admin/pricing/new"
						className={buttonVariants({})}
					>
						<Plus />
						Добавить план цен
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}

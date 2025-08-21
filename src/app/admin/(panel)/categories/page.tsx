"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Category } from "@/types/admin";
import { AdminTable } from "@/modules/admin/components/admin-table";
import { StatusBadge } from "@/modules/admin/components/status-badge";
import { Plus } from "lucide-react";
import { listCategories } from "@/lib/data/categories";
import { deleteCategory } from "@/lib/data/categories";
import { toast } from "sonner";

export default function CategoriesPage() {
	const handleDelete = async (handle: string) => {
		if (!confirm("Вы уверены, что хотите удалить эту категорию?")) return;

		try {
			await deleteCategory(handle);
			toast.success("Категория успешно удалена");
		} catch (error: any) {
			console.error("Error deleting category:", error);
			toast.error(error.message || "Ошибка при удалении категории");
		}
	};

	const columns = [
		{
			key: "name",
			label: "Категория",
			render: (value: string, row: Category) => (
				<div className="flex items-center space-x-3">
					<div>
						<div className="font-medium">{row.name}</div>
						<div className="text-sm text-muted-foreground">
							/{row.handle}
						</div>
					</div>
				</div>
			),
		},
		{
			key: "description",
			label: "Описание",
			render: (value: string | null) => (
				<div className="max-w-xs">
					<p className="text-sm text-muted-foreground truncate">
						{value || "Нет описания"}
					</p>
				</div>
			),
		},
		{
			key: "productCount",
			label: "Товаров",
			render: (value: number) => `${value} товаров`,
		},
		{
			key: "status",
			label: "Статус",
			render: (value: Category["status"]) => (
				<StatusBadge
					status={value === "active" ? "active" : "inactive"}
					label={value === "active" ? "Активна" : "Неактивна"}
				/>
			),
		},
	];

	const actions = [
		{
			type: "view" as const,
			label: "Просмотр",
			href: "/categories/{key}",
		},
		{
			type: "edit" as const,
			label: "Редактировать",
			href: "/admin/categories/{key}/edit",
		},
		{ type: "delete" as const, label: "Удалить", onClick: handleDelete },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Категории
					</h2>
					<p className="text-muted-foreground">
						Управляйте категориями товаров и услуг
					</p>
				</div>
				<Link
					href="/admin/categories/new"
					className={buttonVariants({ variant: "default" })}
				>
					<Plus />
					Добавить категорию
				</Link>
			</div>

			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Список категорий</CardTitle>
					<CardDescription>
						Управление категориями товаров
					</CardDescription>
				</CardHeader>
				<CardContent>
					<AdminTable
						columns={columns}
						data={[]}
						actions={actions}
						getKey={(row) => row.handle}
						fetchDataAction={listCategories}
						initialPage={1}
						initialLimit={10}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

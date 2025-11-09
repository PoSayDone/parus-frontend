"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { deleteCategory, listCategories } from "@/lib/data/categories";
import { AdminTable } from "@/modules/admin/components/admin-table";
import { StatusBadge } from "@/modules/admin/components/status-badge";
import type { Category } from "@/types/admin";

export default function CategoriesPage() {
	const handleDelete = async (handle: string) => {
		try {
			await deleteCategory(handle);
			toast.success("Категория успешно удалена");
		} catch (error: any) {
			console.error("Error deleting category:", error);
			toast.error(error.message || "Ошибка при удалении категории");
			throw error;
		}
	};

	const columns = [
		{
			key: "name",
			label: "Категория",
			render: (value: string, row: Category) => (
				<div className="flex items-center space-x-3">
					<div>
						<div className="font-medium">{value}</div>
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

			<AdminTable
				columns={columns}
				data={[]}
				actions={actions}
				getKey={(row) => row.handle}
				fetchDataAction={listCategories}
				initialPage={1}
				initialLimit={10}
			/>
		</div>
	);
}

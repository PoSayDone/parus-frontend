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
import { Category } from "@/types/admin";
import { AdminTable } from "@/modules/admin/components/admin-table";
import { SearchInput } from "@/modules/admin/components/search-input";
import { StatusBadge } from "@/modules/admin/components/status-badge";
import { Plus, Package, Folder, FolderOpenIcon } from "lucide-react";

export default function CategoriesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/admin/categories");
				const data = await response.json();
				if (response.ok) {
					const transformedCategories = data.categories.map(
						(category: Category) => ({
							id: category.id,
							name: category.name,
							handle: category.handle,
							description: category.description,
							status:
								category.active !== undefined
									? category.active
										? "active"
										: "inactive"
									: "active",
							productCount: category.products?.length || 0,
							createdAt: category.createdAt,
							updatedAt: category.updatedAt,
						}),
					);
					setCategories(transformedCategories);
				}
			} catch (error) {
				console.error("Error fetching categories:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const filteredCategories = categories.filter(
		(category) =>
			category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			category.description
				?.toLowerCase()
				.includes(searchTerm.toLowerCase()),
	);

	const handleDelete = async (handle: string) => {
		if (!confirm("Вы уверены, что хотите удалить эту категорию?")) return;

		try {
			const response = await fetch(`/api/admin/categories/${handle}`, {
				method: "DELETE",
			});

			if (response.ok) {
				setCategories(
					categories.filter((category) => category.handle !== handle),
				);
			} else {
				const error = await response.json();
				console.error("Error deleting category:", error.error);
				alert("Ошибка при удалении категории");
			}
		} catch (error) {
			console.error("Error deleting category:", error);
			alert("Ошибка при удалении категории");
		}
	};

	if (loading) {
		return <div className="p-6">Загрузка категорий...</div>;
	}

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
						Всего категорий: {categories.length}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center space-x-2 mb-4">
						<SearchInput
							value={searchTerm}
							onChange={setSearchTerm}
							placeholder="Поиск категорий..."
						/>
					</div>

					<AdminTable
						columns={columns}
						data={filteredCategories}
						actions={actions}
						getKey={(row) => row.handle}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

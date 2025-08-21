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
import { Product } from "@/types/admin";
import { AdminTable } from "@/modules/admin/components/admin-table";
import { StatusBadge } from "@/modules/admin/components/status-badge";
import { Plus } from "lucide-react";
import { listProducts } from "@/lib/data/products";
import { deleteProduct } from "@/lib/data/products";
import { toast } from "sonner";

export default function ProductsPage() {
	const handleDelete = async (handle: string) => {
		try {
			await deleteProduct(handle);
			toast.success("Продукт успешно удален");
		} catch (error: any) {
			console.error("Error deleting product:", error);
			toast.error(error.message || "Ошибка при удалении продукта");
			throw error; // Re-throw to be caught by the AdminTable
		}
	};

	const columns = [
		{
			key: "title",
			label: "Продукт",
			render: (value: string, row: Product) => (
				<div className="flex items-center space-x-3">
					<img
						src={row.thumbnail || "/placeholder.svg"}
						alt={row.title}
						className="h-10 w-10 rounded-md object-cover"
					/>
					<div>
						<div className="font-medium">{row.title}</div>
					</div>
				</div>
			),
		},
		{
			key: "categories",
			label: "Категория",
			render: (value: Product["categories"]) =>
				value.map((category) => category.name).join(", "),
		},
		{
			key: "price",
			label: "Цена",
			render: (value: number) => `${value.toLocaleString()} ₽`,
		},
		{
			key: "active",
			label: "Статус",
			render: (value: Product["active"]) => (
				<StatusBadge
					status={value ? "published" : "draft"}
					label={value ? "Опубликован" : "Черновик"}
				/>
			),
		},
	];

	const actions = [
		{
			type: "view" as const,
			label: "Просмотр",
			href: "/products/{key}",
		},
		{
			type: "edit" as const,
			label: "Редактировать",
			href: "/admin/products/{key}/edit",
		},
		{ type: "delete" as const, label: "Удалить", onClick: handleDelete },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Продукты
					</h2>
					<p className="text-muted-foreground">
						Управляйте каталогом товаров и услуг
					</p>
				</div>
				<Link
					href="/admin/products/new"
					className={buttonVariants({ variant: "default" })}
				>
					<Plus />
					Добавить продукт
				</Link>
			</div>

			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Каталог продуктов</CardTitle>
					<CardDescription>
						Управление продуктами в каталоге
					</CardDescription>
				</CardHeader>
				<CardContent>
					<AdminTable
						columns={columns}
						data={[]}
						actions={actions}
						getKey={(row) => row.handle}
						fetchDataAction={listProducts}
						initialPage={1}
						initialLimit={10}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

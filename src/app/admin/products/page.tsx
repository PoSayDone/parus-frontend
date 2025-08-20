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
import { Product } from "@/types/admin";
import { AdminTable } from "@/modules/admin/components/admin-table";
import { SearchInput } from "@/modules/admin/components/search-input";
import { StatusBadge } from "@/modules/admin/components/status-badge";
import { Plus } from "lucide-react";

export default function ProductsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	// Fetch products from API
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/admin/products");
				const data = await response.json();
				if (response.ok) {
					setProducts(data.products);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const filteredProducts = products.filter(
		(product) =>
			product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.categories.some((category) =>
				category.name.toLowerCase().includes(searchTerm.toLowerCase()),
			),
	);

	const handleDelete = async (handle: string) => {
		if (!confirm("Вы уверены, что хотите удалить этот продукт?")) return;

		try {
			const response = await fetch(`/api/admin/products/${handle}`, {
				method: "DELETE",
			});

			if (response.ok) {
				// Remove the product from the state
				setProducts(
					products.filter((product) => product.handle !== handle),
				);
			} else {
				const error = await response.json();
				console.error("Error deleting product:", error.error);
				alert("Ошибка при удалении продукта");
			}
		} catch (error) {
			console.error("Error deleting product:", error);
			alert("Ошибка при удалении продукта");
		}
	};

	if (loading) {
		return <div className="p-6">Загрузка продуктов...</div>;
	}

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
						Всего продуктов: {products.length}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center space-x-2 mb-4">
						<SearchInput
							value={searchTerm}
							onChange={setSearchTerm}
							placeholder="Поиск продуктов..."
						/>
					</div>

					<AdminTable
						columns={columns}
						data={filteredProducts}
						actions={actions}
						getKey={(row) => row.handle}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

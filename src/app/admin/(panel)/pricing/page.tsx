"use client";

import { Plus } from "lucide-react";
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
import { deletePricePlan, listPricePlans } from "@/lib/data/pricing-db";
import { AdminTable } from "@/modules/admin/components/admin-table";
import type { PricePlan } from "@/types/admin";
import { StatusBadge } from "@/modules/admin/components/status-badge";

export default function PricingPage() {
	const handleDelete = async (id: string) => {
		try {
			await deletePricePlan(id);
			toast.success("План цены успешно удален");
		} catch (error: any) {
			console.error("Error deleting price plan:", error);
			toast.error(error.message || "Ошибка при удалении плана цены");
			throw error; // Re-throw to be caught by the AdminTable
		}
	};

	const columns = [
		{
			key: "title",
			label: "Название",
			render: (value: string, row: PricePlan) => (
				<div className="flex items-center space-x-3">
					<div>
						<div className="font-medium">{row.title}</div>
						<div className="text-sm text-muted-foreground">
							Цена: {row.price}
						</div>
					</div>
				</div>
			),
		},
		{
			key: "description",
			label: "Описание",
			render: (value: string) => (
				<div className="max-w-xs">
					<p className="text-sm text-muted-foreground truncate">
						{value}
					</p>
				</div>
			),
		},
		{
			key: "popular",
			label: "Популярный",
			render: (value: boolean) => (
				<div className="max-w-xs">
					<p className="text-sm">{value ? "Да" : "Нет"}</p>
				</div>
			),
		},
		{
			key: "active",
			label: "Статус",
			render: (value: boolean) => (
				<StatusBadge
					status={value ? "active" : "inactive"}
					label={value ? "Активна" : "Неактивна"}
				/>
			),
		},
	];

	const actions = [
		{
			type: "view" as const,
			label: "Просмотр",
			href: "/prices/{key}",
		},
		{
			type: "edit" as const,
			label: "Редактировать",
			href: "/admin/pricing/{key}/edit",
		},
		{ type: "delete" as const, label: "Удалить", onClick: handleDelete },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Планы цен
					</h2>
					<p className="text-muted-foreground">
						Управляйте ценовыми планами
					</p>
				</div>
				<Link
					href="/admin/pricing/new"
					className={buttonVariants({ variant: "default" })}
				>
					<Plus />
					Добавить план
				</Link>
			</div>

			<AdminTable
				columns={columns}
				data={[]}
				actions={actions}
				getKey={(row) => row.id}
				fetchDataAction={listPricePlans}
				initialPage={1}
				initialLimit={10}
			/>
		</div>
	);
}

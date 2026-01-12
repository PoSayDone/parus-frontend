"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon-picker";
import { deleteService, listServices } from "@/lib/data/services";
import { AdminTable } from "@/modules/admin/components/admin-table";
import type { Service } from "@/types/admin";
import { StatusBadge } from "@/modules/admin/components/status-badge";

export default function ServicesPage() {
	const handleDelete = async (id: string) => {
		try {
			await deleteService(id);
			toast.success("Услуга успешно удалена");
		} catch (error: any) {
			console.error("Error deleting service:", error);
			toast.error(error.message || "Ошибка при удалении услуги");
			throw error; // Re-throw to be caught by the AdminTable
		}
	};

	const columns = [
		{
			key: "icon",
			label: "Иконка",
			render: (value: string | null) => (
				<div className="flex items-center justify-center size-10 rounded-full bg-muted">
					{value ? (
						<Icon
							name={value as IconName}
							className="size-5 text-foreground"
						/>
					) : (
						<span className="text-xs text-muted-foreground">—</span>
					)}
				</div>
			),
		},
		{
			key: "title",
			label: "Название",
			render: (_value: string, row: Service) => (
				<div className="flex items-center space-x-3">
					<div>
						<div className="font-medium">{row.title}</div>
						<div className="text-sm text-muted-foreground">
							/{row.handle}
						</div>
					</div>
				</div>
			),
		},
		{
			key: "price",
			label: "Цена",
			render: (value: string | null) => (
				<div className="max-w-xs">
					<p className="text-sm text-muted-foreground truncate">
						{value || "Нет цены"}
					</p>
				</div>
			),
		},
		{
			key: "shortDescription",
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
			key: "duration",
			label: "Длительность",
			render: (value: string | null) => (
				<div className="max-w-xs">
					<p className="text-sm">{value || "—"}</p>
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
			href: "/services/{key}",
		},
		{
			type: "edit" as const,
			label: "Редактировать",
			href: "/admin/services/{key}/edit",
		},
		{ type: "delete" as const, label: "Удалить", onClick: handleDelete },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Услуги
					</h2>
					<p className="text-muted-foreground">
						Управляйте ритуальными услугами
					</p>
				</div>
				<Link
					href="/admin/services/new"
					className={buttonVariants({ variant: "default" })}
				>
					<Plus />
					Добавить услугу
				</Link>
			</div>

			<AdminTable
				columns={columns}
				data={[]}
				actions={actions}
				getKey={(row) => row.handle}
				fetchDataAction={listServices}
				initialPage={1}
				initialLimit={10}
			/>
		</div>
	);
}

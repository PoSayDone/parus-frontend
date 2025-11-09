"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { deleteAddress, listAddresses } from "@/lib/data/addresses";
import { AdminTable } from "@/modules/admin/components/admin-table";
import type { Address } from "@/types/admin";
import { StatusBadge } from "@/modules/admin/components/status-badge";

const AddressTypeBadge = ({ type }: { type: string }) => {
	switch (type) {
		case "morgue":
			return <Badge className="bg-amber-700">Морг</Badge>;
		case "cemetery":
			return <Badge className="bg-gray-700">Кладбище</Badge>;
		case "zags":
			return <Badge className="bg-blue-700">ЗАГС</Badge>;
	}
};

export default function AddressesPage() {
	const handleDelete = async (id: string) => {
		try {
			await deleteAddress(id);
			toast.success("Адрес успешно удален");
		} catch (error: any) {
			console.error("Error deleting address:", error);
			toast.error(error.message || "Ошибка при удалении адреса");
			throw error; // Re-throw to be caught by the AdminTable
		}
	};

	const columns = [
		{
			key: "name",
			label: "Название",
			render: (value: string, row: Address) => (
				<div className="flex items-center space-x-3">
					<div className="text-foreground">{value}</div>
					<AddressTypeBadge type={row.type} />
				</div>
			),
		},
		{
			key: "address",
			label: "Адрес",
			render: (value: string) => (
				<div className="max-w-xs">
					<p className="text-sm">{value}</p>
				</div>
			),
		},
		// {
		// 	key: "phone",
		// 	label: "Телефон",
		// 	render: (value: string | null) => (
		// 		<div className="max-w-xs">
		// 			<p className="text-sm">{value || "—"}</p>
		// 		</div>
		// 	),
		// },
		// {
		// 	key: "schedule",
		// 	label: "График работы",
		// 	render: (value: string | null) => (
		// 		<div className="max-w-xs">
		// 			<p className="text-sm">{value || "—"}</p>
		// 		</div>
		// 	),
		// },
		// {
		// 	key: "district",
		// 	label: "Район",
		// 	render: (value: string | null) => (
		// 		<div className="max-w-xs">
		// 			<p className="text-sm">{value || "—"}</p>
		// 		</div>
		// 	),
		// },
		{
			key: "active",
			label: "Статус",
			render: (value: boolean) => (
				<StatusBadge
					status={value ? "active" : "inactive"}
					label={value ? "Активен" : "Неактивен"}
				/>
			),
		},
	];

	const actions = [
		{
			type: "view" as const,
			label: "Просмотр",
			href: "/addresses",
		},
		{
			type: "edit" as const,
			label: "Редактировать",
			href: "/admin/addresses/{key}/edit",
		},
		{ type: "delete" as const, label: "Удалить", onClick: handleDelete },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Адреса
					</h2>
					<p className="text-muted-foreground">
						Управляйте адресами ЗАГСов, моргов и кладбищ
					</p>
				</div>
				<Link
					href="/admin/addresses/new"
					className={buttonVariants({ variant: "default" })}
				>
					<Plus />
					Добавить адрес
				</Link>
			</div>

			<AdminTable
				columns={columns}
				data={[]}
				actions={actions}
				getKey={(row) => row.id}
				fetchDataAction={listAddresses}
				initialPage={1}
				initialLimit={10}
			/>
		</div>
	);
}

"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminTable } from "@/modules/admin/components/admin-table";
import type { ContactRequest } from "@/types/admin";
import {
	deleteContactRequest,
	listContactRequests,
} from "@/lib/data/contact-requests";

export default function RequestsPage() {
	const [statusFilter, setStatusFilter] = useState<
		"all" | "processed" | "unprocessed"
	>("all");

	const handleDelete = async (id: string) => {
		try {
			await deleteContactRequest(id);
			toast.success("Заявка удалена");
		} catch (error: any) {
			console.error("Error deleting request:", error);
			toast.error(error.message || "Ошибка при удалении заявки");
			throw error;
		}
	};

	const fetchRequests = useMemo(() => {
		return async (params: {
			page: number;
			queryParams: { limit: number; q?: string };
		}) => {
			return listContactRequests({
				page: params.page,
				queryParams: {
					...params.queryParams,
					status: statusFilter === "all" ? undefined : statusFilter,
				},
			});
		};
	}, [statusFilter]);

	const columns = [
		{
			key: "name",
			label: "Имя",
			render: (value: string) => (
				<div className="font-medium">{value}</div>
			),
		},
		{
			key: "phone",
			label: "Телефон",
			render: (value: string) => (
				<a href={`tel:${value}`} className="text-sm text-primary">
					{value}
				</a>
			),
		},
		{
			key: "email",
			label: "Email",
			render: (value: string | null) => (
				<div className="text-sm text-muted-foreground">
					{value || "—"}
				</div>
			),
		},
		{
			key: "service",
			label: "Услуга",
			render: (value: string | null) => (
				<div className="text-sm">{value || "—"}</div>
			),
		},
		{
			key: "plan",
			label: "Пакет",
			render: (value: string | null) => (
				<div className="text-sm">{value || "—"}</div>
			),
		},
		{
			key: "message",
			label: "Сообщение",
			render: (value: string | null) => (
				<div className="max-w-xs">
					<p className="text-sm text-muted-foreground truncate">
						{value || "—"}
					</p>
				</div>
			),
		},
		{
			key: "processed",
			label: "Статус",
			render: (value: boolean) => (
				<div className="text-sm">
					{value ? "Отработана" : "Не отработана"}
				</div>
			),
		},
		{
			key: "createdAt",
			label: "Дата",
			render: (value: string | Date) => (
				<div className="text-sm text-muted-foreground">
					{new Date(value).toLocaleString("ru-RU")}
				</div>
			),
		},
	];

	const actions = [
		{
			type: "view" as const,
			label: "Просмотр",
			href: "/admin/requests/{key}",
		},
		{ type: "delete" as const, label: "Удалить", onClick: handleDelete },
	];

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-medium tracking-tight">Заявки</h2>
				<p className="text-muted-foreground">
					Заявки из формы обратной связи
				</p>
			</div>

			<AdminTable
				key={statusFilter}
				columns={columns}
				data={[]}
				actions={actions}
				getKey={(row: ContactRequest) => row.id}
				fetchDataAction={fetchRequests}
				filters={
					<div className="flex items-center gap-2">
						<label
							className="text-sm text-muted-foreground"
							htmlFor="statusFilter"
						>
							Статус
						</label>
						<select
							id="statusFilter"
							className="border rounded-md px-3 py-2 text-sm bg-transparent"
							value={statusFilter}
							onChange={(event) =>
								setStatusFilter(
									event.target.value as
										| "all"
										| "processed"
										| "unprocessed",
								)
							}
						>
							<option value="all">Все</option>
							<option value="unprocessed">Не отработанные</option>
							<option value="processed">Отработанные</option>
						</select>
					</div>
				}
				initialPage={1}
				initialLimit={10}
			/>
		</div>
	);
}

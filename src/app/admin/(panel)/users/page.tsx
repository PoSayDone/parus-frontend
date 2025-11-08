"use client";

import { Calendar, Plus, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { deleteUser, listUsers } from "@/lib/data/users";
import { AdminTable } from "@/modules/admin/components/admin-table";
import { StatusBadge } from "@/modules/admin/components/status-badge";
import type { User } from "@/types/admin";

export default function UsersPage() {
	const formatDate = (dateString: string | null) => {
		if (!dateString) return "—";
		return new Date(dateString).toLocaleDateString("ru-RU");
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteUser(id);
			toast.success("Пользователь успешно удален");
		} catch (error: any) {
			console.error("Error deleting user:", error);
			toast.error(error.message || "Ошибка при удалении пользователя");
			throw error; // Re-throw to be caught by the AdminTable
		}
	};

	const columns = [
		{
			key: "name",
			label: "Пользователь",
			render: (value: string, row: User) => (
				<div className="flex items-center space-x-3">
					<div className="bg-muted rounded-full p-2">
						<UserIcon className="h-4 w-4" />
					</div>
					<div>
						<div className="font-medium">{row.name}</div>
						<div className="text-sm text-muted-foreground">
							{row.email}
						</div>
					</div>
				</div>
			),
		},
		{
			key: "role",
			label: "Роль",
			render: (value: string) => (
				<StatusBadge
					status={value === "admin" ? "published" : "draft"}
					label={value === "admin" ? "Администратор" : "Пользователь"}
				/>
			),
		},
		{
			key: "createdAt",
			label: "Дата регистрации",
			render: (value: string | null) => (
				<div className="flex items-center space-x-1">
					<Calendar className="h-3 w-3 text-muted-foreground" />
					<span className="text-sm">{formatDate(value)}</span>
				</div>
			),
		},
	];

	const actions = [
		{
			type: "edit" as const,
			label: "Редактировать",
			href: "/admin/users/{key}/edit",
		},
		{ type: "delete" as const, label: "Удалить", onClick: handleDelete },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Пользователи
					</h2>
					<p className="text-muted-foreground">
						Управляйте пользователями и администраторами
					</p>
				</div>
				<Link
					href="/admin/users/new"
					className={buttonVariants({ variant: "default" })}
				>
					<Plus />
					Добавить пользователя
				</Link>
			</div>

			<AdminTable
				columns={columns}
				data={[]}
				actions={actions}
				getKey={(row) => row.id}
				fetchDataAction={listUsers}
				initialPage={1}
				initialLimit={10}
			/>
		</div>
	);
}

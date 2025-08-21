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
import { User } from "@/types/admin";
import { AdminTable } from "@/modules/admin/components/admin-table";
import { SearchInput } from "@/modules/admin/components/search-input";
import { StatusBadge } from "@/modules/admin/components/status-badge";
import { Plus, User as UserIcon, Calendar } from "lucide-react";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/users");
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этого пользователя?")) return;

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        const error = await response.json();
        console.error("Error deleting user:", error.error);
        alert("Ошибка при удалении пользователя");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Ошибка при удалении пользователя");
    }
  };

  if (loading) {
    return <div className="p-6">Загрузка пользователей...</div>;
  }

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
            <div className="text-sm text-muted-foreground">{row.email}</div>
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
          <h2 className="text-2xl font-medium tracking-tight">Пользователи</h2>
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

      <Card className="bg-transparent border-border-variant">
        <CardHeader>
          <CardTitle>Список пользователей</CardTitle>
          <CardDescription>
            Всего пользователей: {users.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Поиск пользователей..."
            />
          </div>

          <AdminTable
            columns={columns}
            data={filteredUsers}
            actions={actions}
            getKey={(row) => row.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	LayoutDashboard,
	Package,
	FolderOpen,
	FileText,
	Menu,
	X,
	Home,
	User,
} from "lucide-react";
import { SignOutButton } from "@/modules/admin/components/sign-out-button";

const navigation = [
	{
		name: "Панель управления",
		href: "/admin",
		icon: LayoutDashboard,
	},
	{
		name: "Продукты",
		href: "/admin/products",
		icon: Package,
	},
	{
		name: "Категории",
		href: "/admin/categories",
		icon: FolderOpen,
	},
	{
		name: "Блог",
		href: "/admin/posts",
		icon: FileText,
	},
	{
		name: "Пользователи",
		href: "/admin/users",
		icon: User,
	},
];

export default function AdminRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const pathname = usePathname();

	return (
		<div className="min-h-screen bg-background">
			{/* Mobile sidebar overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={cn(
					"flex flex-col fixed inset-y-0 left-0 z-50 w-72 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
					sidebarOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<div className="flex items-center justify-between h-16 pl-6 pr-4 border-b">
					<h2 className="text-lg font-medium">Админ-панель</h2>
					<Button
						variant="ghost"
						className="lg:hidden size-8 !p-0"
						onClick={() => setSidebarOpen(false)}
					>
						<X />
					</Button>
				</div>

				<nav className="h-full flex-1 flex flex-col">
					<div className="px-4 py-2 border-b">
						<Link
							href="/"
							className={buttonVariants({
								variant: "ghost",
								className: "w-full justify-start",
							})}
						>
							<Home />
							На сайт
						</Link>
					</div>

					<div className="px-4 py-2 space-y-2 flex-1">
						{navigation.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.name}
									href={item.href}
									className={buttonVariants({
										variant: isActive ? "default" : "ghost",
										className: "w-full justify-start",
									})}
								>
									<item.icon />
									{item.name}
								</Link>
							);
						})}
					</div>

					<div className="px-4 py-2 border-t">
						<SignOutButton />
					</div>
				</nav>
			</div>

			<div className="lg:pl-72">
				<div className="sticky top-0 z-30 bg-background border-b h-16 flex items-center px-4 lg:px-6">
					<Button
						variant="ghost"
						size="sm"
						className="lg:hidden size-8 !p-0"
						onClick={() => setSidebarOpen(true)}
					>
						<Menu />
					</Button>
					<h1 className="text-xl font-medium ml-4 lg:ml-0">
						Управление контентом
					</h1>
				</div>

				<main className="p-4 lg:p-6">{children}</main>
			</div>
		</div>
	);
}

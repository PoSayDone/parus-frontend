"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	const navItems = [
		{ name: "Продукты", href: "/admin/products" },
		{ name: "Категории", href: "/admin/categories" },
		{ name: "Записи", href: "/admin/posts" },
	];

	return (
		<div className="flex min-h-screen">
			<div className="w-64 border-r">
				<nav>
					<ul className="space-y-1 px-4">
						{navItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className={cn(
										"block px-4 py-2 rounded-md text-sm font-medium",
										pathname === item.href
											? "bg-blue-100 text-blue-700"
											: "text-gray-700 hover:bg-gray-100",
									)}
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div className="flex-1 px-8 py-4">{children}</div>
		</div>
	);
};

export default AdminLayout;

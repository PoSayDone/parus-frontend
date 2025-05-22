"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StoreProductCategory } from "@medusajs/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Category = ({
	category,
	active = false,
	href,
}: {
	href: string;
	category: StoreProductCategory;
	active: boolean;
}) => {
	return (
		<Link href={href}>
			<li
				className={cn(
					buttonVariants({ variant: active ? "default" : "ghost" }),
					"w-full justify-start",
				)}
			>
				{category.name}
			</li>
		</Link>
	);
};

export default function Categories({
	categories,
}: {
	categories: StoreProductCategory[];
}) {
	const pathname = usePathname();
	const slug = pathname.split("/").at(-1);

	return (
		<div className="flex flex-row overflow-x-scroll md:flex-col md:overflow-clip">
			<Category
				category={{
					id: "-1",
					name: "Всё",
				}}
				active={slug == "store"}
				href="/store"
			/>
			{categories.map((category) => (
				<Category
					key={category.id}
					category={category}
					active={slug == category.handle}
					href={`/categories/${category.handle}`}
				/>
			))}
		</div>
	);
}

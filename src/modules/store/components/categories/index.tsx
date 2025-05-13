import { buttonVariants } from "@/components/ui/button";
import { listCategories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";
import { StoreProductCategory } from "@medusajs/types";

const Category = ({ category }: { category: StoreProductCategory }) => {
	return (
		<li
			className={cn(
				buttonVariants({ variant: "ghost" }),
				"w-full justify-start",
			)}
		>
			{category.name}
		</li>
	);
};

export default async function Categories() {
	const productCategories = await listCategories();

	return (
		<ul>
			<Category
				category={{
					id: "-1",
					name: "Всё",
				}}
			/>
			{productCategories.map((category) => (
				<Category key={category.id} category={category} />
			))}
		</ul>
	);
}

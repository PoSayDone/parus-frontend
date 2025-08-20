import { listCategories } from "@/lib/data/categories";
import Categories from "@/modules/store/components/categories";

export default async function StoreLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const {
		response: { categories: productCategories },
	} = await listCategories({});

	return (
		<div
			className="flex flex-col w-full gap-4"
			data-testid="category-container"
		>
			<Categories categories={productCategories} />
			{children}
		</div>
	);
}

import { listCategories } from "@/lib/data/categories";
import { getSiteSettings } from "@/lib/data/site-settings";
import Categories from "@/modules/store/components/categories";
import { redirect } from "next/navigation";

export default async function StoreLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const settings = await getSiteSettings();
	const showCatalog = settings?.showCatalog ?? true;

	if (!showCatalog) {
		redirect("/");
	}

	const {
		response: { data: categories },
	} = await listCategories({ queryParams: { limit: 40 } });

	return (
		<div
			className="flex flex-col w-full gap-4"
			data-testid="category-container"
		>
			<Categories categories={categories} />
			{children}
		</div>
	);
}

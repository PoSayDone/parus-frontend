import { getSiteSettings } from "@/lib/data/site-settings";
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

	return (
		<div
			className="flex w-full flex-col"
			data-testid="category-container"
		>
			{children}
		</div>
	);
}
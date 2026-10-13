import Image from "next/image";
import { listCategories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";
import LandingCard from "./landing-card";
import ListPlaceholder from "./list-placeholder";

export default async function CategoriesGrid() {
	const {
		response: { data: categories },
	} = await listCategories({
		queryParams: {
			limit: 10,
			draft: false,
		},
	});

	if (categories.length === 0) {
		return (
			<ListPlaceholder text="На данный момент ритуальные товары не доступны" />
		);
	}

	const hasThumbnails = categories.some((category) => category.thumbnail);

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{categories.map((category) => (
				<LandingCard
					key={category.id}
					title={category.name}
					className={cn(
						"relative overflow-clip",
						hasThumbnails ? "h-40 sm:h-48 lg:h-56" : "h-24 justify-center",
					)}
					href={`/categories/${category.handle}`}
				>
					{category.thumbnail && (
						<Image
							className="object-cover"
							src={category.thumbnail}
							alt={category.name}
							fill
							sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
						/>
					)}
				</LandingCard>
			))}
		</div>
	);
}

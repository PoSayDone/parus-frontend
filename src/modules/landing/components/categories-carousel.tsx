import { listCategories } from "@/lib/data/categories";
import EmblaCarousel from "@/modules/common/components/embla-carousel";
import LandingCard from "./landing-card";
import Image from "next/image";

export default async function CategoriesCarousel() {
	const {
		response: { data: categories },
	} = await listCategories({
		queryParams: {
			limit: 10,
			draft: false,
		},
	});

	return (
		<EmblaCarousel>
			{categories.length > 0 ? (
				categories.map((slide) => (
					<div key={slide.id} className="embla__slide !h-[420px]">
						<LandingCard title={slide.name} className="h-full">
							{slide.thumbnail && (
								<Image
									className="mx-auto mt-4"
									src={slide.thumbnail}
									alt={slide.name}
									width={205}
									height={370}
								/>
							)}
						</LandingCard>
					</div>
				))
			) : (
				<div>
					<div className="px-8 py-16 flex items-center justify-center bg-card text-card-foreground rounded-3xl">
						<p className="text-center text-muted-foreground">
							На данный момент ритуальные товары не доступны
						</p>
					</div>
				</div>
			)}
		</EmblaCarousel>
	);
}

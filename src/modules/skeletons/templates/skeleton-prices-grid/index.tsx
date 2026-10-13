import repeat from "@lib/util/repeat";
import SkeletonPriceCard from "../../components/skeleton-price-card";

export default async function SkeletonPricesList({
	numberOfCards = 3,
}: {
	numberOfCards?: number;
}) {
	return (
		<div className="space-y-6" aria-hidden>
			<div className="h-[60px] w-full sm:w-80 bg-muted rounded-full border animate-pulse" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{repeat(numberOfCards).map((index) => (
					<SkeletonPriceCard key={index} />
				))}
			</div>
		</div>
	);
}

import repeat from "@lib/util/repeat";
import { Button } from "@/components/ui/button";
import SkeletonPriceCard from "../../components/skeleton-price-card";

export default async function SkeletonPricesList({
	numberOfCards = 4,
}: {
	numberOfCards?: number;
}) {
	return (
		<div className="space-y-8 text-start">
			<div className="p-1 bg-muted w-fit mx-auto rounded-full gap-1">
				<Button>По частям</Button>
				<Button variant={"ghost"}>Одним платежом</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{repeat(numberOfCards).map((index) => (
					<SkeletonPriceCard key={index} />
				))}
			</div>
		</div>
	);
}

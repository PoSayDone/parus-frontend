import repeat from "@lib/util/repeat";
import SkeletonServiceCard from "../../components/skeleton-service-card";

const SkeletonServicesCarousel = ({
	numberOfCards = 8,
}: {
	numberOfCards?: number;
}) => {
	return (
		<div
			className="flex gap-4 overflow-x-clip w-full"
			data-testid="blog-landing-list-loader"
		>
			{repeat(numberOfCards).map((index) => (
				<SkeletonServiceCard key={index} />
			))}
		</div>
	);
};

export default SkeletonServicesCarousel;

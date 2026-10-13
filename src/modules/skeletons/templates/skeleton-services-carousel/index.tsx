import repeat from "@lib/util/repeat";
import SkeletonServiceCard from "../../components/skeleton-service-card";

const SkeletonServicesCarousel = ({
	numberOfCards = 3,
}: {
	numberOfCards?: number;
}) => {
	return (
		<div
			className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
			data-testid="services-carousel-loader"
		>
			{repeat(numberOfCards).map((index) => (
				<SkeletonServiceCard key={index} />
			))}
		</div>
	);
};

export default SkeletonServicesCarousel;

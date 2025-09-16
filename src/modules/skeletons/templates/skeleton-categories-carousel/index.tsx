import repeat from "@lib/util/repeat";
import SkeletonCategoryCard from "../../components/skeleton-category-card";

const SkeletonCategoriesCarousel = ({
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
				<SkeletonCategoryCard key={index} />
			))}
		</div>
	);
};

export default SkeletonCategoriesCarousel;

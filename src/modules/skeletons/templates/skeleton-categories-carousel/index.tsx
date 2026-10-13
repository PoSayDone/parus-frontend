import repeat from "@lib/util/repeat";
import SkeletonCategoryCard from "../../components/skeleton-category-card";

const SkeletonCategoriesCarousel = ({
	numberOfCards = 8,
}: {
	numberOfCards?: number;
}) => {
	return (
		<div
			className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
			data-testid="categories-grid-loader"
		>
			{repeat(numberOfCards).map((index) => (
				<SkeletonCategoryCard key={index} />
			))}
		</div>
	);
};

export default SkeletonCategoriesCarousel;

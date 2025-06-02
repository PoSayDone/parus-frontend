import repeat from "@lib/util/repeat";
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-card";

const SkeletonProductGrid = ({
	numberOfProducts = 8,
}: {
	numberOfProducts?: number;
}) => {
	return (
		<ul
			className="grid grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-4"
			data-testid="products-list-loader"
		>
			{repeat(numberOfProducts).map((index) => (
				<li key={index}>
					<SkeletonProductPreview />
				</li>
			))}
		</ul>
	);
};

export default SkeletonProductGrid;

import repeat from "@lib/util/repeat";
import SkeletonPostPreview from "../../components/skeleton-post-card";

const SkeletonBlogGrid = ({
	numberOfPosts = 8,
}: {
	numberOfPosts?: number;
}) => {
	return (
		<ul
			className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2 gap-y-4 lg:gap-4"
			data-testid="products-list-loader"
		>
			{repeat(numberOfPosts).map((index) => (
				<li key={index}>
					<SkeletonPostPreview />
				</li>
			))}
		</ul>
	);
};

export default SkeletonBlogGrid;

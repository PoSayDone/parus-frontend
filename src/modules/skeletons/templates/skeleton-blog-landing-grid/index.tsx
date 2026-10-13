import repeat from "@lib/util/repeat";
import SkeletonPostPreview from "../../components/skeleton-post-card";

const SkeletonBlogLandingGrid = ({
	numberOfPosts = 2,
}: {
	numberOfPosts?: number;
}) => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 w-full"
			data-testid="blog-landing-list-loader"
		>
			{repeat(numberOfPosts).map((index) => (
				<SkeletonPostPreview key={index} />
			))}
		</div>
	);
};

export default SkeletonBlogLandingGrid;

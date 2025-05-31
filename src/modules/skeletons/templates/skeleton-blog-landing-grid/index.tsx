import repeat from "@lib/util/repeat";
import SkeletonPostPreview from "../../components/skeleton-post-card";

const SkeletonBlogLandingGrid = ({
	numberOfPosts = 2,
}: {
	numberOfPosts?: number;
}) => {
	return (
		<div
			className="grid columns-2 max-w-[1200px] w-full text-left justify-between items-start self-center grid-cols-1 md:grid-cols-2 gap-4"
			data-testid="blog-landing-list-loader"
		>
			{repeat(numberOfPosts).map((index) => (
				<SkeletonPostPreview key={index} />
			))}
		</div>
	);
};

export default SkeletonBlogLandingGrid;

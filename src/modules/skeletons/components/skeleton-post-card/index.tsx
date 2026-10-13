const SkeletonPostPreview = () => {
	return (
		<div className="animate-pulse flex flex-col">
			<div className="aspect-[16/9] w-full bg-card rounded-3xl border" />
			<div className="w-1/4 h-4 bg-card mt-4 rounded-full"></div>
			<div className="w-3/5 h-7 bg-card mt-2 rounded-full"></div>
		</div>
	);
};

export default SkeletonPostPreview;

const SkeletonPostPreview = () => {
	return (
		<div className="animate-pulse flex flex-col">
			<div className="aspect-[16/9] w-full bg-card text-card-foreground rounded-3xl" />
			<div className="w-2/5 h-6 bg-card mt-4 rounded-md"></div>
			<div className="w-3/5 h-9 bg-card mt-2 rounded-md"></div>
		</div>
	);
};

export default SkeletonPostPreview;

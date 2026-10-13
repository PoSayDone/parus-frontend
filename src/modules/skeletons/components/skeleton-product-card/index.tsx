const SkeletonProductPreview = () => {
	return (
		<div className="animate-pulse">
			<div className="aspect-[4/6] w-full bg-card rounded-3xl border" />
			<div className="flex flex-col mt-3 gap-1.5">
				<div className="w-2/5 h-6 bg-card rounded-full"></div>
				<div className="w-3/5 h-5 bg-card rounded-full"></div>
			</div>
		</div>
	);
};

export default SkeletonProductPreview;

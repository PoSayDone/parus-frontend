const SkeletonPostPreview = () => {
	return (
		<div className="animate-pulse">
			<div className="aspect-[16/9] w-full bg-card text-card-foreground rounded-md" />
			<div className="flex justify-between text-base-regular mt-2 ">
				<div className="w-2/5 h-6 bg-card"></div>
				<div className="w-1/5 h-6 bg-card"></div>
			</div>
		</div>
	);
};

export default SkeletonPostPreview;

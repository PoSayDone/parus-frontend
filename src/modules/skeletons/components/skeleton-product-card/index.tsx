const SkeletonProductPreview = () => {
	return (
		<div className="animate-pulse">
			<div className="aspect-[4/6] w-full bg-card rounded-[24px] border" />
			<div className="flex flex-col justify-between text-base-regular mt-2">
				<div className="w-2/5 h-5 bg-card"></div>
				<div className="w-1/5 h-5 bg-card mt-0.5"></div>
			</div>
		</div>
	);
};

export default SkeletonProductPreview;

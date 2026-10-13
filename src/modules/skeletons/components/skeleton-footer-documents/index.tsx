import repeat from "@lib/util/repeat";

const SkeletonFooterDocuments = ({
	numberOfDocuments = 3,
}: {
	numberOfDocuments?: number;
}) => {
	return (
		<ul className="flex flex-col gap-2">
			{repeat(numberOfDocuments).map((index) => (
				<li key={index}>
					<div className="w-32 h-5 animate-pulse bg-muted rounded-full"></div>
				</li>
			))}
		</ul>
	);
};

export default SkeletonFooterDocuments;

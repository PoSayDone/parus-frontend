import repeat from "@lib/util/repeat";

const SkeletonFooterDocuments = ({
	numberOfDocuments = 8,
}: {
	numberOfDocuments?: number;
}) => {
	return (
		<ul>
			{repeat(numberOfDocuments).map((index) => (
				<li key={index}>
					<div className="w-20 h-6 animate-pulse bg-gray-100"></div>
				</li>
			))}
		</ul>
	);
};

export default SkeletonFooterDocuments;

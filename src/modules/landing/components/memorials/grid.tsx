"use client";
import dynamic from "next/dynamic";

const GridMotion = dynamic(
	() =>
		import("@/modules/common/components/grid-motion").then(
			(mod) => mod.GridMotion,
		),
	{
		ssr: false,
	},
);

export const MemorialsGrid = () => {
	return (
		<GridMotion
			gradientColor="transparent"
			items={[
				"/memorial-1.jpg",
				"/memorial-2.jpg",
				"/memorial-3.jpg",
				"/memorial-1.jpg",
				"/memorial-2.jpg",
				"/memorial-3.jpg",
				"/memorial-1.jpg",
				"/memorial-2.jpg",
				"/memorial-3.jpg",
				"/memorial-1.jpg",
				"/memorial-2.jpg",
				"/memorial-3.jpg",
				"/memorial-1.jpg",
				"/memorial-2.jpg",
				"/memorial-3.jpg",
				"/memorial-1.jpg",
				"/memorial-2.jpg",
				"/memorial-3.jpg",
				"/memorial-1.jpg",
				"/memorial-2.jpg",
				"/memorial-3.jpg",
				"/memorial-1.jpg",
				"/memorial-2.jpg",
				"/memorial-3.jpg",
			]}
		/>
	);
};

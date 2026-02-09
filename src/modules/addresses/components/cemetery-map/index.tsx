"use client";

import dynamic from "next/dynamic";

const CemeteryMapClient = dynamic(() => import("./client"), {
	ssr: false,
	loading: () => <div className="w-full h-96 bg-muted" />,
});

export default function CemeteryMap({
	coords,
}: {
	coords: [number, number];
}) {
	return (
		<div className="rounded-3xl border border-border-variant overflow-hidden">
			<CemeteryMapClient coords={coords} />
		</div>
	);
}

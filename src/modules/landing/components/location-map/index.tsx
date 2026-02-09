"use client";

import dynamic from "next/dynamic";

const LocationMapClient = dynamic(() => import("./client"), {
	ssr: false,
	loading: () => (
		<div className="w-full max-w-[1200px] h-120 rounded-3xl overflow-clip mx-auto bg-muted" />
	),
});

export default function LocationMap({
	lat,
	lng,
	zoom,
}: {
	lat: number;
	lng: number;
	zoom: number;
}) {
	return <LocationMapClient lat={lat} lng={lng} zoom={zoom} />;
}

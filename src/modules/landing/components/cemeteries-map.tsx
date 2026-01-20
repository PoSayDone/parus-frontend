"use client";

import { useMemo } from "react";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

type CemeteryLocation = {
	id: string;
	name: string;
	coords: [number, number];
};

const DEFAULT_CENTER: [number, number] = [58.0105, 56.2502];

export default function CemeteriesMap({
	locations,
}: {
	locations: CemeteryLocation[];
}) {
	const center = useMemo<[number, number]>(() => {
		return locations[0]?.coords || DEFAULT_CENTER;
	}, [locations]);

	return (
		<div className="rounded-3xl border border-border-variant overflow-hidden">
			<Map
				className="w-full h-120"
				state={{ center, zoom: 10 }}
			>
				{locations.map((placemark) => (
					<Placemark
						key={placemark.id}
						geometry={placemark.coords}
						properties={{
							hintContent: placemark.name,
						}}
					/>
				))}
			</Map>
		</div>
	);
}

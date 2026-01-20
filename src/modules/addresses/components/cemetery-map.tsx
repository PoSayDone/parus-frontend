"use client";

import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

export default function CemeteryMap({
	coords,
}: {
	coords: [number, number];
}) {
	return (
		<div className="rounded-3xl border border-border-variant overflow-hidden">
			<YMaps>
				<Map className="w-full h-96" state={{ center: coords, zoom: 14 }}>
					<Placemark geometry={coords} />
				</Map>
			</YMaps>
		</div>
	);
}

"use client";

import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

export default function CemeteryMapClient({
	coords,
}: {
	coords: [number, number];
}) {
	return (
		<YMaps>
			<Map className="w-full h-96" state={{ center: coords, zoom: 14 }}>
				<Placemark geometry={coords} />
			</Map>
		</YMaps>
	);
}

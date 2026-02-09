"use client";

import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";


export default function LocationMapClient({
	lat,
	lng,
	zoom,
}: {
	lat: number;
	lng: number;
	zoom: number;
}) {
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		if (!isLoaded) {
			setIsLoaded(true);
		}
	}, []);

	return (
		<YMaps>
			<Map
				className="w-full max-w-300 h-120 rounded-3xl overflow-clip mx-auto"
				defaultState={{ center: [lat, lng], zoom }}
			>
				{isLoaded && <Placemark defaultGeometry={[lat, lng]} />}
			</Map>
		</YMaps>
	);
}

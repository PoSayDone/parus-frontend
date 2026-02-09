"use client";

import Section from "@/components/ui/section";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

export type WhereToFindUsProps = {
	title?: string;
	subtitle?: string;
	lat?: number;
	lng?: number;
	zoom?: number;
};

const DEFAULT_LOCATION = {
	title: "Где нас найти?",
	subtitle: "г. Пермь, Советской армии 52, этаж 128, офис 812",
	lat: 55.751574,
	lng: 37.573856,
	zoom: 16,
};

export default function WhereToFindUs({
	title = DEFAULT_LOCATION.title,
	subtitle = DEFAULT_LOCATION.subtitle,
	lat = DEFAULT_LOCATION.lat,
	lng = DEFAULT_LOCATION.lng,
	zoom = DEFAULT_LOCATION.zoom,
}: WhereToFindUsProps) {
	return (
		<Section
			id={"where-to-find-us"}
			title={title}
			subtitle={subtitle}
		>
			<YMaps>
				<Map
					className="w-full max-w-[1200px] h-120 rounded-3xl overflow-clip mx-auto"
					defaultState={{ center: [lat, lng], zoom }}
				>
					<Placemark defaultGeometry={[lat, lng]} />
				</Map>
			</YMaps>
		</Section>
	);
}

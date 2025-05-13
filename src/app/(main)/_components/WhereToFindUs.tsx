"use client";

import Section from "@/components/ui/section";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

export default function WhereToFindUs() {
	return (
		<Section
			id={"where-to-find-us"}
			title={"Где нас найти?"}
			subtitle="г. Пермь, Советской армии 52, этаж 128, офис 812"
		>
			<YMaps>
				<Map
					className="w-full max-w-[1200px] h-[400px] rounded-3xl overflow-clip mx-auto"
					defaultState={{ center: [55.751574, 37.573856], zoom: 16 }}
				>
					<Placemark defaultGeometry={[55.751574, 37.573856]} />
				</Map>
			</YMaps>
		</Section>
	);
}

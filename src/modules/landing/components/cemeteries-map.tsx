"use client";

import { useEffect, useMemo, useState } from "react";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import type { CemeteryLocation } from "@/types/landing";

const DEFAULT_CENTER: [number, number] = [58.0105, 56.2502];

const createMarkerIcon = (color: string) => {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="8" fill="${color}" stroke="white" stroke-width="2"/></svg>`;
	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export default function CemeteriesMap({
	locations,
	activeId,
	onSelect,
}: {
	locations: CemeteryLocation[];
	activeId: string | null;
	onSelect: (id: string) => void;
}) {
	const [balloonLayout, setBalloonLayout] = useState<any>(null);
	const [mapInstance, setMapInstance] = useState<any>(null);

	const center = useMemo<[number, number]>(() => {
		const available = locations.filter((item) => item.coords);
		if (available.length === 0) return DEFAULT_CENTER;
		const [latSum, lngSum] = available.reduce(
			(acc, item) => [
				acc[0] + item.coords![0],
				acc[1] + item.coords![1],
			],
			[0, 0],
		);
		return [latSum / available.length, lngSum / available.length];
	}, [locations]);

	useEffect(() => {
		if (!mapInstance || !activeId) return;
		const active = locations.find((item) => item.id === activeId);
		if (!active?.coords) return;
		mapInstance.panTo(active.coords, {
			flying: true,
			duration: 300,
		});
	}, [activeId, locations, mapInstance]);

	return (
		<div className="rounded-3xl border border-border-variant overflow-hidden">
			<YMaps
				onLoad={(ymaps) => {
					const layout =
						ymaps.templateLayoutFactory.createClass(
							'<div style="padding:10px 12px; font-family: inherit;">' +
								'<div style="font-weight:600; font-size:14px; margin-bottom:4px;">$[properties.name]</div>' +
								'<div style="font-size:12px; color:#6b7280;">$[properties.address]</div>' +
								"</div>",
						);
					setBalloonLayout(() => layout);
				}}
			>
				<Map
					className="w-full h-120"
					state={{ center, zoom: 10 }}
					instanceRef={(ref) => setMapInstance(ref)}
				>
					{locations.map((placemark) => {
						if (!placemark.coords) return null;
						const isActive = placemark.id === activeId;
						return (
							<Placemark
								key={placemark.id}
								geometry={placemark.coords}
								modules={[
									"geoObject.addon.hint",
									"geoObject.addon.balloon",
								]}
								options={{
									openBalloonOnClick: true,
									hideIconOnBalloonOpen: false,
									balloonLayout: balloonLayout || undefined,
									balloonPanelMaxMapArea: 0,
									iconLayout: "default#image",
									iconImageHref: createMarkerIcon(
										isActive ? "#111827" : "#64748b",
									),
									iconImageSize: [20, 20],
									iconImageOffset: [-10, -10],
								}}
								properties={{
									name: placemark.name,
									address: placemark.address,
									hintContent: placemark.name,
								}}
								onClick={() => onSelect(placemark.id)}
							/>
						);
					})}
				</Map>
			</YMaps>
		</div>
	);
}

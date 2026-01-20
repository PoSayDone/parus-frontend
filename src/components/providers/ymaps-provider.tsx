"use client";
import { YMaps } from "@pbe/react-yandex-maps";

export const YMapsProvider = ({children}: {children: React.ReactNode}) => {
	return (
		<YMaps>
			{children}
		</YMaps>
	);
};

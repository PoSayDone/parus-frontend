"use client";

import dynamic from "next/dynamic";
import type { CemeteryLocation } from "@/types/landing";

const CemeteriesMapClient = dynamic(() => import("./client"), {
	ssr: false,
	loading: () => <div className="w-full h-120 bg-muted" />,
});

export default function CemeteriesMap({
	locations,
	activeId,
	onSelect,
}: {
	locations: CemeteryLocation[];
	activeId: string | null;
	onSelect: (id: string) => void;
}) {
	return (
		<div className="rounded-3xl border border-border-variant overflow-hidden">
			<CemeteriesMapClient
				locations={locations}
				activeId={activeId}
				onSelect={onSelect}
			/>
		</div>
	);
}

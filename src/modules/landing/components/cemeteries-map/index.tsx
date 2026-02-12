"use client";

import type { CemeteryLocation } from "@/types/landing";
import dynamic from "next/dynamic";

const CemeteriesMapClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => <div className="w-full bg-muted" />,
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
    <div className="overflow-hidden h-full w-full">
      <CemeteriesMapClient
        locations={locations}
        activeId={activeId}
        onSelect={onSelect}
      />
    </div>
  );
}

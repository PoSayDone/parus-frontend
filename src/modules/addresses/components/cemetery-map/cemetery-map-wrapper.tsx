"use client";

import dynamic from "next/dynamic";

// Динамически импортируем оригинальную карту с отключенным SSR
const Map = dynamic(
  () => import("./index"), 
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-xl"></div> 
  }
);

export default function CemeteryMapWrapper({ coords }: { coords: [number, number] }) {
  return <Map coords={coords} />;
}
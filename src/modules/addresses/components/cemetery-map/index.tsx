"use client";

import dynamic from "next/dynamic";

const CemeteryMapClient = dynamic(() => import("./client"), {
  ssr: false,
  // Заменили фиксированную высоту загрузочного экрана на 100%
  loading: () => <div className="w-full h-full bg-muted animate-pulse" />, 
});

export default function CemeteryMap({ coords }: { coords: [number, number] }) {
  return (
    // Убрали Card (чтобы не было двойных рамок) и поставили w-full h-full
    <div className="w-full h-full overflow-hidden">
      <CemeteryMapClient coords={coords} />
    </div>
  );
}
"use client";

import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";

const LocationMapClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-300 h-120 rounded-3xl overflow-clip mx-auto bg-muted" />
  ),
});

export default function LocationMap({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom: number;
}) {
  return (
    <Card className="w-full p-0 m-0 h-[50dvh] lg:h-[70dvh]">
      <LocationMapClient lat={lat} lng={lng} zoom={zoom} />
    </Card>
  );
}

"use client";

import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";

const CemeteryMapClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-muted" />,
});

export default function CemeteryMap({ coords }: { coords: [number, number] }) {
  return (
    <Card className="p-0 m-0 h-[70dvh] overflow-clip">
      <CemeteryMapClient coords={coords} />
    </Card>
  );
}

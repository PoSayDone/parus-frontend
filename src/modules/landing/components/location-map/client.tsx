"use client";

import {
  getReactifiedYMaps3Modules,
  type ReactifiedYMaps3Modules,
} from "@/lib/ymaps3";
import { useEffect, useMemo, useState } from "react";

export default function LocationMapClient({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom: number;
}) {
  const [modules, setModules] = useState<ReactifiedYMaps3Modules | null>(null);
  const [hasError, setHasError] = useState(false);
  const center = useMemo<[number, number]>(() => [lng, lat], [lat, lng]);

  useEffect(() => {
    let isMounted = true;

    getReactifiedYMaps3Modules(process.env.NEXT_PUBLIC_YMAPS3_API_KEY ?? "")
      .then((result) => {
        if (!isMounted) return;
        setModules(result);
      })
      .catch(() => {
        if (!isMounted) return;
        setHasError(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (hasError) {
    return <div className="h-full w-full bg-muted" />;
  }

  if (!modules) {
    return <div className="h-full w-full bg-muted" />;
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    modules;

  return (
    <YMap
      key="our-location"
      className="h-full w-full"
      mode="vector"
      location={{ center, zoom }}
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapMarker coordinates={center}>
        <span
          className="block size-4 rounded-full border-2 border-white bg-primary shadow-md"
          aria-hidden
        />
      </YMapMarker>
    </YMap>
  );
}

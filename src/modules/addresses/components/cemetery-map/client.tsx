"use client";

import {
  getReactifiedYMaps3Modules,
  type ReactifiedYMaps3Modules,
} from "@/lib/ymaps3";
import { useEffect, useMemo, useState } from "react";

export default function CemeteryMapClient({
  coords,
}: {
  coords: [number, number];
}) {
  const [modules, setModules] = useState<ReactifiedYMaps3Modules | null>(null);
  const [hasError, setHasError] = useState(false);
  const center = useMemo<[number, number]>(
    () => [coords[1], coords[0]],
    [coords],
  );

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
    return <div className="w-full h-96 bg-muted" />;
  }

  if (!modules) {
    return <div className="w-full h-96 bg-muted" />;
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    modules;

  return (
    <YMap
      className="w-full h-full"
      mode="vector"
      location={{ center, zoom: 14 }}
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

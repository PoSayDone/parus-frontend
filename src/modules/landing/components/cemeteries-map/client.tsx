"use client";

import {
  getReactifiedYMaps3Modules,
  type ReactifiedYMaps3Modules,
} from "@/lib/ymaps3";
import type { CemeteryLocation } from "@/types/landing";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_CENTER: [number, number] = [58.0105, 56.2502];
const DEFAULT_ZOOM = 10;
const toLngLat = ([lat, lng]: [number, number]): [number, number] => [lng, lat];

export default function CemeteriesMapClient({
  locations,
  activeId,
  onSelect,
}: {
  locations: CemeteryLocation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const [modules, setModules] = useState<ReactifiedYMaps3Modules | null>(null);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const center = useMemo<[number, number]>(() => {
    const withCoords = locations.filter((item) => item.coords);

    if (withCoords.length === 0) {
      return DEFAULT_CENTER;
    }

    const [latSum, lngSum] = withCoords.reduce(
      (acc, item) => [acc[0] + item.coords![0], acc[1] + item.coords![1]],
      [0, 0],
    );

    return [latSum / withCoords.length, lngSum / withCoords.length];
  }, [locations]);

  const activeCenter = useMemo<[number, number]>(() => {
    const active = locations.find((item) => item.id === activeId);
    return active?.coords ?? center;
  }, [activeId, center, locations]);

  // Эффект 1: Ждем любого действия человека (или 4 секунды)
  useEffect(() => {
    const triggerLoad = () => setShouldLoad(true);

    window.addEventListener("mousemove", triggerLoad, { once: true });
    window.addEventListener("scroll", triggerLoad, { once: true });
    window.addEventListener("touchstart", triggerLoad, { once: true });
    

    return () => {
      window.removeEventListener("mousemove", triggerLoad);
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("touchstart", triggerLoad);
      
	  
    };
  }, []);

  // Эффект 2: Сам загрузчик (ждет команды от шпиона)
  useEffect(() => {
    if (!shouldLoad) return;

    let isMounted = true;

    getReactifiedYMaps3Modules(process.env.NEXT_PUBLIC_YMAPS3_API_KEY ?? "")
      .then((result) => {
        if (isMounted) setModules(result);
      })
      .catch(() => {
        if (isMounted) setHasError(true);
      });

    return () => {
      isMounted = false;
    };
  }, [shouldLoad]);

  // Состояния загрузки и ошибки
  if (hasError) {
    return (
      <div className="h-full w-full bg-muted flex items-center justify-center text-sm text-muted-foreground border-2 border-dashed border-muted-foreground/20">
        Не удалось загрузить карту
      </div>
    );
  }

  if (!modules) {
    return <div className="h-full w-full bg-muted animate-pulse" />;
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    modules;

  // Отрисовка самой карты
  return (
    <div className="h-full w-full">
      <YMap
        key="cemeteries"
        className="h-full w-full"
        mode="vector"
        location={{ center: toLngLat(activeCenter), zoom: DEFAULT_ZOOM }}
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        {locations.map((placemark) => {
          if (!placemark.coords) return null;

          const isActive = placemark.id === activeId;

          return (
            <YMapMarker
              key={placemark.id}
              coordinates={toLngLat(placemark.coords)}
            >
              <button
                type="button"
                aria-label={placemark.name}
                title={`${placemark.name}${placemark.address ? `: ${placemark.address}` : ""}`}
                onClick={() => onSelect(placemark.id)}
                className="group relative block"
              >
                <span
                  className="block size-5 rounded-full border-2 border-white shadow-md transition-colors"
                  style={{ backgroundColor: isActive ? "#111827" : "#64748b" }}
                  aria-hidden
                />
                {isActive ? (
                  <span className="absolute left-1/2 top-[-10px] -translate-x-1/2 -translate-y-full rounded-lg bg-background px-2 py-1 text-xs font-medium text-foreground shadow-md whitespace-nowrap">
                    {placemark.name}
                  </span>
                ) : null}
              </button>
            </YMapMarker>
          );
        })}
      </YMap>
    </div>
  );
}
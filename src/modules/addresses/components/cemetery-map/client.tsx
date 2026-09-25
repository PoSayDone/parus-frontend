"use client";

import {
  getReactifiedYMaps3Modules,
  type ReactifiedYMaps3Modules,
} from "@/lib/ymaps3";
import { useEffect, useMemo, useState, useRef } from "react";

export default function CemeteryMapClient({
  coords,
}: {
  coords: [number, number];
}) {
  const [modules, setModules] = useState<ReactifiedYMaps3Modules | null>(null);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const center = useMemo<[number, number]>(
    () => [coords[1], coords[0]],
    [coords],
  );

  useEffect(() => {
    let isMounted = true;
    const currentRef = containerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getReactifiedYMaps3Modules(process.env.NEXT_PUBLIC_YMAPS3_API_KEY ?? "")
          .then((result) => {
            if (!isMounted) return;
            setModules(result);
          })
          .catch(() => {
            if (!isMounted) return;
            setHasError(true);
          });
        observer.disconnect(); // Скрипт пошел грузиться, больше не следим
      }
    }, { rootMargin: "300px", threshold: 0 });

    observer.observe(currentRef);

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, []);

  // Если ошибка
  if (hasError) {
    return (
      <div ref={containerRef} className="w-full h-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
        Не удалось загрузить карту
      </div>
    );
  }

  // Если грузится (или ждет скролла)
  if (!modules) {
    return <div ref={containerRef} className="w-full h-full bg-muted animate-pulse" />;
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = modules;

  return (
    // Главная обертка: ограничивает видимую область и скрывает все, что выходит за ее пределы
    <div ref={containerRef} className="w-full h-full overflow-hidden relative">
      
      {/* Внутренний контейнер: искусственно увеличиваем его высоту на 130px */}
      <div className="w-full absolute top-0 left-0" style={{ height: "calc(100% + 130px)" }}>
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
      </div>

    </div>
  );
}

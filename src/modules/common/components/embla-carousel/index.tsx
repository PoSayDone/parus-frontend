"use client";

import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useMemo, useRef } from "react";

// Карусель идёт от края до края экрана, но слайды выровнены по контейнеру
// страницы: в нём помещается ровно 3 карточки (см. --slide-size в globals.css),
// а соседние видны до края экрана.
export default function EmblaCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const rulerRef = useRef<HTMLDivElement>(null);

  const options: EmblaOptionsType = useMemo(
    () => ({
      // Отступ первого слайда от края экрана = левый край контейнера страницы
      align: (viewSize: number) => {
        const trackSize = rulerRef.current?.clientWidth ?? viewSize;
        return (viewSize - trackSize) / 2;
      },
      dragFree: false,
      loop: true,
    }),
    [],
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emblaRef, _emblaApi] = useEmblaCarousel(options, [
    // Карточку нужно успеть прочитать; при наведении и касании прокрутка замирает
    Autoplay({
      delay: 5000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ]);

  return (
    <div className="embla">
      <div className="container mx-auto px-4" aria-hidden>
        <div ref={rulerRef} />
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>
    </div>
  );
}

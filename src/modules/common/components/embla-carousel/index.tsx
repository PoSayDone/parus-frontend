"use client";

import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

export default function EmblaCarousel({
	children,
}: {
	children: React.ReactNode;
}) {
	const options: EmblaOptionsType = {
		align: "center",
		dragFree: true,
		loop: true,
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [emblaRef, _emblaApi] = useEmblaCarousel(options, [
		Autoplay({
			delay: 2000,
		}),
	]);

	return (
		<div className="embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">{children}</div>
			</div>
		</div>
	);
}

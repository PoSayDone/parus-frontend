"use client";

import Card from "@/components/ui/card";
import Section from "@/components/ui/section";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export default function RitualProducts() {
	const slides = [
		{
			title: "Памятники",
			image: "/tomb.png",
		},
		{
			title: "Памятники",
			image: "/tomb.png",
		},
		{
			title: "Памятники",
			image: "/tomb.png",
		},
		{
			title: "Памятники",
			image: "/tomb.png",
		},
		{
			title: "Памятники",
			image: "/tomb.png",
		},
		{
			title: "Памятники",
			image: "/tomb.png",
		},
		{
			title: "Памятники",
			image: "/tomb.png",
		},
		{
			title: "Памятники",
			image: "/tomb.png",
		},
		{
			title: "Памятники",
			image: "/tomb.png",
		},
		{
			title: "Памятники",
			image: "/tomb.png",
		},
		{
			title: "Памятники",
			image: "/tomb.png",
		},
	];
	const options: EmblaOptionsType = {
		align: "center",
		dragFree: true,
		loop: true,
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({
			delay: 2000,
		}),
	]);

	return (
		<Section
			id="ritual-products"
			className="px-0"
			title="Ритуальные товары"
			subtitle={
				<>
					Все необходимые ритуальные товары
					<br />
					для организации прощания в одном месте.
				</>
			}
		>
			<div className="embla">
				<div className="embla__viewport" ref={emblaRef}>
					<div className="embla__container">
						{slides.map((slide, index) => (
							<div key={index} className="embla__slide">
								<Card title={slide.title}>
									<Image
										className="mx-auto mt-4"
										src={slide.image}
										alt={slide.title}
										width={205}
										height={370}
									/>
								</Card>
							</div>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}

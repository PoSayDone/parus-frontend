"use client";

import LandingCard from "@/modules/landing/components/landing-card";
import Section from "@/components/ui/section";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";

export default function Services() {
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

	const [emblaRef] = useEmblaCarousel(options, [
		Autoplay({
			delay: 2000,
		}),
	]);

	return (
		<Section
			className="!px-0"
			id="services"
			title="Доступные услуги"
			subtitle={
				<>
					<span>Полный комплекс ритуальных услуг.</span>
					<br />
					От подготовки места захоронения до установки памятников.
				</>
			}
		>
			<div className="embla">
				<div className="embla__viewport" ref={emblaRef}>
					<div className="embla__container">
						{slides.map((slide, index) => (
							<div key={index} className="embla__slide">
								<LandingCard title={slide.title}>
									<Image
										className="mx-auto mt-4"
										src={slide.image}
										alt={slide.title}
										width={205}
										height={370}
									/>
								</LandingCard>
							</div>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}

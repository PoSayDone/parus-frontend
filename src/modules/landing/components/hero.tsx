import Image from "next/image";
import Link from "next/link";
import {
	TypographyH1,
	TypographyP,
	TypographyPreline,
	TypographySpan,
} from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";

export type HeroProps = {
	title?: string;
	subtitle?: string;
	ctaLabel?: string;
	ctaHref?: string;
	actionCardText?: string;
	actionCardHref?: string;
};

const DEFAULT_HERO = {
	title: "Сопровождаем вас\nв трудный час",
	subtitle:
		"Всесторонняя поддержка и бережное отношение\nк каждой детали похоронной церемонии",
	ctaLabel: "Стоимость похорон",
	ctaHref: "/prices",
	actionCardText: "Что делать,\nесли случилась беда?",
	actionCardHref: "#actions",
};

export default function Hero({
	title = DEFAULT_HERO.title,
	subtitle = DEFAULT_HERO.subtitle,
	ctaLabel = DEFAULT_HERO.ctaLabel,
	ctaHref = DEFAULT_HERO.ctaHref,
	actionCardText = DEFAULT_HERO.actionCardText,
	actionCardHref = DEFAULT_HERO.actionCardHref,
}: HeroProps) {
	return (
		<Section
			id="hero"
			className="flex flex-col md:flex-row gap-4 py-0 w-full grow-0 md:min-h-[90dvh]"
		>
			<div className="rounded-4xl bg-secondary-container flex-1 relative overflow-clip flex flex-col min-h-150 md:min-h-auto">
				<div className="flex flex-col gap-4 relative z-1 text-left pt-10 px-10">
					<TypographyH1>
						<TypographyPreline className="leading-0">
							{title}
						</TypographyPreline>
					</TypographyH1>
					<TypographyP className="text-xl lg:text-2xl whitespace-pre-line">
						{subtitle}
					</TypographyP>
				</div>
				<div className="relative 2xl:static grow">
					<div className="absolute top-6 right-4 lg:right-20 -scale-x-100 xl:max-w-150 max-w-125 w-full aspect-4/9">
						<Image
							fill
							className="object-cover"
							src="/angel.png"
							alt="Ангел"
							priority
						/>
					</div>
				</div>
				<div className="pb-10 px-10 z-1">
					<Link
						href={ctaHref}
						className={buttonVariants({
							size: "lg",
							className: "w-full",
						})}
					>
						{ctaLabel}
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-1 md:flex md:flex-col gap-4">
				<Link
					className={cn(
						buttonVariants(),
						"hover:bg-inverse-primary/80 transition bg-inverse-primary text-foreground px-8 text-center flex items-center justify-center rounded-full h-full min-h-[200px] w-full",
					)}
					href={actionCardHref}
				>
					<TypographySpan className="text-2xl font-medium">
						<TypographyPreline>
							{actionCardText}
						</TypographyPreline>
					</TypographySpan>
				</Link>
				{/*<Link
					href={"/designer"}
					className={cn(
						buttonVariants(),
						"hover:bg-inverse-primary/80 transition bg-inverse-primary text-foreground text-2xl font-medium sm:h-[400px] h-[300px] py-8 text-center flex items-start justify-center rounded-4xl relative overflow-clip",
					)}
				>
					Перейти
					<br />в конструтор
					<Image
						className="absolute top-32"
						src="/tomb.png"
						alt="Логотип краевой ритуальной компании"
						width={205}
						height={370}
					/>
					<div className="w-[54] h-[54] absolute right-5 bottom-5 bg-primary text-on-primary rounded-full flex items-center justify-center">
						<ArrowRight className="size-6" />
					</div>
				</Link>*/}
			</div>
		</Section>
	);
}

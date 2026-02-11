import Image from "next/image";
import Link from "next/link";
import {
	TypographyH1,
	TypographyP,
	TypographyPreline,
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
	actionCardText: "Порядок действий",
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
			className="py-0 px-0 md:px-0 w-full rounded-none bg-transparent"
		>
			<div className="relative isolate overflow-hidden min-h-[50vh] md:min-h-212.5 w-full flex items-end justify-center px-4 md:px-8 pb-10 md:pb-12">
				<div className="absolute inset-0 bg-primary-container aspect-16/7 w-full max-w-300 left-1/2 -translate-x-1/2 top-[50%] md:top-[35%] blur-[100px] rounded-full" />
				<div className="absolute inset-0 aspect-4/7 w-full max-w-175 left-1/2 -translate-x-1/2">
					<Image
						fill
						className="object-cover object-top"
						src="/angel.png"
						alt="Ангел"
						priority
					/>
				</div>
				<div className="relative z-1 w-full max-w-245 flex flex-col items-center text-center gap-6 md:gap-8">
					<div className="space-y-4 md:space-y-6">
						<TypographyH1 className="text-white text-4xl md:text-6xl lg:text-8xl leading-[0.95] drop-shadow-[0_0px_20px_rgba(0,0,0,0.45)]">
							<TypographyPreline className="tracking-[-2px] md:tracking-[-4px]!">{title}</TypographyPreline>
						</TypographyH1>
						<TypographyP className="font-normal text-white text-base md:text-xl leading-tight whitespace-pre-line max-w-195 mx-auto drop-shadow-[0_0px_20px_rgba(0,0,0,0.45)]">
							{subtitle}
						</TypographyP>
					</div>
					<div className="w-full max-w-225 grid grid-cols-2 gap-4 md:gap-6">
						<Link
							href={ctaHref}
							className={buttonVariants({
								size: "lg",
								className:
									"md:h-20 md:text-xl! font-medium bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm"
							})}
						>
							{ctaLabel}
						</Link>
						<Link
							href={actionCardHref}
							className={cn(
								buttonVariants({
									size: "lg",
									variant: "secondary",
								}),
								"md:h-20 md:text-xl! font-medium bg-white/75 text-foreground hover:bg-white/90 backdrop-blur-sm",
							)}
						>
							{actionCardText}
						</Link>
					</div>
				</div>
			</div>
		</Section>
	);
}

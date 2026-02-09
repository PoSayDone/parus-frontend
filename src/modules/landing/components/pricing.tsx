import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";
import PricesList from "@/modules/prices/components/prices-list";
import SkeletonPricesList from "@/modules/skeletons/templates/skeleton-prices-grid";

export type PricingProps = {
	title?: string;
	subtitle?: string;
	buttonLabel?: string;
	buttonHref?: string;
};

const DEFAULT_PRICING = {
	title: "Стоимость услуг",
	subtitle:
		"Мы предлагаем различные пакеты услуг,\nчтобы каждая семья могла выбрать подходящий вариант.",
	buttonLabel: "Перейти ко всем ценам",
	buttonHref: "/prices",
};

export default function Pricing({
	title = DEFAULT_PRICING.title,
	subtitle = DEFAULT_PRICING.subtitle,
	buttonLabel = DEFAULT_PRICING.buttonLabel,
	buttonHref = DEFAULT_PRICING.buttonHref,
}: PricingProps) {
	return (
		<Section
			id={"pricing"}
			className="container mx-auto"
			title={title}
			subtitle={
				<span className="whitespace-pre-line">{subtitle}</span>
			}
		>
			<Suspense fallback={<SkeletonPricesList />}>
				<PricesList />
			</Suspense>
			<Link
				href={buttonHref}
				className={cn(
					buttonVariants({
						variant: "outline",
						className: "w-fit self-center mt-8",
					}),
				)}
			>
				{buttonLabel}
			</Link>
		</Section>
	);
}

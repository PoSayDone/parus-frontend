import { buttonVariants } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type InteractionProps = {
	title?: string;
	highlight?: string;
	description?: string;
	ctaLabel?: string;
	ctaHref?: string;
};

const DEFAULT_INTERACTION = {
	title: "Готовы получить помощь?",
	highlight: "Свяжитесь с нами",
	description:
		"Наши специалисты ответят на ваши вопросы\nи помогут организовать всё необходимое\nв любое время.",
	ctaLabel: "Заказать звонок",
	ctaHref: "tel:+79999999999",
};

export default function Interaction({
	title = DEFAULT_INTERACTION.title,
	highlight = DEFAULT_INTERACTION.highlight,
	description = DEFAULT_INTERACTION.description,
	ctaLabel = DEFAULT_INTERACTION.ctaLabel,
	ctaHref = DEFAULT_INTERACTION.ctaHref,
}: InteractionProps) {
	return (
		<Section id="interaction" className="px-0 bg-secondary-container">
			<div className="flex max-w-300 w-full justify-between items-center self-center flex-col px-6 gap-8 text-center md:text-left md:px-0 md:flex-row">
				<div className="flex flex-col gap-6">
					<h2 className="text-3xl md:text-4xl font-medium leading-10">
						<span className="whitespace-pre-line">{title}</span>
						<br />
						<span className="text-primary font-semibold">
							{highlight}
						</span>
					</h2>
					<p className="text-lg md:text-xl whitespace-pre-line">
						{description}
					</p>
				</div>
				<Link
					href={ctaHref}
					className={cn(
						buttonVariants({
							size: "lg",
						}),
					)}
				>
					{ctaLabel}
				</Link>
			</div>
		</Section>
	);
}

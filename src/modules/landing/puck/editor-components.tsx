"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";

type SimpleSectionProps = {
	title?: string;
	subtitle?: string;
	children?: React.ReactNode;
	id?: string;
	className?: string;
};

const EditorSection = ({
	title,
	subtitle,
	children,
	id,
	className,
}: SimpleSectionProps) => {
	return (
		<Section id={id} title={title} subtitle={subtitle} className={className}>
			{children}
		</Section>
	);
};

export const ServicesEditor = (props: {
	title?: string;
	subtitle?: string;
}) => (
	<EditorSection
		id="services"
		className="!px-0"
		title={props.title}
		subtitle={props.subtitle}
	>
		<div className="rounded-3xl border border-dashed border-muted-foreground/40 p-8 text-center text-muted-foreground">
			Карточки услуг будут подтянуты с сайта.
		</div>
	</EditorSection>
);

export const PricingEditor = (props: {
	title?: string;
	subtitle?: string;
	buttonLabel?: string;
	buttonHref?: string;
}) => (
	<EditorSection
		id="pricing"
		className="container mx-auto"
		title={props.title}
		subtitle={props.subtitle}
	>
		<div className="rounded-3xl border border-dashed border-muted-foreground/40 p-8 text-center text-muted-foreground">
			Тарифы подтянутся из раздела цен.
		</div>
		{props.buttonLabel ? (
			<Link
				href={props.buttonHref || "/prices"}
				className={cn(
					buttonVariants({
						variant: "outline",
						className: "w-fit self-center mt-8",
					}),
				)}
			>
				{props.buttonLabel}
			</Link>
		) : null}
	</EditorSection>
);

export const RitualProductsEditor = (props: {
	title?: string;
	subtitle?: string;
}) => (
	<EditorSection
		id="ritual-products"
		className="!px-0"
		title={props.title}
		subtitle={props.subtitle}
	>
		<div className="rounded-3xl border border-dashed border-muted-foreground/40 p-8 text-center text-muted-foreground">
			Категории товаров подтянутся из каталога.
		</div>
	</EditorSection>
);

export const PostsEditor = (props: {
	title?: string;
	subtitle?: string;
	buttonLabel?: string;
	buttonHref?: string;
}) => (
	<EditorSection
		id="posts"
		className="items-center md:px-0"
		title={props.title}
		subtitle={props.subtitle}
	>
		<div className="rounded-3xl border border-dashed border-muted-foreground/40 p-8 text-center text-muted-foreground">
			Последние статьи будут подтянуты автоматически.
		</div>
		{props.buttonLabel ? (
			<Link
				href={props.buttonHref || "/blog"}
				className={cn(
					buttonVariants({ variant: "default", size: "lg" }),
					"mt-4",
				)}
			>
				{props.buttonLabel}
			</Link>
		) : null}
	</EditorSection>
);

export const LandingAddressesEditor = (props: {
	title?: string;
	subtitle?: string;
}) => (
	<EditorSection id="addresses" title={props.title} subtitle={props.subtitle}>
		<div className="rounded-3xl border border-dashed border-muted-foreground/40 p-8 text-center text-muted-foreground">
			Карта и список кладбищ подтянутся из адресов.
		</div>
	</EditorSection>
);

export const WhereToFindUsEditor = (props: {
	title?: string;
	subtitle?: string;
	lat?: number;
	lng?: number;
	zoom?: number;
}) => (
	<EditorSection
		id="where-to-find-us"
		title={props.title}
		subtitle={props.subtitle}
	>
		<div className="rounded-3xl border border-dashed border-muted-foreground/40 p-8 text-center text-muted-foreground">
			Карта выводится на сайте. Здесь редактируются координаты и текст.
		</div>
	</EditorSection>
);

export const TextBlockEditor = (props: {
	id?: string;
	title?: string;
	text?: string;
}) => (
	<EditorSection
		id={props.id || "text-block"}
		title={props.title}
		subtitle={props.text ? <span className="whitespace-pre-line">{props.text}</span> : undefined}
	>
		{null}
	</EditorSection>
);

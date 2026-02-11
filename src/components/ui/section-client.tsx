"use client";

import {
	TypographyH2,
	TypographySectionSubtitle,
} from "@/components/typography";
import { cn } from "@/lib/utils";

export default function SectionClient({
	id,
	className,
	title,
	subtitle,
	children,
}: {
	id: string;
	className?: string;
	title?: React.ReactNode;
	subtitle?: React.ReactNode;
	children?: React.ReactNode;
}) {
	return (
		<section
			id={id}
			className={cn(
				"flex flex-col text-center gap-4 px-2 md:px-8 py-[120px]",
				className,
			)}
		>
			{!!title && (
				<TypographyH2 className={cn("px-4")}>
					{title}
				</TypographyH2>
			)}
			{!!subtitle && (
				<TypographySectionSubtitle>
					{subtitle}
				</TypographySectionSubtitle>
			)}
			{children}
		</section>
	);
}

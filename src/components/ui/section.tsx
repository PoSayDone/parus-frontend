import {
	TypographyH2,
	TypographySectionSubtitle,
} from "@/components/typography";
import { cn } from "@/lib/utils";

export default function Section({
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
				"flex flex-col text-left sm:text-center px-2 md:px-8 py-30",
				className,
			)}
		>
			<div className="flex flex-col mb-8 gap-4">
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
			</div>
			{children}
		</section>
	);
}

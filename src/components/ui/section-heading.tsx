import {
	TypographyH2,
	TypographySectionSubtitle,
} from "@/components/typography";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
	title?: React.ReactNode;
	subtitle?: React.ReactNode;
	className?: string;
};

export default function SectionHeading({
	title,
	subtitle,
	className,
}: SectionHeadingProps) {
	if (!title && !subtitle) {
		return null;
	}

	return (
		<div className={cn("flex flex-col items-start text-start mb-8 gap-4", className)}>
			{!!title && (
				<TypographyH2>
					{title}
				</TypographyH2>
			)}
			{!!subtitle && (
				<TypographySectionSubtitle>
					{subtitle}
				</TypographySectionSubtitle>
			)}
		</div>
	);
}

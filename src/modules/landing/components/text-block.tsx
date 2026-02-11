import { TypographyPreline } from "@/components/typography";
import Section from "@/components/ui/section";

export type TextBlockProps = {
	id?: string;
	title?: string;
	text?: string;
};

export default function TextBlock({
	id = "text-block",
	title,
	text,
}: TextBlockProps) {
	return (
		<Section
			id={id}
			title={title}
			subtitle={
				text ? <TypographyPreline>{text}</TypographyPreline> : undefined
			}
		>
			{null}
		</Section>
	);
}

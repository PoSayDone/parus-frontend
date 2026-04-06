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
			// Передаем новый класс через проп textContainerClassName (который в Section идет в SectionHeading)
			  textContainerClassName="max-w-none w-full" 
			  subtitle={
				text ? <TypographyPreline>{text}</TypographyPreline> : undefined
			  }
		>
			{null}
		</Section>
	);
}

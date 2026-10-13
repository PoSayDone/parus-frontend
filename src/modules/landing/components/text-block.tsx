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
			className="container mx-auto"
			textContainerClassName="max-w-3xl text-base lg:text-lg"
			  subtitle={
				text ? <TypographyPreline>{text}</TypographyPreline> : undefined
			  }
		>
			{null}
		</Section>
	);
}

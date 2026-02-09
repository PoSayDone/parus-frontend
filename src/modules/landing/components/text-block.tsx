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
			subtitle={text ? <span className="whitespace-pre-line">{text}</span> : undefined}
		>
			{null}
		</Section>
	);
}

import { TypographyP } from "@/components/typography";

export default function ListPlaceholder({ text }: { text: string }) {
	return (
		<div className="w-full">
			<div className="px-8 py-16 flex items-center justify-center bg-card text-muted-foreground min-h-60 rounded-3xl border">
				<TypographyP className="text-center">{text}</TypographyP>
			</div>
		</div>
	);
}

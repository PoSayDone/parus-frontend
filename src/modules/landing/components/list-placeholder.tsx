export default function ListPlaceholder({ text }: { text: string }) {
	return (
		<div className="w-full">
			<div className="px-8 py-16 flex items-center justify-center bg-card/50 text-muted-foreground h-[420px] max-w-3xl rounded-4xl mx-auto">
				<p className="text-center">{text}</p>
			</div>
		</div>
	);
}

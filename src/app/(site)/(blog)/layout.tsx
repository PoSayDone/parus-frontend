export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="container mx-auto px-4 page-pad flex flex-col w-full relative min-h-[60vh]">
			{children}
		</main>
	);
}

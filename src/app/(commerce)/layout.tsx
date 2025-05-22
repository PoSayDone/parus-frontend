export default function CommerceLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex flex-col w-full relative mx-auto px-3 pb-8 lg:px-8">
			{children}
		</main>
	);
}

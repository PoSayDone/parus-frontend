import { YMapsProvider } from "@/components/providers/ymaps-provider";

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex flex-col relative mx-auto w-full">
			<YMapsProvider>
				{children}
			</YMapsProvider>
		</main>
	);
}

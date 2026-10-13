import Link from "next/link";
import { TypographyH3 } from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LandingCard({
	title,
	children,
	className,
	href = "#",
}: {
	title: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
	href?: string;
}) {
	return (
		<Link href={href} className="group rounded-3xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
			<Card
				className={cn(
					"relative transition-colors hover:border-primary/40",
					className,
				)}
			>
				{/* Подложка под заголовок нужна только поверх обложки */}
				{children ? (
					<div className="absolute z-1 w-full h-32 top-0 right-0 bg-linear-to-b from-card to-transparent" />
				) : null}
				<CardHeader className="z-1 relative">
					<CardTitle>
						<TypographyH3 className="text-lg lg:text-xl">
							{title}
						</TypographyH3>
					</CardTitle>
				</CardHeader>
				{children ? <CardContent>{children}</CardContent> : null}
			</Card>
		</Link>
	);
}

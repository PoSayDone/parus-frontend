import Link from "next/link";
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
		<Link href={href} className="group">
			<Card className={cn("relative", className)}>
				<div className="absolute z-1 w-full h-32 top-0 right-0 bg-linear-to-b from-card to-transparent" />
				<CardHeader className="text-start z-1 relative">
					<CardTitle className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
			</Card>
		</Link>
	);
}

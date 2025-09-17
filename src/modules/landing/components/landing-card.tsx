import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
			<Card className={className}>
				<CardHeader className="text-start">
					<CardTitle className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
			</Card>
		</Link>
	);
}

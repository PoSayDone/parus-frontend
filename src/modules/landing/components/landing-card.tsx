import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function LandingCard({
	title,
	children,
	className,
}: {
	title: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<Link
			href={"#"}
			className={cn(
				buttonVariants(),
				"hover:bg-primary-container flex flex-col hover:text-on-primary-container bg-secondary-container text-foreground rounded-4xl px-12 pt-12 relative flex-1 h-auto transition-colors justify-start",
				className,
			)}
		>
			<h3 className="text-2xl font-medium px-4 text-wrap line-clamp-2 min-h-16">
				{title}
			</h3>
			{children}
		</Link>
	);
}

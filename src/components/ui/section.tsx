import { cn } from "@/lib/utils";

export default function Section({
	id,
	className,
	title,
	subtitle,
	children,
}: {
	id: string;
	className?: string;
	title?: React.ReactNode;
	subtitle?: React.ReactNode;
	children?: React.ReactNode;
}) {
	return (
		<section
			id={id}
			className={cn(
				"flex flex-col text-center gap-4 px-2 md:px-8 py-30",
				className,
			)}
		>
			{!!title && (
				<h2 className={cn("text-3xl md:text-4xl font-medium px-4")}>
					{title}
				</h2>
			)}
			{!!subtitle && (
				<div className="text-lg text-muted-foreground leading-relaxed mb-12 px-4 max-w-3xl mx-auto">
					{subtitle}
				</div>
			)}
			{children}
		</section>
	);
}

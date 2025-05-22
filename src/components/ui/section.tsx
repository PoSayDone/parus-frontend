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
				"flex flex-col text-center gap-4 px-2 md:px-8 py-[120px]",
				className,
			)}
		>
			{!!title && (
				<h2
					className={cn(
						"text-4xl md:text-5xl font-medium px-4",
						subtitle ? "mb-6" : "mb-16",
					)}
				>
					{title}
				</h2>
			)}
			{!!subtitle && (
				<p className="text-xl md:text-2xl mb-16 px-4">{subtitle}</p>
			)}
			{children}
		</section>
	);
}

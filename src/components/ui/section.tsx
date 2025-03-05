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
				"flex flex-col text-center gap-4 px-8 py-[120px]",
				className,
			)}
		>
			{!!title && (
				<h2
					className={cn(
						"text-5xl font-medium",
						subtitle ? "mb-6" : "mb-16",
					)}
				>
					{title}
				</h2>
			)}
			{!!subtitle && <p className="text-2xl mb-16">{subtitle}</p>}
			{children}
		</section>
	);
}

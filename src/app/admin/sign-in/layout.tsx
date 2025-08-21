import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, ArrowUpCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col items-start min-h-screen p-4">
			<Link
				href={"/"}
				className={buttonVariants({ variant: "outline", size: "sm" })}
			>
				<ArrowLeft />
				Вернуться на сайт
			</Link>
			{children}
		</div>
	);
}

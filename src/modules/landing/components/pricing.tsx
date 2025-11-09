import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";
import PricesList from "@/modules/prices/components/prices-list";
import SkeletonPricesList from "@/modules/skeletons/templates/skeleton-prices-grid";

export default function Pricing() {
	return (
		<Section
			id={"pricing"}
			className="container mx-auto"
			title={"Стоимость услуг"}
			subtitle={
				<>
					Мы предлагаем различные пакеты услуг,
					<br /> чтобы каждая семья могла выбрать подходящий вариант.
				</>
			}
		>
			<Suspense fallback={<SkeletonPricesList />}>
				<PricesList />
			</Suspense>
			<Link
				href={"/prices"}
				className={cn(
					buttonVariants({
						variant: "outline",
						className: "w-fit self-center mt-8",
					}),
				)}
			>
				Перейти ко всем ценам
			</Link>
		</Section>
	);
}

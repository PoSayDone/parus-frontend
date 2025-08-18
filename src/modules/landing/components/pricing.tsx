import { buttonVariants } from "@/components/ui/button";
import Section from "@/components/ui/section";
import Link from "next/link";
import { cn } from "@/lib/utils";
import PricesList from "@/modules/prices/components/prices-list";

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
			<PricesList />
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

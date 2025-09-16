import { buttonVariants } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Interaction() {
	return (
		<Section id="interaction" className="px-0 bg-secondary-container">
			<div className="flex max-w-[1200px] w-full justify-between items-center self-center flex-col px-3 gap-8 text-center md:text-left md:px-0 md:flex-row">
				<div className="flex flex-col gap-6">
					<h2 className="text-4xl font-medium">
						Готовы получить помощь?
						<br />
						<span className="text-primary font-semibold">
							Свяжитесь с нами
						</span>
					</h2>
					<p className="text-2xl">
						Наши специалисты ответят на ваши вопросы
						<br /> и помогут организовать всё необходимое
						<br />в любое время.
					</p>
				</div>
				<Link
					href={"tel:+79999999999"}
					className={cn(
						buttonVariants({
							size: "lg",
						}),
					)}
				>
					Заказать звонок
				</Link>
			</div>
		</Section>
	);
}

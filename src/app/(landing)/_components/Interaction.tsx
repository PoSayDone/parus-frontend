import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";

export function Interaction() {
	return (
		<Section id="interaction" className="px-0 bg-secondary-container">
			<div className="flex max-w-[1200px] w-full justify-between items-center self-center flex-col px-3 gap-8 text-center md:text-left md:px-0 md:flex-row">
				<div className="flex flex-col gap-6">
					<h2 className="text-4xl font-medium">
						Готовы получить помощь?
						<br />
						<span className="text-primary font-bold">
							Свяжитесь с нами
						</span>
					</h2>
					<p className="text-2xl">
						Наши специалисты ответят на ваши вопросы
						<br /> и помогут организовать всё необходимое
						<br />в любое время.
					</p>
				</div>
				<Button size={"lg"}>Заказать звонок</Button>
			</div>
		</Section>
	);
}

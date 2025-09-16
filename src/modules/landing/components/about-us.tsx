import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Section from "@/components/ui/section";
import Pigeon from "@/modules/common/icons/pigeon";

export default function AboutUs() {
	return (
		<Section
			id="about-us"
			className="flex flex-col lg:flex-row f max-w-[1200px] mx-auto gap-16 items-center justify-between"
		>
			<div className="text-center md:text-left max-w-3xl">
				<h2 className="text-5xl font-medium mb-10">
					О Пермском Агентстве Ритуальных Услуг
				</h2>
				<div className="flex flex-col gap-6 leading-8 mx-auto">
					<p>
						Организацией услуг нашего агентства занимаются
						квалифицированные специалисты с многолетним опытом в
						ритуальной сфере. Они проходят регулярное обучение и
						обмениваются опытом как с крупными отечественными
						организациями, так и с зарубежными партнерами. Мы готовы
						помочь вам в организации похорон, а также предоставить
						психологическую поддержку и юридические консультации.
					</p>
					<p>
						Работая с вниманием к традициям и пожеланиям семьи, мы
						обеспечиваем достойное прощание, помогая вам в сложный
						момент.
					</p>
				</div>
				<Link
					href="/about"
					className={buttonVariants({
						variant: "default",
						className: "mt-6",
					})}
				>
					Подробнее о нас
				</Link>
			</div>
		</Section>
	);
}

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Section from "@/components/ui/section";
import Pigeon from "@/modules/common/icons/pigeon";

export default function AboutUs() {
	return (
		<Section
			id="about-us"
			className="flex flex-col lg:flex-row mx-auto gap-16 items-center justify-between container"
		>
			<div className="grid lg:grid-cols-2 gap-12 justify-center items-center px-4 md:px-0">
				<div className="text-left">
					<h2 className="text-4xl font-medium mb-10">
						О Пермском Агентстве Ритуальных Услуг
					</h2>
					<div className="flex flex-col gap-6 leading-8 mx-auto">
						<p>
							Организацией услуг нашего агентства занимаются
							квалифицированные специалисты с многолетним опытом в
							ритуальной сфере. Они проходят регулярное обучение и
							обмениваются опытом как с крупными отечественными
							организациями, так и с зарубежными партнерами. Мы
							готовы помочь вам в организации похорон, а также
							предоставить психологическую поддержку и юридические
							консультации.
						</p>
						<p>
							Работая с вниманием к традициям и пожеланиям семьи,
							мы обеспечиваем достойное прощание, помогая вам в
							сложный момент.
						</p>
					</div>
					<Link
						href="/about"
						className={buttonVariants({
							variant: "default",
							size: "lg",
							className: "mt-6",
						})}
					>
						Подробнее о нас
					</Link>
				</div>
				<div className="w-full aspect-square bg-primary-container flex items-center justify-center rounded-full p-16 max-w-[500px] mx-auto">
					<Pigeon className="w-[60%] max-w-lg mx-auto" />
				</div>
			</div>
		</Section>
	);
}

import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import Pigeon from "@/modules/common/icons/pigeon";

type AboutUsProps = {
	title?: string;
	paragraph1?: string;
	paragraph2?: string;
	buttonLabel?: string;
	buttonDisabled?: boolean;
};

const DEFAULT_ABOUT = {
	title: "О Пермском Агентстве Ритуальных Услуг",
	paragraph1:
		"Организацией услуг нашего агентства занимаются квалифицированные специалисты с многолетним опытом в ритуальной сфере. Они проходят регулярное обучение и обмениваются опытом как с крупными отечественными организациями, так и с зарубежными партнерами. Мы готовы помочь вам в организации похорон, а также предоставить психологическую поддержку и юридические консультации.",
	paragraph2:
		"Работая с вниманием к традициям и пожеланиям семьи, мы обеспечиваем достойное прощание, помогая вам в сложный момент.",
	buttonLabel: "Подробнее о нас",
	buttonDisabled: true,
};

export default function AboutUs({
	title = DEFAULT_ABOUT.title,
	paragraph1 = DEFAULT_ABOUT.paragraph1,
	paragraph2 = DEFAULT_ABOUT.paragraph2,
	buttonLabel = DEFAULT_ABOUT.buttonLabel,
	buttonDisabled = DEFAULT_ABOUT.buttonDisabled,
}: AboutUsProps) {
	return (
		<Section
			id="about-us"
			className="flex flex-col lg:flex-row mx-auto gap-16 items-center justify-between container"
		>
			<div className="grid lg:grid-cols-2 gap-12 justify-center items-center px-4 md:px-0">
				<div className="text-left">
					<h2 className="text-3xl md:text-4xl font-medium mb-10">
						{title}
					</h2>
					<div className="flex flex-col gap-6 leading-8 mx-auto">
						<p className="whitespace-pre-line">{paragraph1}</p>
						<p className="whitespace-pre-line">{paragraph2}</p>
					</div>
					<Button
						variant="default"
						size="lg"
						className="mt-6"
						disabled={buttonDisabled}
					>
						{buttonLabel}
					</Button>
				</div>
				<div className="w-full aspect-square bg-primary-container flex items-center justify-center rounded-full p-16 max-w-[500px] mx-auto">
					<Pigeon className="w-[60%] max-w-lg mx-auto" />
				</div>
			</div>
		</Section>
	);
}

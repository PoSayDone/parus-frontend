import Section from "@/components/ui/section";
import Ambulance from "@/modules/common/icons/ambulance";
import Document from "@/modules/common/icons/document";
import Passport from "@/modules/common/icons/passport";
import RitualAgent from "@/modules/common/icons/ritual-agent";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import type { IconProps } from "@/types/icon";

const StepCard = ({
	title,
	description,
	number,
	icon: Icon,
}: {
	title: React.ReactNode;
	description: React.ReactNode;
	number: number;
	icon: React.FC<IconProps>;
}) => {
	return (
		<div className="flex flex-col py-8 w-fit justify-between bg-secondary-container md:flex-row md:justify-center items-center min-h-[500px] max-w-[1200px] rounded-4xl self-center md:w-full px-6 gap-12">
			<div className="flex flex-col gap-6 max-w-[350px] text-left">
				<div>{`Шаг ${number}`}</div>
				<h3 className="text-3xl font-medium">{title}</h3>
				<p>{description}</p>
			</div>
			<div className="size-[280px] rounded-full bg-primary flex items-center justify-center">
				<Icon size={190} />
			</div>
			{/* <Image src={imageSrc} alt={title} width={100} height={100} /> */}
			{/* <div className="w-[250px] h-[250px] bg-primary rounded-full"></div> */}
		</div>
	);
};

type WhatShouldIDoProps = {
	title?: string;
	subtitle?: string;
	step1Title?: string;
	step1Description?: string;
	step2Title?: string;
	step2Description?: string;
	step3Title?: string;
	step3Description?: string;
	step4Title?: string;
	step4Description?: string;
	ctaLabel?: string;
	ctaNote?: string;
};

const DEFAULT_ACTIONS = {
	title: "Что делать, если умер\nблизкий человек?",
	subtitle:
		"Следуйте этим шагам, чтобы быстро и без лишних сложностей\nорганизовать все необходимые процедуры.",
	step1Title: "Вызвать скорую помощь и полицию",
	step1Description:
		"Вызовите бригаду скорой помощи и полицию по номеру 112.",
	step2Title: "Обратиться\nк нам",
	step2Description:
		"Обратитесь к нам с просьбой о вызове представителя. Не забудьте записать его ФИО.",
	step3Title: "Проверьте\nданные сотрудника",
	step3Description:
		"Проверьте данные сотрудника, чтобы убедиться, что он действительно работает в вашем агентстве.",
	step4Title: "Подготовьте\nдокументы",
	step4Description:
		"Подготовьте заранее паспорт усопшего. Также потребуются документы тех, кто находился рядом в момент смерти.",
	ctaLabel: "Вызывать агента",
	ctaNote: "Получите помощь — это бесплатно.",
};

export default function WhatShouldIDo({
	title = DEFAULT_ACTIONS.title,
	subtitle = DEFAULT_ACTIONS.subtitle,
	step1Title = DEFAULT_ACTIONS.step1Title,
	step1Description = DEFAULT_ACTIONS.step1Description,
	step2Title = DEFAULT_ACTIONS.step2Title,
	step2Description = DEFAULT_ACTIONS.step2Description,
	step3Title = DEFAULT_ACTIONS.step3Title,
	step3Description = DEFAULT_ACTIONS.step3Description,
	step4Title = DEFAULT_ACTIONS.step4Title,
	step4Description = DEFAULT_ACTIONS.step4Description,
	ctaLabel = DEFAULT_ACTIONS.ctaLabel,
	ctaNote = DEFAULT_ACTIONS.ctaNote,
}: WhatShouldIDoProps) {
	const stepsData: {
		number: number;
		title: React.ReactNode;
		description: string;
		icon: React.FC<IconProps>;
	}[] = [
		{
			number: 1,
			title: <span className="whitespace-pre-line">{step1Title}</span>,
			description: step1Description,
			icon: Ambulance,
		},
		{
			number: 2,
			title: <span className="whitespace-pre-line">{step2Title}</span>,
			description: step2Description,
			icon: Document,
		},
		{
			number: 3,
			title: <span className="whitespace-pre-line">{step3Title}</span>,
			description: step3Description,
			icon: RitualAgent,
		},
		{
			number: 4,
			title: <span className="whitespace-pre-line">{step4Title}</span>,
			description: step4Description,
			icon: Passport,
		},
	];

	return (
		<Section
			className="px-0"
			id="actions"
			title={<span className="whitespace-pre-line">{title}</span>}
			subtitle={
				<span className="whitespace-pre-line">{subtitle}</span>
			}
		>
			<div className="flex flex-col gap-10 items-center">
				{stepsData.map((step, index) => (
					<StepCard
						key={index}
						title={step.title}
						description={step.description}
						number={index + 1}
						icon={step.icon}
					/>
				))}
			</div>

			<ContactModalTrigger size={"lg"} className="self-center mt-4">
				{ctaLabel}
			</ContactModalTrigger>
			<p>{ctaNote}</p>
		</Section>
	);
}

import Section from "@/components/ui/section";
import Ambulance from "@/modules/common/icons/ambulance";
import Document from "@/modules/common/icons/document";
import Passport from "@/modules/common/icons/passport";
import RitualAgent from "@/modules/common/icons/ritual-agent";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import { IconProps } from "@/types/icon";

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

export default function WhatShouldIDo() {
	const stepsData: {
		number: number;
		title: React.ReactNode;
		description: string;
		icon: React.FC<IconProps>;
	}[] = [
		{
			number: 1,
			title: <>Вызвать скорую помощь и полицию</>,
			description:
				"Вызовите бригаду скорой помощи и полицию по номеру 112.",
			icon: Ambulance,
		},
		{
			number: 2,
			title: (
				<>
					Обратиться
					<br />к нам
				</>
			),
			description:
				"Обратитесь к нам с просьбой о вызове представителя. Не забудьте записать его ФИО.",
			icon: Document,
		},
		{
			number: 3,
			title: (
				<>
					Проверьте
					<br />
					данные сотрудника
				</>
			),
			description:
				"Проверьте данные сотрудника, чтобы убедиться, что он действительно работает в вашем агентстве.",
			icon: RitualAgent,
		},
		{
			number: 4,
			title: (
				<>
					Подготовьте
					<br />
					документы
				</>
			),
			description:
				"Подготовьте заранее паспорт усопшего. Также потребуются документы тех, кто находился рядом в момент смерти.",
			icon: Passport,
		},
	];

	return (
		<Section
			className="px-0"
			id="what-should-i-do"
			title={
				<>
					Что делать, если&nbsp;умер
					<br />
					близкий человек?
				</>
			}
			subtitle={
				<>
					Следуйте этим шагам, чтобы быстро и без лишних сложностей
					<br />
					организовать все необходимые процедуры.
				</>
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
				Вызывать агента
			</ContactModalTrigger>
			<p>Получите помощь — это бесплатно.</p>
		</Section>
	);
}

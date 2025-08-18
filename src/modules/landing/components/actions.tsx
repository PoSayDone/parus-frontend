import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import Document from "@/modules/common/icons/document";
import Passport from "@/modules/common/icons/passport";
import Pigeon from "@/modules/common/icons/pigeon";
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
			title: (
				<>
					Вызовите
					<br />
					ритуального агента
				</>
			),
			description:
				"Позвоните по телефону, указанному на сайте. Оператор назовет вам ФИО и служебные данные представителя агентства.",
			icon: RitualAgent,
		},
		{
			number: 2,
			title: (
				<>
					Оформите
					<br />
					необходимые документы
				</>
			),
			description:
				"При естественной смерти справку выдаст врач поликлиники. В случае несчастного случая или преступления потребуется вызов скорой помощи и полиции.",
			icon: Document,
		},
		{
			number: 3,
			title: (
				<>
					Подготовьте
					<br />
					документы
				</>
			),
			description:
				"Для оформления потребуется паспорт и медицинский полис умершего, а также документы лиц, находившихся рядом.",
			icon: Passport,
		},
		{
			number: 4,
			title: (
				<>
					Организуйте
					<br />
					прощание
				</>
			),
			description:
				"Агент поможет с выбором ритуальных услуг, транспортировкой и проведением церемонии.",
			icon: Pigeon,
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
						// imageSrc={step.imageSrc}
					/>
				))}
			</div>

			<ContactModalTrigger className="self-center mt-4">
				Вызывать агента
			</ContactModalTrigger>
			<p>Получите помощь — это бесплатно.</p>
		</Section>
	);
}

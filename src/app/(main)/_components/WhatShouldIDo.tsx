import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";

const StepCard = ({
	title,
	description,
	number,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	imageSrc,
}: {
	title: React.ReactNode;
	description: React.ReactNode;
	number: number;
	imageSrc?: string;
}) => {
	return (
		<div className="flex gap-28 bg-secondary-container justify-center items-center h-[500px] max-w-[1200px] rounded-4xl self-center w-full">
			<div className="flex flex-col gap-6 max-w-[350px] text-left">
				<div>{`Шаг ${number}`}</div>
				<h3 className="text-3xl font-medium">{title}</h3>
				<p>{description}</p>
			</div>
			{/* <Image src={imageSrc} alt={title} width={100} height={100} /> */}
			<div className="w-[250px] h-[250px] bg-primary rounded-full"></div>
		</div>
	);
};

export default function WhatShouldIDo() {
	const stepsData: {
		number: number;
		title: React.ReactNode;
		description: string;
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
		},
	];

	return (
		<Section
			className="px-0"
			id="what-should-i-do"
			title={
				<>
					Что делать, если умер
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
			<div className="flex flex-col gap-10">
				{stepsData.map((step, index) => (
					<StepCard
						key={index}
						title={step.title}
						description={step.description}
						number={index + 1}
						// imageSrc={step.imageSrc}
					/>
				))}
			</div>

			<Button className="self-center mt-4">Вызывать агента</Button>
			<p>Получите помощь — это бесплатно.</p>
		</Section>
	);
}

"use client";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import React from "react";

const Question = ({
	title,
	paragraph,
}: {
	title: React.ReactNode;
	paragraph: React.ReactNode;
}) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Collapsible
			className="w-full max-w-[1200px]"
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<CollapsibleTrigger className="text-xl bg-secondary-container py-6 px-8 rounded-2xl w-full flex justify-between text-left">
				{title}
				<ChevronUp
					className={cn(
						isOpen ? "rotate-180" : "",
						"transition-transform",
					)}
				/>
			</CollapsibleTrigger>
			<CollapsibleContent className="bg-primary text-on-primary text-start text-lg p-8 rounded-2xl mt-2">
				<p>{paragraph}</p>
			</CollapsibleContent>
		</Collapsible>
	);
};

const questions = [
	{
		title: "Какие документы нужны для оформления похорон?",
		paragraph:
			"Для организации похорон потребуется паспорт умершего, его медицинский полис (если есть), а также ваш паспорт как заявителя. В случае смерти в медицинском учреждении предоставляется справка о смерти.",
	},

	{
		title: "Как быстро можно организовать похороны?",
		paragraph:
			"Сроки зависят от обстоятельств, но в большинстве случаев похороны проводятся в течение 2-3 дней. Мы поможем оперативно оформить документы и подготовить все необходимое.",
	},
	{
		title: "Можно ли заказать ритуальные услуги онлайн?",
		paragraph:
			"Да, вы можете оставить заявку на сайте или связаться с нами по телефону. Мы проконсультируем вас, поможем выбрать необходимые услуги и оформить все документы дистанционно.",
	},
	{
		title: "Оказываете ли вы помощь с перевозкой тела?",
		paragraph:
			"Да, мы организуем транспортировку умершего в морг, крематорий или на кладбище, учитывая все требования законодательства.",
	},
	{
		title: "Можно ли заранее выбрать ритуальные товары и место захоронения?",
		paragraph:
			"Да, вы можете заранее обсудить с нашими специалистами все детали, выбрать ритуальные принадлежности и оформить резерв на место захоронения.",
	},
];

export default function QnA() {
	return (
		<Section
			id="qna"
			title="Вопрос — ответ"
			subtitle={
				<>
					Ответы на самые важные вопросы, которые
					<br />
					помогут вам сориентироваться в сложной ситуации.
				</>
			}
			className="items-center"
		>
			{questions.map((question, index) => (
				<Question
					key={index}
					title={question.title}
					paragraph={question.paragraph}
				/>
			))}
		</Section>
	);
}

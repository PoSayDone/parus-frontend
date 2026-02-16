import {
  TypographyP,
  TypographyPreline,
  TypographySpan,
} from "@/components/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Section from "@/components/ui/section";
import type React from "react";

const Question = ({
  value,
  title,
  paragraph,
}: {
  value: string;
  title: React.ReactNode;
  paragraph: React.ReactNode;
}) => {
  return (
    <AccordionItem value={value} className="border-none!">
      <AccordionTrigger className="bg-secondary-container py-6 px-8 rounded-2xl w-full flex justify-between text-left">
        <TypographySpan className="text-xl">{title}</TypographySpan>
      </AccordionTrigger>
      <AccordionContent className="bg-primary text-on-primary text-start p-8 rounded-2xl mt-2">
        <TypographyP className="text-lg">{paragraph}</TypographyP>
      </AccordionContent>
    </AccordionItem>
  );
};

export type QnAProps = {
  title?: string;
  subtitle?: string;
  questions?: {
    title: string;
    description: string;
  }[];
};

const DEFAULT_QNA = {
  title: "Вопрос — ответ",
  subtitle:
    "Ответы на самые важные вопросы, которые\nпомогут вам сориентироваться в сложной ситуации.",
  questions: [
    {
      title: "Какие документы нужны для оформления похорон?",
      description:
        "Для организации похорон потребуется паспорт умершего, его медицинский полис (если есть), а также ваш паспорт как заявителя. В случае смерти в медицинском учреждении предоставляется справка о смерти.",
    },
    {
      title: "Как быстро можно организовать похороны?",
      description:
        "Сроки зависят от обстоятельств, но в большинстве случаев похороны проводятся в течение 2-3 дней. Мы поможем оперативно оформить документы и подготовить все необходимое.",
    },
    {
      title: "Можно ли заказать ритуальные услуги онлайн?",
      description:
        "Да, вы можете оставить заявку на сайте или связаться с нами по телефону. Мы проконсультируем вас, поможем выбрать необходимые услуги и оформить все документы дистанционно.",
    },
    {
      title: "Оказываете ли вы помощь с перевозкой тела?",
      description:
        "Да, мы организуем транспортировку умершего в морг, крематорий или на кладбище, учитывая все требования законодательства.",
    },
    {
      title: "Можно ли заранее выбрать ритуальные товары и место захоронения?",
      description:
        "Да, вы можете заранее обсудить с нашими специалистами все детали, выбрать ритуальные принадлежности и оформить резерв на место захоронения.",
    },
  ],
};

export default function QnA({
  title = DEFAULT_QNA.title,
  subtitle = DEFAULT_QNA.subtitle,
  questions = DEFAULT_QNA.questions,
}: QnAProps) {
  const resolvedQuestions = (questions || []).map((item) => ({
    title: item.title,
    paragraph: item.description,
  }));

  return (
    <Section
      id="qna"
      className="container mx-auto"
      textContainerClassName="lg:text-center lg:items-center"
      title={<TypographyPreline>{title}</TypographyPreline>}
      subtitle={<TypographyPreline>{subtitle}</TypographyPreline>}
    >
      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-2 w-full max-w-300 mx-auto"
      >
        {resolvedQuestions.map((question, index) => (
          <Question
            key={index}
            value={index.toString()}
            title={question.title}
            paragraph={question.paragraph}
          />
        ))}
      </Accordion>
    </Section>
  );
}

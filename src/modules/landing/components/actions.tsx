import { TypographyP, TypographyPreline } from "@/components/typography";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
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
    <Card className="flex flex-col-reverse py-8 w-fit justify-between bg-primary text-on-primary items-start lg:flex-row lg:justify-center lg:items-center lg:min-h-125 max-w-300 w-full rounded-4xl self-center md:w-full px-6 lg:gap-12">
      <div className="flex flex-col gap-4 max-w-87.5 text-left">
        <div>{`Шаг ${number}`}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-on-primary/70">
          {description}
        </CardDescription>
      </div>
      <div className="size-fit lg:size-70 rounded-full flex items-center justify-center">
        <Icon className="size-20 lg:size-50" />
      </div>
      {/* <Image src={imageSrc} alt={title} width={100} height={100} /> */}
      {/* <div className="w-[250px] h-[250px] bg-primary rounded-full"></div> */}
    </Card>
  );
};

export type WhatShouldIDoProps = {
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
  step1Description: "Вызовите бригаду скорой помощи и полицию по номеру 112.",
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
      title: <TypographyPreline>{step1Title}</TypographyPreline>,
      description: step1Description,
      icon: Ambulance,
    },
    {
      number: 2,
      title: <TypographyPreline>{step2Title}</TypographyPreline>,
      description: step2Description,
      icon: Document,
    },
    {
      number: 3,
      title: <TypographyPreline>{step3Title}</TypographyPreline>,
      description: step3Description,
      icon: RitualAgent,
    },
    {
      number: 4,
      title: <TypographyPreline>{step4Title}</TypographyPreline>,
      description: step4Description,
      icon: Passport,
    },
  ];

  return (
    <Section
      id="actions"
      className="container mx-auto"
      textContainerClassName="lg:text-center lg:items-center"
      title={<TypographyPreline>{title}</TypographyPreline>}
      subtitle={<TypographyPreline>{subtitle}</TypographyPreline>}
    >
      <div className="flex flex-col gap-4 lg:gap-8 items-center">
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

      <ContactModalTrigger size={"lg"} className="self-center mt-8">
        {ctaLabel}
      </ContactModalTrigger>
      <TypographyP className="mt-4">{ctaNote}</TypographyP>
    </Section>
  );
}

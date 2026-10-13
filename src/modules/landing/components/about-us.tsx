import {
  TypographyP,
  TypographyPreline,
  TypographySectionSubtitle,
} from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export type AboutUsProps = {
  title?: string;
  paragraph1?: string;
  paragraph2?: string;
  buttonLabel?: string;
  buttonDisabled?: boolean;
  cards?: {
    value: string;
    label: string;
    image?: string;
  }[];
};

const DEFAULT_ABOUT = {
  title: "О нас",
  paragraph1:
    "Наша общая цель - создание пространства, которые вдохновляют и остаются в сердцах наших клиентов.",
  paragraph2:
    "Мы проектируем и строим частные и общественные пространства с любовью к людям, природе и архитектуре.",
  buttonLabel: "Больше о компании",
  buttonDisabled: false,
  cards: [
    {
      value: "12",
      label: "Профессионалов в команде",
      image: "/placeholder.svg",
    },
    {
      value: "7",
      label: "Городов России",
      image: "/placeholder.svg",
    },
    {
      value: "8",
      label: "Лет опыта",
      image: "/placeholder.svg",
    },
    {
      value: "200+",
      label: "Проектов",
      image: "/placeholder.svg",
    },
  ],
};

const ABOUT_CARDS_LAYOUT = [
  {
    className: "col-span-6",
  },
  {
    className: "col-span-6",
  },
  {
    className: "col-span-6",
  },
  {
    className: "col-span-6",
  },
] as const;

const StatCard = ({
  value,
  label,
  image,
  className,
}: {
  value: string;
  label: string;
  image: string;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden min-h-52 sm:min-h-64 lg:min-h-80 p-0",
        className,
      )}
    >
      <Image
        src={image}
        alt={label}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-primary/35 via-primary/20 to-primary/65" />
      <div className="relative h-full p-6 flex flex-col justify-between">
        <p className="text-white text-4xl sm:text-5xl lg:text-6xl leading-none font-medium">
          {value}
        </p>
        <TypographyP className="text-white text-lg lg:text-xl leading-tight">
          {label}
        </TypographyP>
      </div>
    </Card>
  );
};

export default function AboutUs({
  title = DEFAULT_ABOUT.title,
  paragraph1 = DEFAULT_ABOUT.paragraph1,
  paragraph2 = DEFAULT_ABOUT.paragraph2,
  buttonLabel = DEFAULT_ABOUT.buttonLabel,
  buttonDisabled = DEFAULT_ABOUT.buttonDisabled,
  cards = DEFAULT_ABOUT.cards,
}: AboutUsProps) {
  const aboutCards = cards.slice(0, 4).map((card, index) => ({
    ...card,
    image: card.image || "/placeholder.svg",
    ...ABOUT_CARDS_LAYOUT[index]!,
  }));

  return (
    <Section
      id="about-us"
      className="container mx-auto"
      title={<TypographyPreline>{title}</TypographyPreline>}
    >
      <div className="grid grid-cols-6 sm:grid-cols-12 gap-4 sm:gap-x-8">
        <div className="col-span-6 flex items-center">
          <TypographySectionSubtitle>
            {paragraph1}
          </TypographySectionSubtitle>
        </div>

        {aboutCards.slice(0, 2).map((card, index) => (
          <StatCard key={`${card.label}-${index}`} {...card} />
        ))}

        {aboutCards.slice(2).map((card, index) => (
          <StatCard key={`${card.label}-${index + 2}`} {...card} />
        ))}

        <div className="col-span-6 flex flex-col justify-center gap-6">
          <TypographySectionSubtitle>
            {paragraph2}
          </TypographySectionSubtitle>
          {!buttonDisabled && (
            <Button
              variant="default"
              size="lg"
              className="w-fit"
            >
              {buttonLabel}
              <ArrowUpRight className="size-5" />
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}

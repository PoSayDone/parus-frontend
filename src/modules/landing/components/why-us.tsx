import { TypographyPreline } from "@/components/typography";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";
import CheckmarkedDocument from "@/modules/common/icons/checkmarked-document";
import HandWithHeart from "@/modules/common/icons/hand-with-heart";
import TwoPeopleTalking from "@/modules/common/icons/two-people-talking";
import type { IconProps } from "@/types/icon";

export type WhyUsProps = {
  title?: string;
  subtitle?: string;
  item1Title?: string;
  item1Description?: string;
  item2Title?: string;
  item2Description?: string;
  item3Title?: string;
  item3Description?: string;
};

const DEFAULT_WHY_US = {
  title: "Почему вы можете\nдоверять нам?",
  subtitle:
    "Мы - команда профессионалов, которые знают, как сделать прощание максимально комфортным и безопасным",
  item1Title: "Забота",
  item1Description:
    "Поможем организовать\nпрощание с вниманием к деталям\nи вашим пожеланиям.",
  item2Title: "Уверенность",
  item2Description:
    "Гарантируем юридическую\nчистоту оформления и соблюдение\nвсех формальностей",
  item3Title: "Понимание",
  item3Description:
    "Предложим оптимальные\nрешения, учитывая традиции\nи возможности семьи",
};

const WhyUsCard = ({
  title,
  description,
  icon: Icon,
  iconClassName,
  className,
}: {
  title: string;
  description: string;
  icon: React.FC<IconProps>;
  iconClassName?: string;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        `gap-0 w-full min-w-70 relative flex flex-col items-start justify-end flex-1 border border-primary shadow-sm bg-primary-container text-on-primary-container rounded-3xl`,
        className,
      )}
    >
      <CardHeader className="text-start w-full">
        <Icon size={140} className={cn("mb-4", iconClassName)} />
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-on-primary-container/70 w-full">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default function WhyUs({
  title = DEFAULT_WHY_US.title,
  subtitle = DEFAULT_WHY_US.subtitle,
  item1Title = DEFAULT_WHY_US.item1Title,
  item1Description = DEFAULT_WHY_US.item1Description,
  item2Title = DEFAULT_WHY_US.item2Title,
  item2Description = DEFAULT_WHY_US.item2Description,
  item3Title = DEFAULT_WHY_US.item3Title,
  item3Description = DEFAULT_WHY_US.item3Description,
}: WhyUsProps) {
  return (
    <Section
      className="container mx-auto"
      textContainerClassName="items-start text-start container mx-auto"
      id="why-us"
      title={
        <TypographyPreline className="text-start">{title}</TypographyPreline>
      }
      subtitle={
        <TypographyPreline className="text-start">{subtitle}</TypographyPreline>
      }
    >
      <div className="flex flex-wrap justify-center mx-auto w-full gap-4 container">
        <WhyUsCard
          title={item1Title}
          description={item1Description}
          icon={HandWithHeart}
        />
        <WhyUsCard
          title={item2Title}
          description={item2Description}
          icon={CheckmarkedDocument}
        />
        <WhyUsCard
          title={item3Title}
          description={item3Description}
          icon={TwoPeopleTalking}
        />
      </div>
    </Section>
  );
}

import {
  TypographyH2,
  TypographyP,
  TypographyPreline,
} from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import Section from "@/components/ui/section";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import { Phone } from "lucide-react";

export type InteractionProps = {
  title?: string;
  highlight?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const DEFAULT_INTERACTION = {
  title: "Готовы получить помощь?",
  highlight: "Свяжитесь с нами",
  description:
    "Наши специалисты ответят на ваши вопросы\nи помогут организовать всё необходимое\nв любое время.",
  ctaLabel: "Заказать звонок",
  ctaHref: "tel:+79999999999",
};

export default function Interaction({
  title = DEFAULT_INTERACTION.title,
  highlight = DEFAULT_INTERACTION.highlight,
  description = DEFAULT_INTERACTION.description,
  ctaLabel = DEFAULT_INTERACTION.ctaLabel,
  ctaHref = DEFAULT_INTERACTION.ctaHref,
}: InteractionProps) {
  return (
    <Section id="interaction" className="bg-secondary-container lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 container mx-auto text-start items-center gap-4 px-4">
        <div className="flex flex-col gap-6">
          <TypographyH2 className="leading-none">
            <TypographyPreline>{title}</TypographyPreline>
          </TypographyH2>
        </div>
        <div className="flex flex-col items-start gap-8">
          <TypographyP className="text-lg md:text-xl whitespace-pre-line">
            {description}
          </TypographyP>
          <ContactModalTrigger className={buttonVariants({ size: "lg" })}>
            <Phone />
            {ctaLabel}
          </ContactModalTrigger>
        </div>
      </div>
    </Section>
  );
}

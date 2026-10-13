import {
  TypographyH2,
  TypographyP,
  TypographyPreline,
} from "@/components/typography";
import Section from "@/components/ui/section";
import { formatPhoneNumber } from "@/lib/utils";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";

export type InteractionProps = {
  title?: string;
  highlight?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
  // Без обёртки-секции: когда блок стоит внутри .page-blocks
  bare?: boolean;
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
  description = DEFAULT_INTERACTION.description,
  ctaLabel = DEFAULT_INTERACTION.ctaLabel,
  phone = "+7 (342) 277-72-72",
  bare = false,
}: InteractionProps) {
  const cleanPhone = phone.replace(/[^\d+]/g, "");

  const panel = (
      <div className="flex flex-col gap-8 rounded-3xl bg-primary p-6 text-on-primary sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:p-16">
        <div className="flex flex-col gap-4">
          <TypographyH2>
            <TypographyPreline>{title}</TypographyPreline>
          </TypographyH2>
          <TypographyP className="max-w-md text-on-primary/75 lg:text-xl text-pretty">
            {description}
          </TypographyP>
        </div>

        {/* Телефон крупнее всего остального: в трудную минуту чаще звонят, чем пишут */}
        <div className="flex flex-col items-start gap-6 lg:items-end lg:text-right">
          <div>
            <a
              href={`tel:${cleanPhone}`}
              className="block whitespace-nowrap text-3xl font-medium leading-none underline-offset-8 hover:underline sm:text-4xl lg:text-5xl"
            >
              {formatPhoneNumber(phone)}
            </a>
            <p className="mt-3 text-on-primary/75">
              Круглосуточно, без выходных
            </p>
          </div>
          <ContactModalTrigger
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
          >
            {ctaLabel}
          </ContactModalTrigger>
        </div>
      </div>
  );

  if (bare) return panel;

  return (
    <Section id="interaction" className="container mx-auto">
      {panel}
    </Section>
  );
}

import { TypographyH4, TypographyP } from "@/components/typography";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import Image from "next/image";

export type MemorialsProps = {
  title?: string;
  subtitle?: string;
  illustrations?: {
    src: string;
    alt: string;
  }[];
  features?: {
    title: string;
    description: string;
  }[];
  paragraph?: string;
  ctaLabel?: string;
};

const DEFAULT_MEMORIALS = {
  title: "Изготовление памятников",
  subtitle:
    "Наша собственная мастерская по изготовлению памятников поможет Вам в изготовлении уникального надгробия",
  illustrations: [
    {
      src: "/memorial-1.jpg",
      alt: "Иллюстрация памятника",
    },
    {
      src: "/memorial-2.jpg",
      alt: "Иллюстрация оформления",
    },
  ],
  features: [
    {
      title: "Индивидуальный дизайн",
      description: "Создание уникальных проектов по вашим пожеланиям",
    },
    {
      title: "Портретная гравировка",
      description: "Высококачественная гравировка портретов",
    },
    {
      title: "Установка",
      description: "Профессиональная установка на кладбище",
    },
    {
      title: "Документооборот",
      description: "Оформление всех необходимых документов",
    },
  ],
  paragraph:
    "Наша мастерская специализируется на изготовлении памятников из высококачественных материалов. Мы работаем с гранитом, мрамором и другими натуральными камнями, создавая долговечные и красивые мемориалы.",
  ctaLabel: "Заказать памятник",
};

const ILLUSTRATION_LAYOUT = [
  {
    className: "left-[6%] top-[10%] w-[46%] -rotate-[7deg] z-20",
  },
  {
    className: "right-[6%] top-[4%] w-[46%] rotate-[6deg] z-10",
  },
] as const;

export default function Memorials({
  title = DEFAULT_MEMORIALS.title,
  subtitle = DEFAULT_MEMORIALS.subtitle,
  illustrations = DEFAULT_MEMORIALS.illustrations,
  features = DEFAULT_MEMORIALS.features,
  paragraph = DEFAULT_MEMORIALS.paragraph,
  ctaLabel = DEFAULT_MEMORIALS.ctaLabel,
}: MemorialsProps) {
  return (
    <Section
      id="memorials"
      className="container mx-auto py-12 lg:py-14"
      textContainerClassName="m-0 p-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start">
        <div className="order-1 lg:order-2">
          <div className="relative w-full max-w-145 mx-auto aspect-6/5 rounded-3xl overflow-visible">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bg-primary-container w-[62%] aspect-square rounded-full blur-[95px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75" />
            </div>
            {illustrations.slice(0, 2).map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                className={`absolute overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border shadow-[0_20px_50px_-18px_rgba(0,0,0,0.45)] ${ILLUSTRATION_LAYOUT[index]?.className || ""} aspect-3/5`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>

        <div className="order-2 lg:order-1 flex flex-col justify-between gap-5 text-left z-1 mt-4 lg:mt-0">
          <SectionHeading title={title} subtitle={subtitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(features || []).map((feature, index) => (
              <div
                key={`${feature.title}-${index}`}
                className="p-4 lg:p-5 bg-card rounded-2xl"
              >
                <TypographyH4 className="mb-2 text-xl">
                  {feature.title}
                </TypographyH4>
                <TypographyP className="text-card-foreground text-sm">
                  {feature.description}
                </TypographyP>
              </div>
            ))}
          </div>

          <div className="max-w-2xl">
            <ContactModalTrigger size="lg" className="mt-6">
              {ctaLabel}
            </ContactModalTrigger>
          </div>
        </div>
      </div>
    </Section>
  );
}

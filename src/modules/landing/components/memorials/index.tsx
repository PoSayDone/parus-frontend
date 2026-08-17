import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import Image from "next/image";
import Link from "next/link";
import { getService } from "@/lib/data/services";
import ServiceGallery from "@/modules/services/components/service-gallery";

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
detailsButtonLabel?: string;
  detailsButtonHref?: string;
  detailsButtonDisabled?: boolean;
  galleryImages?: string[];
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
  detailsButtonLabel: "Подробнее",
  detailsButtonHref: "/memorials",
  detailsButtonDisabled: false,
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
  detailsButtonLabel = DEFAULT_MEMORIALS.detailsButtonLabel,
  detailsButtonHref = DEFAULT_MEMORIALS.detailsButtonHref,
  detailsButtonDisabled = DEFAULT_MEMORIALS.detailsButtonDisabled,
  galleryImages = [],
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
              <Card
                key={`${feature.title}-${index}`}
                className="rounded-2xl py-4! md:py-6!"
              >
                <CardHeader className="px! md:px-6!">
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl flex flex-wrap items-center gap-3">
            <ContactModalTrigger size="lg" className="mt-6">
              {ctaLabel}
            </ContactModalTrigger>
            {detailsButtonLabel ? (
              detailsButtonDisabled ? (
                <span
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                      disabled: true,
                    }),
                    "mt-6 pointer-events-none",
                  )}
                  aria-disabled="true"
                >
                  {detailsButtonLabel}
                </span>
              ) : (
                <Link
                  href={detailsButtonHref}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                    }),
                    "mt-6",
                  )}
                >
                  {detailsButtonLabel}
                </Link>
              )
            ) : null}
          </div>
        </div>
      </div>
	  {/* НОВЫЙ БЛОК: Выводим галерею, только если фото существуют */}
      {galleryImages.length > 0 && (
        <div className="mt-16 md:mt-24 border-t border-border/40 pt-16">
          <ServiceGallery 
            images={galleryImages} 
            title="Производство памятников" // Это пойдет в alt="Производство памятников — фото 1"
            heading="Наше производство и работы" // А это заголовок
          />
        </div>
      )}
    </Section>
  );
}

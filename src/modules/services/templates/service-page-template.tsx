import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon-picker";
import { getService, listServices } from "@/lib/data/services";
import { getSiteSettings } from "@/lib/data/site-settings";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import ContactSection from "@/modules/contact/components/contact-section";
import { Check, CheckCircle2, Clock, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceGallery from "../components/service-gallery";

export default async function ServicePageTemplate({
  handle,
}: {
  handle: string;
}) {
  // 1. Получаем все данные из базы
  const service = await getService(handle);
  const settings = await getSiteSettings();
  const servicesData = await listServices({
    queryParams: { limit: 100 },
  });

  // 2. Проверяем наличие услуги ОДИН раз
  if (!service) {
    notFound();
  }

  // 3. Обработка телефона ОДИН раз
  const rawPhone = settings?.phone || "+73422777272";
  const cleanPhone = rawPhone.replace(/[^\d+]/g, "");

  // 4. Логика выбора 3-х похожих услуг
  const allServices = servicesData.response.data;
  const seed = handle
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const relatedServices = allServices
    .filter((s) => s.handle !== handle)
    .sort((a, b) => {
      const sortAlpha = (a.handle.charCodeAt(0) * seed) % 10;
      const sortBeta = (b.handle.charCodeAt(0) * seed) % 10;
      return sortAlpha - sortBeta;
    })
    .slice(0, 3);
  // Формируем динамический JSON-LD
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "Парус",
      url: "https://parus-ritual.ru",
      telephone: settings?.phone || "+7 (342) 277-72-72", // Из базы или запасной
      address: {
        "@type": "PostalAddress",
        streetAddress: settings?.address || "г. Пермь, Красноборская, 200", // Из базы или запасной
        addressLocality: "Пермь",
        addressCountry: "RU",
      },
    },
    image: service.thumbnail
      ? `https://parus-ritual.ru${service.thumbnail}`
      : undefined,
    offers: {
      "@type": "AggregateOffer",
      lowPrice:
        service.price === "Бесплатно"
          ? "0"
          : service.price.replace(/[^0-9]/g, ""),
      priceCurrency: "RUB",
      offerCount: "1",
    },
  };
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-6 flex-wrap sm:flex-nowrap">
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 size-14 shrink-0">
                {service.icon && (
                  <Icon
                    name={service.icon as IconName}
                    className="size-8 text-primary shrink-0"
                  />
                )}
              </div>
              <div>
                <h1 className="text-4xl font-medium text-foreground">
                  {service.title}
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {service.shortDescription}
                </p>
              </div>
            </div>

            <p
              className="text-muted-foreground leading-relaxed mb-8 [&_a]:underline [&_a]:text-primary"
              dangerouslySetInnerHTML={{
                __html: service.description ?? "",
              }}
            />

            <div className="flex flex-wrap gap-2 mb-8">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                {service.price}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {service.duration}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ContactModalTrigger
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Заказать услугу
              </ContactModalTrigger>
              <Link
                href={`tel:${cleanPhone}`}
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}
              >
                <Phone className="h-4 w-4 mr-2" />
                Позвонить сейчас
              </Link>
            </div>
          </div>

          <div className="relative bg-muted/20 rounded-xl overflow-hidden h-[220px] md:h-[320px] border border-border/40 w-full shadow-sm">
            <Image
              fill
              src={service.thumbnail || "/placeholder.svg"}
              alt={service.title}
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        </div>

        {/* Features and Included */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Что включает услуга
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />В стоимость входит
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Gallery */}
        {(() => {
          // ВРЕМЕННО: убираем фильтр, чтобы видеть ВСЕ фото в галерее
          // const galleryImages = service.images?.filter(img => img !== service.thumbnail) || [];

          // Пока иллюстрации не готовы, используем весь массив без исключений:
          const galleryImages = service.images || [];

          return (
            galleryImages.length > 0 && (
              <ServiceGallery images={galleryImages} title={service.title} />
            )
          );
        })()}
        {/* Блок: Смотрите также */}
        <div className="mb-20 mt-16 border-t pt-16">
          <div className="flex items-center justify-between mb-8">
            <p className="text-3xl font-medium text-foreground">
              Смотрите также
            </p>
            <Link
              href="/services"
              className="text-primary hover:underline font-medium"
            >
              Все услуги →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((item) => (
              <Link
                key={item.handle}
                href={`/services/${item.handle}`}
                className="group p-6 rounded-[24px] border border-border/60 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name={item.icon as IconName} className="size-6" />
                </div>
                <p className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {item.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <ContactSection />
      </div>
    </div>
  );
}

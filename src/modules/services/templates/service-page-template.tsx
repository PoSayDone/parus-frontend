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
import Breadcrumbs from "@/components/ui/breadcrumbs";

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
  ? service.thumbnail.startsWith('http') 
    ? service.thumbnail 
    : `https://parus-ritual.ru${service.thumbnail}`
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
  const breadcrumbs = [
  { label: "Услуги", href: "/services" },
  { label: service.title, href: `/services/${handle}` } // путь к текущей услуге для Schema.org
];
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="container mx-auto px-4 py-12">
	  <Breadcrumbs items={breadcrumbs} />
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
			  // Формируем умный alt: очищаем заголовок от города и добавляем " в Перми"
			  alt={`${service.title.replace(/\s*(в\s+)?(г\.\s+)?Перм[иь]\s*/gi, "").trim()} в Перми`}
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
  // 1. Берем массив всех картинок (если его нет, создаем пустой [])
  const allImages = service.images || [];
  
  // 2. Определяем, какая картинка у нас главная (thumbnail)
  const mainImage = service.thumbnail;

  // 3. Создаем новый массив для галереи, исключая из него главную картинку
  const filteredGallery = allImages.filter(img => img !== mainImage);

  // 4. Если после фильтрации не осталось ни одной картинки — выходим
  if (filteredGallery.length === 0) return null;

  // 5. Если картинки есть, рисуем блок с отступом (mt-16)
  return (
    <div className="mt-16 border-t pt-16">
       <ServiceGallery images={filteredGallery} title={service.title} />
    </div>
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
			  // h-[180px] делает карточку узкой, как ты и просила
			  className="group relative h-[180px] rounded-[20px] overflow-hidden border border-border/20 shadow-md transition-all duration-300 hover:shadow-lg"
			>
			  {/* 1. Фоновое изображение (без искажений) */}
			  <Image
				fill
				src={item.thumbnail || "/placeholder.svg"}
				alt={item.title} // Убрали "в Перми"
				className="object-cover transition-transform duration-500 group-hover:scale-105"
				sizes="(max-width: 768px) 100vw, 33vw"
			  />

			  {/* 2. Плотный градиент снизу для читаемости текста */}
			  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

			  {/* 3. Контент */}
			  <div className="absolute inset-0 p-5 flex flex-col justify-end">
				{/* Маленькая аккуратная иконка */}
				<div className="mb-2 p-1.5 rounded-full bg-white/10 backdrop-blur-md w-fit text-white border border-white/10">
				  <Icon name={item.icon as IconName} className="size-4" />
				</div>
				
				<p className="text-lg font-medium text-white leading-tight">
				  {item.title}
				</p>
				
				{/* Краткое описание скрыто по умолчанию, появляется при наведении (опционально) */}
				<p className="text-gray-300 text-xs line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				  {item.shortDescription}
				</p>
			  </div>
			</Link>
		  ))}
		</div>
         
        </div>
        <ContactSection />
      </div>
    </div>
  );
}

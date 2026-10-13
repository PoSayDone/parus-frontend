import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Navigation, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getCemeteryByHandle } from "@/lib/data/addresses";
import CemeteryMap from "@/modules/addresses/components/cemetery-map/cemetery-map-wrapper";
import ContactSection from "@/modules/contact/components/contact-section";
import { Suspense } from "react";
import ServicesCarousel from "@/modules/landing/components/services-carousel";
import CemeteryStatus from "@/modules/addresses/components/cemetery-status";
import {
	TypographyH1,
	TypographySectionSubtitle,
} from "@/components/typography";
import AutoContactPopup from "@/modules/contact/components/auto-contact-popup"; // автооткрытие формы

export const revalidate = 86400; // Кэшируем страницу на 24 часа
export default async function CemeteryPageTemplate({
	handle,
}: {
	handle: string;
}) {
	const cemetery = await getCemeteryByHandle(handle);

	if (!cemetery) {
		notFound();
	}

	const hasDocuments = (cemetery.cemeteryDocuments || []).length > 0;
	
	// Безопасно достаем координаты
	const lat = cemetery.cemeteryLat as number;
	const lng = cemetery.cemeteryLng as number;
	const hasCoords = typeof lat === "number" && typeof lng === "number";

	const images = cemetery.cemeteryImages || [];
	const hasImages = images.length > 0;
	const schemeImage = images.length > 1 ? images[1] : images[0];

	// Формируем ссылки для маршрутизаторов
	const yandexRouteUrl = hasCoords 
		? `https://yandex.ru/maps/?ll=${lng},${lat}&mode=routes&rtext=~${lat},${lng}&rtt=comparison&ruri=~&z=17` 
		: "#";
	
	const twogisRouteUrl = hasCoords 
		? `https://2gis.ru/perm/directions/points/|${lng}%2C${lat}` 
		: "#";

	// Данные для микроразметки хлебных крошек
	const SITE_URL = "https://parus-ritual.ru"; 
	const PARENT_PAGE_URL = `${SITE_URL}/addresses`;
	
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Похоронное бюро",
				"item": SITE_URL
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "Полезные адреса",
				"item": PARENT_PAGE_URL
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": `Кладбище «${cemetery.name}»`,
				"item": `${PARENT_PAGE_URL}/${handle}`
			}
		]
	};

	const phones = cemetery.phone || [];
	const mapTitle =
		hasCoords && hasImages
			? `Как добраться до кладбища «${cemetery.name}» (карта и схема)`
			: hasCoords
				? `Как добраться до кладбища «${cemetery.name}» (карта)`
				: `Схема участков кладбища «${cemetery.name}»`;

	return (
		<div className="page-pad min-h-[60vh]">
			{/* скрипт микроразметки BreadcrumbList */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			{/* Автоматическая форма помощи (безопасная обертка) */}
			<Suspense fallback={null}>
				<AutoContactPopup service={`Помощь по кладбищу: ${cemetery.name}`} />
			</Suspense>

			{/* Каждый прямой потомок — отдельный блок страницы */}
			<div className="page-blocks">
				{/* 1. Шапка: что это, где находится, как связаться */}
				<div className="container mx-auto px-4">
					<nav
						className="flex text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap"
						aria-label="Хлебные крошки"
					>
						<ol className="inline-flex items-center gap-x-2">
							<li>
								<Link href="/" className="hover:text-primary transition-colors">
									Главная
								</Link>
							</li>
							<li className="flex items-center gap-x-2">
								<ChevronRight className="size-4 opacity-50" aria-hidden />
								<Link
									href="/addresses"
									className="hover:text-primary transition-colors"
								>
									Полезные адреса
								</Link>
							</li>
							<li className="flex items-center gap-x-2">
								<ChevronRight className="size-4 opacity-50" aria-hidden />
								<span className="text-foreground font-medium" aria-current="page">
									{cemetery.name}
								</span>
							</li>
						</ol>
					</nav>

					<header className="page-header flex flex-col items-start gap-4">
						<Badge variant="secondary">Кладбище</Badge>
						<TypographyH1>{cemetery.name}</TypographyH1>
						{cemetery.description && (
							<TypographySectionSubtitle className="whitespace-pre-line">
								{cemetery.description}
							</TypographySectionSubtitle>
						)}
					</header>

					{/* Справочные данные одной строкой: то, за чем сюда приходят */}
					<dl className="grid grid-cols-1 gap-x-8 gap-y-6 border-y py-6 sm:grid-cols-2 lg:grid-cols-4">
						{cemetery.address && (
							<div>
								<dt className="text-sm text-muted-foreground">Адрес</dt>
								<dd className="mt-1 text-lg leading-snug">{cemetery.address}</dd>
							</div>
						)}
						{cemetery.district && (
							<div>
								<dt className="text-sm text-muted-foreground">Район</dt>
								<dd className="mt-1 text-lg leading-snug">{cemetery.district}</dd>
							</div>
						)}
						{phones.length > 0 && (
							<div>
								<dt className="text-sm text-muted-foreground">Телефон</dt>
								<dd className="mt-1 flex flex-col text-lg leading-snug">
									{phones.map((phone) => (
										<a
											key={phone}
											href={`tel:${phone.replace(/[^\d+]/g, "")}`}
											className="w-fit hover:text-primary hover:underline underline-offset-4"
										>
											{phone}
										</a>
									))}
								</dd>
							</div>
						)}
						{cemetery.schedule && (
							<div>
								<dt className="text-sm text-muted-foreground">Режим работы</dt>
								<dd className="mt-1 text-lg leading-snug whitespace-pre-line">
									{cemetery.schedule}
								</dd>
							</div>
						)}
					</dl>

					{(cemetery.cemeteryStatus || hasDocuments) && (
						<div className="mt-8 grid grid-cols-1 gap-4 lg:mt-12 lg:grid-cols-2">
							{cemetery.cemeteryStatus && (
								<Card>
									<CardHeader className="flex flex-row items-start justify-between gap-4">
										<CardTitle>
											<h2>Статус захоронений на сегодня</h2>
										</CardTitle>
										<CemeteryStatus note={cemetery.cemeteryStatus} />
									</CardHeader>
									<CardContent>
										<p className="leading-relaxed whitespace-pre-line">
											{cemetery.cemeteryStatus}
										</p>
									</CardContent>
								</Card>
							)}

							{hasDocuments && (
								<Card>
									<CardHeader>
										<CardTitle>
											<h2>Необходимые документы для захоронения</h2>
										</CardTitle>
										{cemetery.cemeteryNote && (
											<CardDescription>{cemetery.cemeteryNote}</CardDescription>
										)}
									</CardHeader>
									<CardContent>
										<ul className="space-y-2">
											{(cemetery.cemeteryDocuments || []).map((item, index) => (
												<li
													key={`${item}-${index}`}
													className="flex items-start gap-3"
												>
													<Check
														className="size-5 shrink-0 mt-0.5 text-primary"
														aria-hidden
													/>
													<span>{item}</span>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							)}
						</div>
					)}
				</div>

				{/* 2. Карта, маршруты и схема */}
				{(hasCoords || hasImages) && (
					<div className="container mx-auto px-4">
						<h2 className="block-title">{mapTitle}</h2>

						<div
							className={`grid grid-cols-1 gap-4 ${hasCoords && hasImages ? "lg:grid-cols-2" : ""}`}
						>
							{hasCoords && (
								<div className="relative h-[300px] md:h-[420px] rounded-3xl overflow-hidden border">
									<CemeteryMap coords={[lat, lng]} />
								</div>
							)}

							{hasImages && (
								<a
									href={schemeImage}
									target="_blank"
									rel="noopener noreferrer"
									className={`relative h-[300px] md:h-[420px] rounded-3xl overflow-hidden border bg-card block group ${!hasCoords ? "lg:w-1/2" : ""}`}
									title="Нажмите, чтобы увеличить схему"
								>
									<Image
										src={schemeImage}
										alt={`Схема кладбища ${cemetery.name}`}
										fill
										unoptimized={true}
										className="object-contain p-2"
										sizes="(max-width: 768px) 100vw, 50vw"
									/>
									<span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium transition-colors group-hover:border-primary/40">
										<ZoomIn className="size-4 text-primary" aria-hidden />
										Увеличить схему
									</span>
								</a>
							)}
						</div>

						{hasCoords && (
							<div className="mt-4 flex flex-wrap gap-2">
								<a
									href={yandexRouteUrl}
									target="_blank"
									rel="noopener noreferrer"
									className={buttonVariants({ variant: "outline" })}
								>
									<Navigation className="text-primary" aria-hidden />
									Маршрут в Яндекс.Картах
								</a>
								<a
									href={twogisRouteUrl}
									target="_blank"
									rel="noopener noreferrer"
									className={buttonVariants({ variant: "outline" })}
								>
									<Navigation className="text-primary" aria-hidden />
									Маршрут в 2ГИС
								</a>
							</div>
						)}
					</div>
				)}

				{/* 3. Услуги агентства: карусель идёт от края до края экрана */}
				<div>
					<div className="container mx-auto px-4">
						<h2 className="block-title mb-4!">Ритуальные услуги агентства «Парус»</h2>
						<p className="mb-6 max-w-3xl text-lg text-muted-foreground text-pretty lg:mb-8">
							Ритуальное агентство «Парус» предлагает комплексные ритуальные услуги в Перми.
							Мы берем на себя все организационные вопросы, обеспечивая достойные проводы
							и профессиональную поддержку на каждом этапе.
						</p>
					</div>
					<ServicesCarousel />
				</div>

				{/* 4. Обращение за помощью */}
				<div className="container mx-auto px-4">
					<ContactSection
						title={`Нужна помощь в организации ритуальных услуг на кладбище «${cemetery.name}»?`}
						description="Специалисты агентства «Парус» проконсультируют вас по вопросам захоронения, помогут подготовить документы и возьмут на себя благоустройство участка. Мы работаем круглосуточно."
						buttonText="Получить консультацию"
					/>
				</div>
			</div>
		</div>
	);
}

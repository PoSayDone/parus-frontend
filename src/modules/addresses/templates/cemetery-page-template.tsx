import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, MapPin, Phone, Navigation, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCemeteryByHandle } from "@/lib/data/addresses";
import CemeteryMap from "@/modules/addresses/components/cemetery-map";
import ContactSection from "@/modules/contact/components/contact-section";
import { Suspense } from "react";
import ServicesCarousel from "@/modules/landing/components/services-carousel";
import SectionHeading from "@/components/ui/section-heading";
import AutoContactPopup from "@/modules/contact/components/auto-contact-popup"; // автооткрытие формы

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

	

	return (
		<div className="min-h-screen bg-background">
		{/* Автоматическая форма помощи через 40 секунд (безопасная обертка) */}
			<Suspense fallback={null}>
				<AutoContactPopup service={`Помощь по кладбищу: ${cemetery.name}`} />
			</Suspense>
			<div className="container mx-auto px-4 py-12 relative overflow-hidden">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
					<div>
						<div className="mb-6">
							<h1 className="text-4xl font-medium text-foreground flex flex-wrap items-center gap-4">
								{cemetery.name}{" "}
								<Badge variant="secondary">кладбище</Badge>
							</h1>
							
						</div>
						<div className="flex flex-wrap gap-3">
								{cemetery.address && (
									<div className="flex items-start gap-3">
										<MapPin className="h-5 w-5 text-primary mt-0.5" />
										<span>{cemetery.address}</span>
									</div>
								)}
								{cemetery.district && (
									<Badge variant="outline">
										{cemetery.district}
									</Badge>
								)}
							</div>
						
						
					</div>

					
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
					{cemetery.cemeteryStatus && (
						<Card className="gap-3">
							<CardHeader>
								<CardTitle>Статус захоронений</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground leading-relaxed whitespace-pre-line">
									{cemetery.cemeteryStatus}
								</p>
							</CardContent>
						</Card>
					)}

					{hasDocuments && (
						<Card className="gap-3">
							<CardHeader className="flex flex-row flex-wrap items-center gap-2 min-w-0">
								<CardTitle>Документы для захоронения</CardTitle>
								{cemetery.cemeteryNote && (
									<Badge className="max-w-full h-auto whitespace-normal text-left leading-tight py-1 px-3">
										{cemetery.cemeteryNote}
									</Badge>
								)}
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									{(cemetery.cemeteryDocuments || []).map(
										(item, index) => (
											<li
												key={`${item}-${index}`}
												className="text-muted-foreground leading-relaxed"
											>
												{item}
											</li>
										),
									)}
								</ul>
							</CardContent>
						</Card>
					)}
				</div>
				
				{/* 3. БЛОК О КОМПАНИИ И УСЛУГИ */}
				<div className="mb-20">
					<p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-none">
						Ритуальное агентство «Парус» предлагает комплексные ритуальные услуги в Перми. 
						Мы берем на себя все организационные вопросы, обеспечивая достойные проводы 
						и профессиональную поддержку на каждом этапе.
					</p>
					
					<ServicesCarousel />
				</div>

				{/* БЛОК КАРТЫ, МАРШРУТОВ И СХЕМЫ */}
				{(hasCoords || hasImages) && (
					<div className="mb-12">
						{/* Динамический заголовок */}
						<p className="text-2xl font-medium text-foreground mb-6">
							{hasCoords && hasImages 
								? `Кладбище «${cemetery.name}»: расположение на карте и схема` 
								: hasCoords 
									? `Кладбище «${cemetery.name}»: расположение на карте` 
									: `Кладбище «${cemetery.name}»: схема участков`}
						</p>
						
						<div className="space-y-3 text-muted-foreground mb-8">
							{cemetery.phone?.length ? (
								<div className="flex items-start gap-3">
									<Phone className="h-5 w-5 text-primary mt-0.5" />
									<span>{cemetery.phone.join(", ")}</span>
								</div>
							) : null}
							{cemetery.schedule && (
								<div className="flex items-start gap-3">
									<Clock className="h-5 w-5 text-primary mt-0.5" />
									<span>{cemetery.schedule}</span>
								</div>
							)}
						</div>

						{/* Сетка: слева карта, справа схема (если есть карта) */}
						<div className={`grid grid-cols-1 ${hasCoords && hasImages ? 'lg:grid-cols-2' : ''} gap-8`}>
							
							{/* Интерактивная карта и кнопки */}
							{hasCoords && (
								<div className="flex flex-col gap-4">
									<div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-border/50">
										{/* Возвращаем исходную прямую передачу координат из базы */}
										<CemeteryMap 
											coords={[
												cemetery.cemeteryLat as number, 
												cemetery.cemeteryLng as number
											]} 
										/>
									</div>
									
									
									
									<div className="flex flex-wrap gap-3 mt-2">
										<a 
											href={yandexRouteUrl} 
											target="_blank" 
											rel="noopener noreferrer" 
											className={buttonVariants({ variant: "outline", size: "lg" })}
										>
											<Navigation className="w-4 h-4 mr-2 text-primary" />
											Маршрут в Яндекс.Картах
										</a>
										<a 
											href={twogisRouteUrl} 
											target="_blank" 
											rel="noopener noreferrer" 
											className={buttonVariants({ variant: "outline", size: "lg" })}
										>
											<Navigation className="w-4 h-4 mr-2 text-primary" />
											Маршрут в 2ГИС
										</a>
									</div>
								</div>
							)}

							{/* Схема кладбища (фото) */}
							{hasImages && (
								<div className={`flex flex-col gap-4 ${!hasCoords ? 'lg:w-1/2' : ''}`}>
									{/* Делаем картинку кликабельной ссылкой */}
									<a 
										href={schemeImage}
										target="_blank"
										rel="noopener noreferrer"
										className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-border/50 bg-muted/20 block group cursor-pointer"
										title="Нажмите, чтобы увеличить схему"
									>
										<Image
											src={schemeImage}
											alt={`Схема кладбища ${cemetery.name}`}
											fill
											priority 
											className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
										{/* Красивый оверлей с лупой при наведении */}
										<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
											<div className="bg-background/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
												<ZoomIn className="w-4 h-4 text-primary" />
												<span className="font-medium text-sm">Увеличить</span>
											</div>
										</div>
									</a>
									
								</div>
							)}

						</div>
					</div>
				)}
				
				{cemetery.description && (
							<p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
								{cemetery.description}
							</p>
						)}
				<ContactSection 
				  title={`Нужна помощь в организации ритуальных услуг на кладбище «${cemetery.name}»?`}
				  description="Специалисты агентства «Парус» проконсультируют вас по вопросам захоронения, помогут подготовить документы и возьмут на себя благоустройство участка. Мы работаем круглосуточно."
				  buttonText="Получить консультацию"
				/>
			</div>
		</div>
	);
}

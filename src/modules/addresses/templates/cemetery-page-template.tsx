import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCemeteryByHandle } from "@/lib/data/addresses";
import CemeteryMap from "@/modules/addresses/components/cemetery-map";
import ContactSection from "@/modules/contact/components/contact-section";
import ServicesCarousel from "@/modules/landing/components/services-carousel";
import SectionHeading from "@/components/ui/section-heading";

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
	const hasCoords =
		typeof cemetery.cemeteryLat === "number" &&
		typeof cemetery.cemeteryLng === "number";

	return (
		<div className="min-h-screen bg-background">
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
									<Badge className="max-w-full truncate">
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

				{hasCoords && (
					<div className="mb-12">
						<p className="text-2xl font-medium text-foreground mb-6">
							Расположение на карте
						</p>
						<div className="space-y-3 text-muted-foreground mb-8">
							
							{cemetery.phone?.length ? (
								<div className="flex items-start gap-3">
									<Phone className="h-5 w-5 text-primary mt-0.5" />
									<span>
										{cemetery.phone.join(", ")}
									</span>
								</div>
							) : null}
							{cemetery.schedule && (
								<div className="flex items-start gap-3">
									<Clock className="h-5 w-5 text-primary mt-0.5" />
									<span>{cemetery.schedule}</span>
								</div>
							)}
						</div>
						<CemeteryMap
							coords={[
								cemetery.cemeteryLat as number,
								cemetery.cemeteryLng as number,
							]}
						/>
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

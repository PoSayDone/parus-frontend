"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Star, Phone, Clock, Check, CheckCircle2 } from "lucide-react";
import { getServiceBySlug } from "@/lib/data/services";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import ContactSection from "@/modules/contact/components/contact-section";

export default function ServicePageTemplate({ slug }: { slug: string }) {
	const service = getServiceBySlug(slug);

	if (!service) {
		notFound();
	}

	const IconComponent = service.icon;

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-12">
				{/* Hero Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
					<div>
						<div className="flex items-center gap-4 mb-6">
							<div className="p-3 rounded-full bg-primary/10">
								<IconComponent className="h-8 w-8 text-primary" />
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

						<p className="text-muted-foreground leading-relaxed mb-8">
							{service.description}
						</p>

						<div className="flex flex-wrap gap-4 mb-8">
							<Badge
								variant="secondary"
								className="flex items-center gap-2"
							>
								<Star className="h-4 w-4" />
								{service.price}
							</Badge>
							<Badge
								variant="outline"
								className="flex items-center gap-2"
							>
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
								href="tel:+7-800-000-00-00"
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

					<div className="relative">
						<img
							src={service.image || "/placeholder.svg"}
							alt={service.title}
							className="w-full h-96 object-cover rounded-lg shadow-lg"
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
									<li
										key={index}
										className="flex items-start gap-3"
									>
										<Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
										<span className="text-muted-foreground">
											{feature}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Star className="h-5 w-5 text-primary" />В
								стоимость входит
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-3">
								{service.included.map((item, index) => (
									<li
										key={index}
										className="flex items-start gap-3"
									>
										<Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
										<span className="text-muted-foreground">
											{item}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>

				{/* Gallery */}
				<div className="mb-12">
					<h2 className="text-2xl font-medium text-foreground mb-6">
						Фотогалерея
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{service.gallery.map((image, index) => (
							<div key={index} className="relative group">
								<img
									src={image || "/placeholder.svg"}
									alt={`${service.title} - фото ${index + 1}`}
									className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
								/>
							</div>
						))}
					</div>
				</div>

				<ContactSection />
			</div>
		</div>
	);
}

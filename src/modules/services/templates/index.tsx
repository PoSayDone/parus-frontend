import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { servicesData } from "@/lib/data/services";
import ContactSection from "@/modules/contact/components/contact-section";

export default function ServicesTemplate() {
	const services = Object.values(servicesData);

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 md:px-8 py-12">
				<div className="text-center mb-12">
					<h1 className="text-4xl mb-4">Наши услуги</h1>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						Мы предоставляем полный спектр ритуальных услуг с
						заботой и пониманием. Наша команда профессионалов
						поможет вам в трудную минуту, взяв на себя все
						организационные вопросы и обеспечив достойное прощание с
						вашими близкими.
					</p>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
					{services.map((service) => {
						const IconComponent = service.icon;
						return (
							<Card
								key={service.id}
								className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20"
							>
								<CardHeader className="text-start">
									<div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 size-14">
										<IconComponent className="h-8 w-8 text-primary" />
									</div>
									<CardTitle className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
										{service.title}
									</CardTitle>
									<CardDescription className="text-muted-foreground mb-2 leading-relaxed">
										{service.shortDescription}
									</CardDescription>
								</CardHeader>
								<CardFooter className="mt-auto">
									<Link
										className={buttonVariants({
											variant: "secondary",
											className: "w-full",
										})}
										href={`/services/${service.id}`}
									>
										Подробнее
									</Link>
								</CardFooter>
							</Card>
						);
					})}
				</div>

				<ContactSection
					title="Нужна консультация?"
					description={`
						Наши специалисты готовы ответить на все ваши вопросы и
						помочь выбрать подходящие услуги. Мы работаем
						круглосуточно и всегда готовы прийти на помощь.
					`}
				/>
			</div>
		</div>
	);
}

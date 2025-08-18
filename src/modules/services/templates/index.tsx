import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Heart,
	Flower2,
	Car,
	Home,
	Users,
	FileText,
	Crown,
	Sparkles,
} from "lucide-react";
import Link from "next/link";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";

const services = [
	{
		id: "funeral-organization",
		title: "Организация похорон",
		description:
			"Полный комплекс услуг по организации похорон с соблюдением всех традиций и пожеланий семьи",
		icon: Heart,
		href: "/services/funeral-organization",
	},
	{
		id: "ritual-goods",
		title: "Ритуальные товары",
		description:
			"Широкий ассортимент качественных ритуальных принадлежностей, венков, цветов и памятных изделий",
		icon: Flower2,
		href: "/services/ritual-goods",
	},
	{
		id: "transportation",
		title: "Транспортные услуги",
		description:
			"Специализированный транспорт для перевозки и сопровождения с соблюдением всех требований",
		icon: Car,
		href: "/services/transportation",
	},
	{
		id: "funeral-hall",
		title: "Прощальный зал",
		description:
			"Уютные залы для проведения церемонии прощания в спокойной и торжественной обстановке",
		icon: Home,
		href: "/services/funeral-hall",
	},
	{
		id: "memorial-services",
		title: "Поминальные услуги",
		description:
			"Организация поминальных обедов и мероприятий в память о близких людях",
		icon: Users,
		href: "/services/memorial-services",
	},
	{
		id: "documents",
		title: "Оформление",
		description:
			"Помощь в оформлении всех необходимых документов и справок в государственных органах",
		icon: FileText,
		href: "/services/documents",
	},
	{
		id: "monuments",
		title: "Памятники и надгробия",
		description:
			"Изготовление и установка памятников, надгробий и мемориальных комплексов",
		icon: Crown,
		href: "/services/monuments",
	},
	{
		id: "cremation",
		title: "Кремационные услуги",
		description:
			"Организация кремации с соблюдением всех процедур и предоставлением необходимых услуг",
		icon: Sparkles,
		href: "/services/cremation",
	},
];

export default function ServicesTemplate() {
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
								<CardHeader className="text-center">
									<div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
										<IconComponent className="h-8 w-8 text-primary" />
									</div>
									<CardTitle className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
										{service.title}
									</CardTitle>
									<CardDescription className="text-muted-foreground mb-2 leading-relaxed">
										{service.description}
									</CardDescription>
								</CardHeader>
								<CardFooter className="mt-auto">
									<Button
										variant="secondary"
										className="w-full"
									>
										<Link href={service.href}>
											Подробнее
										</Link>
									</Button>
								</CardFooter>
							</Card>
						);
					})}
				</div>

				{/* Contact Section */}
				<div className="bg-muted/50 rounded-[32px] p-8 text-center">
					<h2 className="text-2xl font-semibold text-foreground mb-4">
						Нужна консультация?
					</h2>
					<p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
						Наши специалисты готовы ответить на все ваши вопросы и
						помочь выбрать подходящие услуги. Мы работаем
						круглосуточно и всегда готовы прийти на помощь.
					</p>
					<div className="flex flex-col sm:flex-row gap-2 justify-center">
						<ContactModalTrigger
							size="lg"
							className="bg-primary hover:bg-primary/90"
						>
							Связаться с нами
						</ContactModalTrigger>
						<Button variant="outline" size="lg">
							<Link href="tel:+7-800-000-00-00">
								Позвонить сейчас
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

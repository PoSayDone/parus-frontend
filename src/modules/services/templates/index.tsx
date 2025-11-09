import ContactSection from "@/modules/contact/components/contact-section";
import ServicesList from "../components/services-list";

export default function ServicesTemplate() {
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 md:px-8 py-12">
				<div className="text-center mb-12">
					<h1 className="text-3xl md:text-4xl mb-4">Наши услуги</h1>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						Мы предоставляем полный спектр ритуальных услуг с
						заботой и пониманием. Наша команда профессионалов
						поможет вам в трудную минуту, взяв на себя все
						организационные вопросы и обеспечив достойное прощание с
						вашими близкими.
					</p>
				</div>

				<ServicesList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8" />

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

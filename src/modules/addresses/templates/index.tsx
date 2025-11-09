import ContactSection from "@/modules/contact/components/contact-section";
import AddressesList from "../components/addresses-list";

export default function AddressesTemplate() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 md:px-8 py-12">
				<div className="text-center mb-12">
					<h1 className="text-3xl md:text-4xl mb-4">
						Полезные адреса в Перми
					</h1>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						На этой странице собраны важные адреса и контактная
						информация городских учреждений Перми — ЗАГСов, моргов и
						кладбищ. Эти данные помогут вам быстро найти нужное
						место и уточнить время работы.
					</p>
				</div>

				<AddressesList />

				<ContactSection
					title="Нужна консультация?"
					description={`
			            Наши специалисты готовы ответить на все ваши вопросы и
			            помочь в организации ритуальных услуг. Мы работаем
			            круглосуточно и всегда готовы прийти на помощь.
			          `}
				/>
			</div>
		</div>
	);
}

import { Suspense } from "react";
import ContactSection from "@/modules/contact/components/contact-section";
import SkeletonPricesList from "@/modules/skeletons/templates/skeleton-prices-grid";
import PricesList from "../components/prices-list";

export default function PricesTemplate() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 md:px-8 py-12">
				{/* Header Section */}
				<div className="text-center mb-12">
					<h1 className="text-3xl md:text-4xl mb-4">
						Цены на услуги
					</h1>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						Мы предлагаем различные пакеты услуг, чтобы каждая семья
						могла выбрать подходящий вариант. Все цены указаны
						ориентировочно и могут корректироваться в зависимости от
						ваших пожеланий и требований.
					</p>
				</div>

				<Suspense fallback={<SkeletonPricesList />}>
					<PricesList />
				</Suspense>

				{/* Additional Services Section */}
				<div className="bg-muted/50 rounded-[32px] p-8 mb-8 md:pb-16 mt-12">
					<h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
						Дополнительные услуги
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="text-center">
							<h3 className="font-semibold text-foreground mb-2">
								Кремация
							</h3>
							<p className="text-muted-foreground text-sm mb-2">
								Организация кремации с урной
							</p>
							<span className="text-primary font-medium">
								от 25 000 ₽
							</span>
						</div>
						<div className="text-center">
							<h3 className="font-semibold text-foreground mb-2">
								Отпевание
							</h3>
							<p className="text-muted-foreground text-sm mb-2">
								Религиозная церемония
							</p>
							<span className="text-primary font-medium">
								от 8 000 ₽
							</span>
						</div>
						<div className="text-center">
							<h3 className="font-semibold text-foreground mb-2">
								Бальзамирование
							</h3>
							<p className="text-muted-foreground text-sm mb-2">
								Подготовка тела
							</p>
							<span className="text-primary font-medium">
								от 15 000 ₽
							</span>
						</div>
					</div>
				</div>

				<ContactSection
					title="Индивидуальный расчет"
					description={`
						Каждая ситуация уникальна. Мы готовы составить
						индивидуальное предложение с учетом всех ваших пожеланий
						и финансовых возможностей. Консультация и выезд
						специалиста бесплатны.
					`}
				/>
			</div>
		</div>
	);
}

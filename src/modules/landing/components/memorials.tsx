import Section from "@/components/ui/section";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import { MemorialsGrid } from "./memorials-grid";

export default function Memorials() {
	return (
		<Section
			title="Изготовление памятников"
			subtitle={
				<>
					Наша собственная мастерская по изготовлению памятников
					поможет Вам в изготовлении уникального надгробия
				</>
			}
			id={"memorials"}
		>
			<div className="container mx-auto">
				<div className="grid lg:grid-cols-2 gap-12 items-start relative">
					<div className="order-1 relative rounded-3xl overflow-clip max-h-[700px] min-w-0">
						<MemorialsGrid />
					</div>
					<div className="order-2 sticky top-19">
						<div className="space-y-6 text-left">
							<div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="p-6 bg-card rounded-2xl">
										<h4 className="font-medium text-foreground mb-2">
											Индивидуальный дизайн
										</h4>
										<p className="text-sm text-card-foreground">
											Создание уникальных проектов по
											вашим пожеланиям
										</p>
									</div>
									<div className="p-6 bg-card rounded-2xl">
										<h4 className="font-medium text-foreground mb-2">
											Портретная гравировка
										</h4>
										<p className="text-sm text-card-foreground">
											Высококачественная гравировка
											портретов
										</p>
									</div>
									<div className="p-6 bg-card rounded-2xl">
										<h4 className="font-medium text-foreground mb-2">
											Установка
										</h4>
										<p className="text-sm text-card-foreground">
											Профессиональная установка на
											кладбище
										</p>
									</div>
									<div className="p-6 bg-card rounded-2xl flex items-start gap-3">
										<div>
											<h4 className="font-medium text-foreground mb-2">
												Документооборот
											</h4>
											<p className="text-sm text-card-foreground">
												Оформление всех необходимых
												документов
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="px-4 md:px-0">
								<p>
									Наша мастерская специализируется на
									изготовлении памятников из
									высококачественных материалов. Мы работаем с
									гранитом, мрамором и другими натуральными
									камнями, создавая долговечные и красивые
									мемориалы.
								</p>

								<ContactModalTrigger size="lg" className="mt-6">
									Заказать памятник
								</ContactModalTrigger>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}

import Section from "@/components/ui/section";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import { MemorialsGrid } from "./memorials-grid";

type MemorialsProps = {
	title?: string;
	subtitle?: string;
	features?: {
		title: string;
		description: string;
	}[];
	paragraph?: string;
	ctaLabel?: string;
};

const DEFAULT_MEMORIALS = {
	title: "Изготовление памятников",
	subtitle:
		"Наша собственная мастерская по изготовлению памятников поможет Вам в изготовлении уникального надгробия",
	features: [
		{
			title: "Индивидуальный дизайн",
			description: "Создание уникальных проектов по вашим пожеланиям",
		},
		{
			title: "Портретная гравировка",
			description: "Высококачественная гравировка портретов",
		},
		{
			title: "Установка",
			description: "Профессиональная установка на кладбище",
		},
		{
			title: "Документооборот",
			description: "Оформление всех необходимых документов",
		},
	],
	paragraph:
		"Наша мастерская специализируется на изготовлении памятников из высококачественных материалов. Мы работаем с гранитом, мрамором и другими натуральными камнями, создавая долговечные и красивые мемориалы.",
	ctaLabel: "Заказать памятник",
};

export default function Memorials({
	title = DEFAULT_MEMORIALS.title,
	subtitle = DEFAULT_MEMORIALS.subtitle,
	features = DEFAULT_MEMORIALS.features,
	paragraph = DEFAULT_MEMORIALS.paragraph,
	ctaLabel = DEFAULT_MEMORIALS.ctaLabel,
}: MemorialsProps) {
	return (
		<Section
			title={title}
			subtitle={<span className="whitespace-pre-line">{subtitle}</span>}
			id={"memorials"}
		>
			<div className="container mx-auto">
				<div className="grid lg:grid-cols-2 gap-12 items-start relative">
					<div className="order-1 relative rounded-3xl overflow-clip max-h-175 min-w-0">
						<MemorialsGrid />
					</div>
					<div className="order-2 sticky top-19">
						<div className="space-y-6 text-left">
							<div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{(features || []).map((feature, index) => (
										<div
											key={`${feature.title}-${index}`}
											className="p-6 bg-card rounded-2xl"
										>
											<h4 className="font-medium text-foreground mb-2">
												{feature.title}
											</h4>
											<p className="text-sm text-card-foreground">
												{feature.description}
											</p>
										</div>
									))}
								</div>
							</div>

							<div className="px-4 md:px-0">
								<p className="whitespace-pre-line">
									{paragraph}
								</p>

								<ContactModalTrigger size="lg" className="mt-6">
									{ctaLabel}
								</ContactModalTrigger>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}

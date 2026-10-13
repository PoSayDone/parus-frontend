import { Phone } from "lucide-react";
import ContactModalTrigger from "./contact-modal-trigger";
import { buttonVariants } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/data/site-settings";

export default async function ContactSection({
	title = "Готовы заказать услугу?",
	description = `
	Свяжитесь с нами для получения подробной консультации и
	оформления заказа. Мы работаем круглосуточно и готовы помочь в
	любое время.
	`,
	buttonText = "Заказать услугу", // Добавили новый проп с дефолтным значением
}: {
	title?: string;
	description?: string;
	buttonText?: string; // тип
}) {
	const settings = await getSiteSettings();
	
	// Подготавливаем номер: чистый для ссылки и красивый для текста
	const rawPhone = settings?.phone || "+7 (342) 277-72-72";
	const cleanPhone = rawPhone.replace(/[^\d+]/g, "");
	return (
		<div className="flex flex-col gap-6 rounded-3xl bg-secondary-container p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
			<div>
				<p className="text-2xl lg:text-3xl font-medium leading-tight mb-2">
					{title}
				</p>
				<p className="text-on-secondary-container max-w-2xl text-pretty">
					{description}
				</p>
			</div>
			<div className="flex flex-col sm:flex-row gap-3 shrink-0">
				<ContactModalTrigger size="lg">
					{buttonText} 
				</ContactModalTrigger>
				<a
					href={`tel:${cleanPhone}`}
					className={buttonVariants({
						variant: "outline",
						size: "lg",
					})}
				>
					<Phone />
					Позвонить сейчас
				</a>
			</div>
		</div>
	);
}

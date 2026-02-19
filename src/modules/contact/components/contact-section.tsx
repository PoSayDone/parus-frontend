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
}: {
	title?: string;
	description?: string;
}) {
	const settings = await getSiteSettings();
	
	// Подготавливаем номер: чистый для ссылки и красивый для текста
	const rawPhone = settings?.phone || "+7 (342) 277-72-72";
	const cleanPhone = rawPhone.replace(/[^\d+]/g, "");
	return (
		<div className="bg-muted/50 rounded-[32px] p-8 text-center">
			<p className="text-2xl font-medium text-foreground mb-4">
				{title}
			</p>
			<p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
				{description}
			</p>
			<div className="flex flex-col sm:flex-row gap-4 justify-center">
				<ContactModalTrigger
					size="lg"
					className="bg-primary hover:bg-primary/90"
				>
					Заказать услугу
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

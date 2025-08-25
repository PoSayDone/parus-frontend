import { Link, Phone } from "lucide-react";
import ContactModalTrigger from "./contact-modal-trigger";
import { buttonVariants } from "@/components/ui/button";

export default function ContactSection({
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
	return (
		<div className="bg-muted/50 rounded-[32px] p-8 text-center">
			<h2 className="text-2xl font-medium text-foreground mb-4">
				{title}
			</h2>
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
					href="tel:+7-800-000-00-00"
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

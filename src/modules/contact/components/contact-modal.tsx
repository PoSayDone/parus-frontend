"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import LabelInput from "@/components/ui/floating-input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { createContactRequest } from "@/lib/data/contact-requests";
import FloatingTextarea from "@/components/ui/floating-textarea";

const contactFormSchema = z.object({
	name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
	phone: z
		.string()
		.min(10, "Введите корректный номер телефона")
		.regex(/^[+]?[0-9\s\-$$$$]+$/, "Некорректный формат телефона"),
	email: z
		.string()
		.email("Введите корректный email")
		.optional()
		.or(z.literal("")),
	service: z.string().optional(),
	plan: z.string().optional(),
	message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedService?: string;
	selectedPlan?: string;
	settings: {
		phone: string;
		email: string;
		address: string;
		footerNote: string;
	};
}

export default function ContactModal({
	open,
	onOpenChange,
	selectedService,
	selectedPlan,
	settings,
}: ContactModalProps) {
	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			phone: "",
			email: "",
			service: selectedService || "",
			plan: selectedPlan || "",
			message: "",
		},
	});

	const addressLines = useMemo(
		() => settings.address.split("\n"),
		[settings.address],
	);

	const onSubmit = async (data: ContactFormData) => {
		try {
			await createContactRequest({
				name: data.name,
				phone: data.phone,
				email: data.email,
				service: data.service,
				plan: data.plan,
				message: data.message,
			});
			toast.success("Заявка отправлена");
			onOpenChange(false);
			form.reset();
		} catch (error) {
			console.error("Error submitting contact request:", error);
			toast.error("Не удалось отправить заявку");
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto px-0">
				<DialogHeader className="px-6">
					<DialogTitle className="text-2xl font-medium">
						Обратная связь
					</DialogTitle>
					<DialogDescription className="text-muted-foreground">
						Оставьте ваши контактные данные, и наш специалист
						свяжется с вами в течение 15 минут
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4 px-6"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<LabelInput
											label="Имя *"
											placeholder="Ваше имя"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<LabelInput
											label="Телефон *"
											type="tel"
											placeholder="+7 (___) ___-__-__"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<LabelInput
											label="Email"
											type="email"
											placeholder="your@email.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<FloatingTextarea
											label="Сообщение"
											placeholder="Расскажите подробнее о ваших потребностях..."
											rows={3}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex flex-col sm:flex-row gap-3 pt-4">
							<Button
								type="submit"
								className="flex-1"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting
									? "Отправка..."
									: "Отправить заявку"}
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={() => onOpenChange(false)}
							>
								Отмена
							</Button>
						</div>
					</form>
				</Form>

				<Separator className="my-2" />

				<div className="px-6">
					<h4 className="font-medium mb-3">
						Или свяжитесь с нами напрямую:
					</h4>
					<div className="space-y-2 text-sm">
						<div className="flex items-center gap-2">
							<Phone className="h-4 w-4 text-primary" />
							<a
								href={`tel:${settings.phone}`}
								className="text-primary hover:underline"
							>
								{settings.phone}
							</a>
						</div>
						<div className="flex items-center gap-2">
							<Mail className="h-4 w-4 text-primary" />
							<a
								href={`mailto:${settings.email}`}
								className="text-primary hover:underline"
							>
								{settings.email}
							</a>
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="h-4 w-4 text-primary" />
							<span className="text-muted-foreground">
								{addressLines.map((line, index) => (
									<span key={`${line}-${index}`}>
										{line}
										{index < addressLines.length - 1 && (
											<br />
										)}
									</span>
								))}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4 text-primary" />
							<span className="text-muted-foreground">
								Круглосуточно, без выходных
							</span>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

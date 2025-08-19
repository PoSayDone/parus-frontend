"use client";

import type React from "react";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, Clock } from "lucide-react";
import LabelInput from "@/components/ui/floating-input";

interface ContactModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedService?: string;
	selectedPlan?: string;
}

export default function ContactModal({
	open,
	onOpenChange,
	selectedService,
	selectedPlan,
}: ContactModalProps) {
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		email: "",
		service: selectedService || "",
		plan: selectedPlan || "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Здесь будет логика отправки формы
		console.log("Form submitted:", formData);
		// Показать уведомление об успешной отправке
		onOpenChange(false);
		// Сбросить форму
		setFormData({
			name: "",
			phone: "",
			email: "",
			service: "",
			plan: "",
			message: "",
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold">
						Обратная связь
					</DialogTitle>
					<DialogDescription className="text-muted-foreground">
						Оставьте ваши контактные данные, и наш специалист
						свяжется с вами в течение 15 минут
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4 mt-0">
					<LabelInput
						id="name"
						label="Имя *"
						value={formData.name}
						onChange={(e) =>
							setFormData({
								...formData,
								name: e.target.value,
							})
						}
						placeholder="Ваше имя"
						required
					/>

					<LabelInput
						id="phone"
						label="Телефон *"
						type="tel"
						value={formData.phone}
						onChange={(e) =>
							setFormData({
								...formData,
								phone: e.target.value,
							})
						}
						placeholder="+7 (___) ___-__-__"
						required
					/>

					<LabelInput
						id="email"
						label="Email"
						type="email"
						value={formData.email}
						onChange={(e) =>
							setFormData({
								...formData,
								email: e.target.value,
							})
						}
						placeholder="your@email.com"
					/>

					<div className="space-y-2">
						<Label htmlFor="message">Сообщение</Label>
						<Textarea
							id="message"
							value={formData.message}
							onChange={(e) =>
								setFormData({
									...formData,
									message: e.target.value,
								})
							}
							placeholder="Расскажите подробнее о ваших потребностях..."
							rows={3}
						/>
					</div>

					<div className="flex flex-col sm:flex-row gap-3 pt-4">
						<Button type="submit">Отправить заявку</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Отмена
						</Button>
					</div>
				</form>

				{/* Contact Info */}
				<div className="border-t pt-4 mt-6">
					<h4 className="font-medium mb-3">
						Или свяжитесь с нами напрямую:
					</h4>
					<div className="space-y-2 text-sm">
						<div className="flex items-center gap-2">
							<Phone className="h-4 w-4 text-primary" />
							<a
								href="tel:+7-800-000-00-00"
								className="text-primary hover:underline"
							>
								+7 (800) 000-00-00
							</a>
						</div>
						<div className="flex items-center gap-2">
							<Mail className="h-4 w-4 text-primary" />
							<a
								href="mailto:info@ritual-services.ru"
								className="text-primary hover:underline"
							>
								info@ritual-services.ru
							</a>
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

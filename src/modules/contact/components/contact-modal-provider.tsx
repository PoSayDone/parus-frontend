"use client";

import ContactModal from "./contact-modal";
import { useContactModal } from "@/lib/hooks/use-contact-modal";

export default function ContactModalProvider() {
	const { isOpen, selectedService, selectedPlan, closeModal } =
		useContactModal();

	return (
		<ContactModal
			open={isOpen}
			onOpenChange={closeModal}
			selectedService={selectedService}
			selectedPlan={selectedPlan}
		/>
	);
}

"use client";

import ContactModal from "./contact-modal";
import { useContactModal } from "@/lib/hooks/use-contact-modal";

export type ContactSettings = {
	phone: string;
	email: string;
	address: string;
	footerNote: string;
};

export default function ContactModalClient({
	settings,
}: {
	settings: ContactSettings;
}) {
	const { isOpen, selectedService, selectedPlan, closeModal } =
		useContactModal();

	return (
		<ContactModal
			open={isOpen}
			onOpenChange={closeModal}
			selectedService={selectedService}
			selectedPlan={selectedPlan}
			settings={settings}
		/>
	);
}

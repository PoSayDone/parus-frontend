"use client";

import { Button } from "@/components/ui/button";
import { useContactModal } from "@/lib/hooks/use-contact-modal";
import { ComponentProps } from "react";

export default function ContactModalTrigger({
	...rest
}: Omit<ComponentProps<typeof Button>, "onClick">) {
	const { openModal } = useContactModal();
	return <Button onClick={() => openModal()} {...rest} />;
}

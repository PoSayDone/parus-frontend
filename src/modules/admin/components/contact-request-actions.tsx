"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateContactRequest } from "@/lib/data/contact-requests";

export default function ContactRequestActions({
	requestId,
	processed,
}: {
	requestId: string;
	processed: boolean;
}) {
	const router = useRouter();

	const handleMarkProcessed = async () => {
		try {
			await updateContactRequest(requestId, {
				processed: true,
				processedAt: new Date(),
			});
			toast.success("Заявка отмечена как отработанная");
			router.refresh();
		} catch (error) {
			console.error("Error updating request:", error);
			toast.error("Не удалось обновить заявку");
		}
	};

	return (
		<div className="flex items-center gap-2">
			<Button
				type="button"
				variant="default"
				onClick={handleMarkProcessed}
				disabled={processed}
			>
				{processed ? "Отработана" : "Отметить отработанной"}
			</Button>
		</div>
	);
}

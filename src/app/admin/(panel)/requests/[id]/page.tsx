import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getContactRequest } from "@/lib/data/contact-requests";
import ContactRequestActions from "@/modules/admin/components/contact-request-actions";
import { ArrowLeft } from "lucide-react";

export default async function RequestDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolvedParams = await params;

	if (!resolvedParams?.id) {
		notFound();
	}

	const request = await getContactRequest(resolvedParams.id);

	if (!request) {
		notFound();
	}

	return (
		<div className="space-y-6">
			<Link
				href="/admin/requests"
				className={buttonVariants({
					variant: "ghost",
					size: "sm",
					className: "mb-2",
				})}
			>
				<ArrowLeft className="h-4 w-4" />
				Назад к заявкам
			</Link>
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						Заявка
					</h2>
					<p className="text-muted-foreground">
						{new Date(request.createdAt).toLocaleString("ru-RU")}
					</p>
				</div>
				<ContactRequestActions
					requestId={request.id}
					processed={request.processed}
				/>
			</div>

			<Card className="bg-transparent border-border-variant">
				<CardHeader>
					<CardTitle>Данные заявки</CardTitle>
					<CardDescription>
						Статус: {request.processed ? "Отработана" : "Не отработана"}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3 text-sm">
					<div>
						<span className="text-muted-foreground">Имя:</span>{" "}
						{request.name}
					</div>
					<div>
						<span className="text-muted-foreground">Телефон:</span>{" "}
						<a
							href={`tel:${request.phone}`}
							className="text-primary"
						>
							{request.phone}
						</a>
					</div>
					<div>
						<span className="text-muted-foreground">Email:</span>{" "}
						{request.email || "—"}
					</div>
					<div>
						<span className="text-muted-foreground">Услуга:</span>{" "}
						{request.service || "—"}
					</div>
					<div>
						<span className="text-muted-foreground">Пакет:</span>{" "}
						{request.plan || "—"}
					</div>
					<div>
						<span className="text-muted-foreground">Сообщение:</span>
						<div className="mt-1 whitespace-pre-wrap">
							{request.message || "—"}
						</div>
					</div>
					{request.processedAt && (
						<div>
							<span className="text-muted-foreground">
								Отработана:
							</span>{" "}
							{new Date(request.processedAt).toLocaleString("ru-RU")}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

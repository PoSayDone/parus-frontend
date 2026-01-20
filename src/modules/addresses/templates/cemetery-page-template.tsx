import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCemeteryByHandle } from "@/lib/data/addresses";
import ContactSection from "@/modules/contact/components/contact-section";

export default async function CemeteryPageTemplate({
	handle,
}: {
	handle: string;
}) {
	const cemetery = await getCemeteryByHandle(handle);

	if (!cemetery) {
		notFound();
	}

	const hasDocuments = (cemetery.cemeteryDocuments || []).length > 0;

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-12 relative overflow-hidden">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
					<div>
						<div className="flex flex-wrap items-center gap-4 mb-6">
							<h1 className="text-4xl font-medium text-foreground">
								{cemetery.name}
							</h1>
							<Badge variant="secondary">Кладбище</Badge>
						</div>

						<div className="space-y-3 text-muted-foreground mb-8">
							<div className="flex flex-wrap gap-3">
								{cemetery.address && (
									<div className="flex items-start gap-3">
										<MapPin className="h-5 w-5 text-primary mt-0.5" />
										<span>{cemetery.address}</span>
									</div>
								)}
								{cemetery.district && (
									<Badge variant="outline">
										{cemetery.district}
									</Badge>
								)}
							</div>
							{cemetery.phone && (
								<div className="flex items-start gap-3">
									<Phone className="h-5 w-5 text-primary mt-0.5" />
									<span>{cemetery.phone}</span>
								</div>
							)}
							{cemetery.schedule && (
								<div className="flex items-start gap-3">
									<Clock className="h-5 w-5 text-primary mt-0.5" />
									<span>{cemetery.schedule}</span>
								</div>
							)}
						</div>
						{cemetery.description && (
							<p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
								{cemetery.description}
							</p>
						)}
					</div>

					<div className="relative">
						<Image
							width={400}
							height={200}
							src={
								cemetery.cemeteryThumbnail ||
								cemetery.cemeteryImages?.[0] ||
								"/memorial-1.jpg"
							}
							alt={cemetery.name}
							className="w-full h-96 object-cover rounded-lg shadow-lg"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
					{cemetery.cemeteryStatus && (
						<Card className="gap-3">
							<CardHeader>
								<CardTitle>Статус захоронений</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground leading-relaxed whitespace-pre-line">
									{cemetery.cemeteryStatus}
								</p>
							</CardContent>
						</Card>
					)}

					{hasDocuments && (
						<Card className="gap-3">
							<CardHeader className="flex flex-row flex-wrap items-center gap-2 min-w-0">
								<CardTitle>Документы для захоронения</CardTitle>
								{cemetery.cemeteryNote && (
									<Badge className="max-w-full truncate">
										{cemetery.cemeteryNote}
									</Badge>
								)}
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									{(cemetery.cemeteryDocuments || []).map(
										(item, index) => (
											<li
												key={`${item}-${index}`}
												className="text-muted-foreground leading-relaxed"
											>
												{item}
											</li>
										),
									)}
								</ul>
							</CardContent>
						</Card>
					)}
				</div>

				<ContactSection />
			</div>
		</div>
	);
}

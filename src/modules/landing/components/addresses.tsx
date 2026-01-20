import Link from "next/link";
import Section from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { listAddresses } from "@/lib/data/addresses";
import CemeteriesMap from "./cemeteries-map";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LandingAddresses() {
	const {
		response: { data: addresses },
	} = await listAddresses({
		page: 1,
		queryParams: { limit: 100 },
	});

	const cemeteries = addresses.filter(
		(address) => address.type === "cemetery",
	);
	const cemeteriesForMap = cemeteries
		.filter(
			(cemetery) =>
				typeof cemetery.cemeteryLat === "number" &&
				typeof cemetery.cemeteryLng === "number",
		)
		.map((cemetery) => ({
			id: cemetery.id,
			name: cemetery.name,
			coords: [
				cemetery.cemeteryLat as number,
				cemetery.cemeteryLng as number,
			],
		}));

	return (
		<Section
			id="addresses"
			title="Полезные адреса"
			subtitle="Кладбища Перми с адресами и отметками на карте."
		>
			<div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
				<Card className="text-left h-120">
					<CardHeader className="flex justify-between items-center">
						<CardTitle>
						Кладбища города Перми
						</CardTitle>
						<Link
							href="/addresses"
							className={buttonVariants({ variant: "default", size: "sm" })}
						>
							Смотреть все адреса
						</Link>
					</CardHeader>
					<CardContent className="flex">
					{cemeteries.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							Информация готовится.
						</p>
					) : (
						<ScrollArea className="h-90 w-full">
							<ScrollBar orientation="vertical"/>
							<ul className="space-y-4">
								{cemeteries.map((item) => (
									<li key={item.id}>
										{item.handle ? (
											<Link
												href={`/addresses/${item.handle}`}
												className="font-medium hover:underline text-base"
											>
												{item.name}
											</Link>
										) : (
											<p className="font-medium text-base">
												{item.name}
											</p>
										)}
										<p className="text-sm text-muted-foreground">
											{item.address || "—"}
										</p>
									</li>
								))}
							</ul>
						</ScrollArea>
					)}
					</CardContent>
				</Card>

				<CemeteriesMap locations={cemeteriesForMap} />
			</div>
		</Section>
	);
}

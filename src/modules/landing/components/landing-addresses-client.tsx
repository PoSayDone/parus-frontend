"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { CemeteryLocation } from "@/types/landing";
import CemeteriesMap from "./cemeteries-map";

export default function LandingAddressesClient({
	cemeteries,
}: {
	cemeteries: CemeteryLocation[];
}) {
	const [activeId, setActiveId] = useState<string | null>(
		cemeteries[0]?.id || null,
	);
	const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

	const locationsWithCoords = useMemo(
		() => cemeteries.filter((cemetery) => cemetery.coords),
		[cemeteries],
	);

	useEffect(() => {
		if (!activeId) return;
		const node = itemRefs.current[activeId];
		if (node) {
			node.scrollIntoView({ behavior: "smooth", block: "nearest" });
		}
	}, [activeId]);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
			<Card className="text-left h-120">
				<CardHeader className="flex justify-between items-center gap-3">
					<CardTitle>Кладбища города Перми</CardTitle>
					<Link
						href="/services/addresses"
						className={buttonVariants({
							variant: "default",
							size: "sm",
						})}
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
						<ScrollArea className="h-102 w-full -m-2.5">
							<ScrollBar orientation="vertical" />
							<ul className="mb-3">
								{cemeteries.map((item) => (
									<li
										key={item.id}
										ref={(node) => {
											itemRefs.current[item.id] = node;
										}}
										className={cn(
											"rounded-xl px-3 py-3 transition-colors leading-none",
											activeId === item.id &&
												"bg-surface-container",
										)}
										onMouseEnter={() =>
											setActiveId(item.id)
										}
									>
										{item.handle ? (
											<Link
												href={`/addresses/${item.handle}`}
												className="font-medium hover:underline text-base h-fit leading-none!"
												onClick={() =>
													setActiveId(item.id)
												}
											>
												{item.name}
											</Link>
										) : (
											<button
												type="button"
												onClick={() =>
													setActiveId(item.id)
												}
												className="font-medium text-base text-left leading-none"
											>
												{item.name}
											</button>
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

			<CemeteriesMap
				locations={locationsWithCoords}
				activeId={activeId}
				onSelect={setActiveId}
			/>
		</div>
	);
}

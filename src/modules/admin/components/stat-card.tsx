"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

interface StatCardProps {
	title: string;
	value: string | number;
	description?: string;
	className?: string;
	children?: ReactNode;
}

export function StatCard({
	title,
	value,
	description,
	className = "",
	children,
}: StatCardProps) {
	return (
		<Card className={`bg-muted/50 ${className}`}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle>{title}</CardTitle>
				{children}
			</CardHeader>
			<CardContent>
				<div className="text-3xl font-medium">{value}</div>
				{description && (
					<p className="text-sm text-muted-foreground">
						{description}
					</p>
				)}
			</CardContent>
		</Card>
	);
}

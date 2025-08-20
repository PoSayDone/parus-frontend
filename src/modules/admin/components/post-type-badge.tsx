"use client";

import { Badge } from "@/components/ui/badge";

interface PostTypeBadgeProps {
	type: "article" | "info" | "document";
}

export function PostTypeBadge({ type }: PostTypeBadgeProps) {
	const labelMap = {
		article: "Статья",
		info: "Информация",
		document: "Документ",
	} as const;

	const label = labelMap[type];

	return <Badge>{label}</Badge>;
}

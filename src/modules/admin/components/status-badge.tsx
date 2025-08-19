"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'published' | 'draft' | 'default' | 'secondary';
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const variantMap = {
    active: "default",
    published: "default",
    inactive: "secondary",
    draft: "secondary",
    default: "default",
    secondary: "secondary"
  } as const;

  const variant = variantMap[status] || "default";

  return (
    <Badge variant={variant}>
      {label}
    </Badge>
  );
}
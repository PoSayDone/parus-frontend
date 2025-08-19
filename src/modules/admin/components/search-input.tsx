"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

export function SearchInput({
	value,
	onChange,
	placeholder = "Поиск...",
	className = "",
}: SearchInputProps) {
	return (
		<Input
			placeholder={placeholder}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className={cn("flex-1 max-w-sm", className)}
		/>
	);
}

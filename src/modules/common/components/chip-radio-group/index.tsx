"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ChipOption {
	value: string;
	label: string;
}

interface ChipRadioGroupProps {
	options: ChipOption[];
	chipSize?: "sm" | "default" | "lg";
	defaultValue?: string;
	name: string;
	onChange?: (value: string) => void;
	className?: string;
}

export function ChipRadioGroup({
	options,
	defaultValue,
	name,
	onChange,
	className,
	chipSize = "default",
}: ChipRadioGroupProps) {
	const [selectedValue, setSelectedValue] = useState<string>(
		defaultValue || "",
	);

	const handleChange = (value: string) => {
		setSelectedValue(value);
		onChange?.(value);
	};

	return (
		<ScrollArea className="w-full overflow-x-clip">
			<div
				className={cn("flex w-full whitespace-nowrap gap-2", className)}
			>
				{options.map((option) => (
					<label
						key={option.value}
						className={cn(
							selectedValue === option.value
								? buttonVariants({
										size: chipSize,
										variant: "default",
									})
								: buttonVariants({
										size: chipSize,
										variant: "outline",
									}),
							"font-normal",
						)}
					>
						<input
							type="radio"
							name={name}
							value={option.value}
							checked={selectedValue === option.value}
							onChange={() => handleChange(option.value)}
							className="sr-only"
							aria-label={option.label}
						/>
						{option.label}
					</label>
				))}
			</div>
			<ScrollBar orientation="horizontal" className="h-1" />
		</ScrollArea>
	);
}

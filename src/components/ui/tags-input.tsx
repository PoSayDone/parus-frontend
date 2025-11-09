"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tagsInputVariants = cva("flex w-full flex-wrap gap-2", {
	variants: {
		variant: {
			default:
				"rounded-md border border-input bg-transparent px-3 py-2 text-sm",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface TagsInputProps
	extends Omit<
			React.InputHTMLAttributes<HTMLInputElement>,
			"value" | "onChange"
		>,
		VariantProps<typeof tagsInputVariants> {
	value: string[];
	onChange: (value: string[]) => void;
	placeholder?: string;
}

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
	({ className, variant, value, onChange, placeholder, ...props }, ref) => {
		const [inputValue, setInputValue] = React.useState("");

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.target.value);
		};

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter" || e.key === ",") {
				e.preventDefault();
				const newValue = inputValue.trim();
				if (newValue && !value.includes(newValue)) {
					onChange([...value, newValue]);
					setInputValue("");
				}
			}
		};

		const removeTag = (tagToRemove: string) => {
			onChange(value.filter((tag) => tag !== tagToRemove));
		};

		return (
			<div className={cn(tagsInputVariants({ variant }), className)}>
				{value.map((tag) => (
					<Badge
						key={tag}
						variant="secondary"
						className="whitespace-normal break-words h-auto"
					>
						{tag}
						<button
							type="button"
							className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
							onClick={() => removeTag(tag)}
						>
							<X className="h-3 w-3 text-background/50 hover:text-background" />
						</button>
					</Badge>
				))}
				<input
					ref={ref}
					type="text"
					placeholder={placeholder}
					className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					{...props}
				/>
			</div>
		);
	},
);

TagsInput.displayName = "TagsInput";

export { TagsInput };

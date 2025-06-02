import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FloatingLabelInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label: string;
};

const LabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
	(
		{
			id,
			name,
			label,
			placeholder,
			value,
			defaultValue,
			onFocus,
			onBlur,
			onChange,
			...props
		},
		ref,
	) => {
		const [isFocused, setIsFocused] = useState(false);
		const [hasValue, setHasValue] = useState(
			value != null ? value !== "" : !!defaultValue,
		);

		useEffect(() => {
			if (value != null) {
				setHasValue(value !== "");
			}
		}, [value]);

		const inputId = id ?? name;

		const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(true);
			onFocus?.(e);
		};

		const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(false);
			onBlur?.(e);
		};

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (value == null) {
				setHasValue(e.target.value !== "");
			}
			onChange?.(e);
		};

		const shouldFloat = !!placeholder || isFocused || hasValue;

		return (
			<div
				className={cn(
					"relative w-full px-3 py-1.5 h-14 bg-card rounded-xl transition border border-transparent",
					isFocused && "border-ring ring-ring/50 ring-[3px]",
				)}
			>
				<div className="relative z-0 w-full h-full">
					<input
						ref={ref}
						id={inputId}
						name={name}
						type="text"
						placeholder={placeholder}
						defaultValue={defaultValue}
						value={value}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onChange={handleChange}
						className="block w-full h-full bg-transparent pt-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
						{...props}
					/>
					<Label
						htmlFor={inputId}
						className={cn(
							"absolute left-0 transition-all duration-200 pointer-events-none text-card-foreground",
							shouldFloat
								? "top-0 text-sm"
								: "top-1/2 -translate-y-1/2 text-base",
						)}
					>
						{label}
					</Label>
				</div>
			</div>
		);
	},
);

LabelInput.displayName = "LabelInput";

export default LabelInput;

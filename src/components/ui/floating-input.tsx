import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<Input
				placeholder=" "
				className={cn(
					"peer",
					"valign-bottom h-fit pt-5 pb-3",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
FloatingInput.displayName = "FloatingInput";

const FloatingLabel = React.forwardRef<
	React.ElementRef<typeof Label>,
	React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
	return (
		<Label
			className={cn(
				"peer-focus:secondary peer-focus:dark:secondary absolute start-3 top-3 z-10 origin-[0] -translate-y-2 scale-75 transform bg-transparent px-3 text-sm text-muted-foreground duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-3 peer-focus:-translate-y-2 peer-focus:scale-75  dark:bg-background rtl:peer-focus:left-auto  cursor-text",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
FloatingLabel.displayName = "FloatingLabel";

type FloatingLabelInputProps = InputProps & { label?: string };

const FloatingLabelInput = React.forwardRef<
	React.ElementRef<typeof FloatingInput>,
	React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, name, label, ...props }, ref) => {
	return (
		<div className="relative">
			<FloatingInput ref={ref} id={id} name={name} {...props} />
			<FloatingLabel htmlFor={name ?? id ?? ""}>{label}</FloatingLabel>
		</div>
	);
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };

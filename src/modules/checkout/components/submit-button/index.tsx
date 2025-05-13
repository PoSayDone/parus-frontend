"use client";

import { Button } from "@/components/ui/button";
import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
	type,
	isLoading,
	...rest
}: ComponentProps<typeof Button>) {
	const { pending } = useFormStatus();

	return <Button type="submit" isLoading={pending} {...rest}></Button>;
}

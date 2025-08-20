"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface AdminFormLayoutProps {
	title: string;
	description: string;
	backHref: string;
	backLabel: string;
	children: React.ReactNode;
	sidebar: React.ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: UseFormReturn<any>;
	submitLabel: string;
	saving: boolean;
	cancelHref?: string;
	onSubmit: (values: FieldValues) => Promise<void>;
}

export function AdminFormLayout({
	title,
	description,
	backHref,
	backLabel,
	children,
	sidebar,
	form,
	submitLabel,
	saving,
	onSubmit,
	cancelHref = "/admin",
}: AdminFormLayoutProps) {
	return (
		<div className="space-y-6">
			<div className="flex flex-col items-start space-x-4">
				<Link
					href={backHref}
					className={buttonVariants({
						variant: "ghost",
						size: "sm",
						className: "mb-2",
					})}
				>
					<ArrowLeft className="h-4 w-4" />
					{backLabel}
				</Link>
				<div>
					<h2 className="text-2xl font-medium tracking-tight">
						{title}
					</h2>
					<p className="text-muted-foreground">{description}</p>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="grid gap-6 lg:grid-cols-3 relative">
						<div className="lg:col-span-2 space-y-6">
							{children}
						</div>
						<div className="space-y-6 lg:sticky lg:top-22 lg:self-start">
							{sidebar}
							<div className="flex flex-col space-y-2 mt-6">
								<Button type="submit" disabled={saving}>
									<Save />
									{saving ? "Сохранение..." : submitLabel}
								</Button>
								<Link
									href={cancelHref}
									className={buttonVariants({
										variant: "outline",
										className: "w-full bg-transparent",
									})}
								>
									Отмена
								</Link>
							</div>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}

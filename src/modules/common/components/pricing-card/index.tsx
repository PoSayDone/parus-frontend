import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PricingPlan {
	id: string;
	title: string;
	description: string;
	price: string;
	creditPrice?: string;
	popular: boolean;
	features: string[];
	href: string;
}

export default function PricingCard({
	className,
	plan,
	priceType = "full",
	...rest
}: {
	plan: PricingPlan;
	priceType?: "parts" | "full";
} & ComponentProps<typeof Card>) {
	return (
		<Card
			key={plan.id}
			className={cn(
				"text-start grow min-h-0 max-w-[400px] relative transition-all duration-300 hover:shadow-lg",
				plan.popular
					? "border-primary shadow-md"
					: "border-border hover:border-primary/20",
				className,
			)}
			{...rest}
		>
			{plan.popular && (
				<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
					<Badge className="bg-primary text-primary-foreground">
						Популярный
					</Badge>
				</div>
			)}

			<CardHeader>
				<CardTitle
					className={cn(
						"transition-colors duration-300 text-xl",
						plan.popular ? "text-primary" : "text-foreground",
					)}
				>
					{plan.title}
				</CardTitle>
				<CardDescription className="leading-[20px] h-[40px]">
					{plan.description}
				</CardDescription>
				<div className="flex items-center gap-2 mt-2">
					{priceType === "parts" && plan.creditPrice ? (
						<div>
							<Badge variant="outline">рассрочка 0-0-6</Badge>
							<h2 className="text-2xl font-medium text-foreground mt-1">
								от {plan.creditPrice} ₽ *
							</h2>
						</div>
					) : (
						<h2 className="text-2xl font-medium text-foreground">
							{plan.price} ₽
						</h2>
					)}
				</div>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col items-start w-full gap-y-2">
					<span className="text-base text-left mb-2 font-medium">
						Включает:
					</span>
					{plan.features.map((feature, index) => (
						<div
							key={index}
							className="flex items-start justify-start gap-2 text-sm"
						>
							<div className="flex items-center justify-center mt-0.5">
								<CheckIcon className="size-4 text-primary flex-shrink-0" />
							</div>
							<span className="text-muted-foreground">
								{feature}
							</span>
						</div>
					))}
				</div>
			</CardContent>

			<CardFooter className="mt-auto">
				<Link
					href={plan.href ?? ""}
					className={buttonVariants({
						variant: plan.popular ? "default" : "outline",
						className: "w-full",
					})}
				>
					Выбрать пакет
				</Link>
			</CardFooter>
		</Card>
	);
}

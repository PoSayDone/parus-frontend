import { TypographyH3, TypographyP } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import type { PricePlan } from "@/types/admin";
import type { ComponentProps } from "react";

export default function PricingCard({
  className,
  plan,
  priceType = "full",
  ...rest
}: {
  plan: PricePlan;
  priceType?: "parts" | "full";
} & ComponentProps<typeof Card>) {
  return (
    <Card
      key={plan.id}
      className={cn(
        "grow min-h-0 max-w-[400px] relative transition-all duration-300 hover:shadow-lg",
        plan.popular
          ? "border-primary shadow-md bg-secondary-container"
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

      <CardHeader className="gap-1 lg:gap-3">
        <CardTitle
          className={cn(
            "transition-colors duration-300 mb-1 flex items-center gap-3",
            plan.popular ? "text-primary" : "text-foreground",
          )}
        >
          {plan.title}
          {priceType === "parts" && plan.creditPrice ? (
            <Badge variant="outline" className="-mb-1">
              рассрочка 0-0-6
            </Badge>
          ) : null}
        </CardTitle>
        <div className="flex items-center gap-2">
          {priceType === "parts" && plan.creditPrice ? (
            <TypographyP>от {plan.creditPrice} ₽</TypographyP>
          ) : (
            <TypographyP>{plan.price} ₽</TypographyP>
          )}
        </div>
        <CardDescription className="h-11 lg:h-13">
          {plan.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-start w-full gap-y-1.5 lg:gap-y-3">
          {plan.included?.map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-start gap-4 text-sm"
            >
              <div className="flex items-center justify-center">
                <div className="size-1.25 bg-primary-container rounded-full" />
              </div>
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto">
        <ContactModalTrigger
          className={buttonVariants({
            variant: plan.popular ? "default" : "secondary",
            className: "w-full",
          })}
        >
          Выбрать пакет
        </ContactModalTrigger>
      </CardFooter>
    </Card>
  );
}

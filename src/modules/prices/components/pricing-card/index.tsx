import { Badge } from "@/components/ui/badge";
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
import { Check, Plus } from "lucide-react";
import type { ComponentProps } from "react";

// «Все услуги базового пакета» — не отдельная услуга, а ссылка на другой пакет
const isInheritedPlan = (feature: string) =>
  feature.toLowerCase().includes("все услуги");

export default function PricingCard({
  className,
  plan,
  priceType = "full",
  ...rest
}: {
  plan: PricePlan;
  priceType?: "parts" | "full";
} & ComponentProps<typeof Card>) {
  const showCredit = priceType === "parts" && !!plan.creditPrice;

  return (
    <Card
      className={cn(
        "h-full text-left",
        plan.popular
          ? "border-primary bg-secondary-container"
          : "border-border",
        className,
      )}
      {...rest}
    >
      <CardHeader className="gap-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle>{plan.title}</CardTitle>
          {plan.popular && <Badge>Популярный</Badge>}
        </div>
        <CardDescription className="lg:min-h-11">
          {plan.description}
        </CardDescription>

        <div className="mt-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-3xl lg:text-4xl font-medium whitespace-nowrap">
              {showCredit ? plan.creditPrice : plan.price} ₽
            </span>
            {showCredit && (
              <Badge variant="outline">
                рассрочка 0-0-3
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground min-h-5">
            {showCredit ? `Полная стоимость: ${plan.price} ₽` : null}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Что входит
        </p>
        <ul className="flex flex-col gap-2.5">
          {plan.included?.map((feature) => {
            const inherited = isInheritedPlan(feature);
            const Icon = inherited ? Plus : Check;

            return (
              <li key={feature} className="flex items-start gap-3">
                <Icon className="size-5 shrink-0 mt-0.5 text-primary" />
                <span className={cn(inherited && "font-medium")}>
                  {feature}
                </span>
              </li>
            );
          })}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto">
        <ContactModalTrigger
          plan={plan.title}
          variant={plan.popular ? "default" : "outline"}
          className="w-full"
        >
          Выбрать пакет
        </ContactModalTrigger>
      </CardFooter>
    </Card>
  );
}

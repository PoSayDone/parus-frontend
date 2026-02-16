"use client";

import { Button } from "@/components/ui/button";
import PricingCard from "@/modules/prices/components/pricing-card";
import type { PricePlan } from "@/types/admin";
import { useState } from "react";

export default function PricesListClient({
  pricingPlans,
}: {
  pricingPlans: PricePlan[];
}) {
  const [priceType, setPriceType] = useState<"parts" | "full">("parts");

  return (
    <div className="space-y-8 text-start">
      <div className="p-1 bg-muted w-fit rounded-full gap-1 border shadow-xl/5">
        <Button
          variant={priceType === "parts" ? "default" : "ghost"}
          onClick={() => setPriceType("parts")}
        >
          По частям
        </Button>
        <Button
          variant={priceType === "full" ? "default" : "ghost"}
          onClick={() => setPriceType("full")}
        >
          Одним платежом
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            priceType={priceType}
            className="mx-auto w-full max-w-none"
          />
        ))}
      </div>
    </div>
  );
}

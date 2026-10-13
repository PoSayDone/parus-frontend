"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PricePlan } from "@/types/admin";
import { useState } from "react";
import PricingCard from "./pricing-card";

const GRID_COLS: Record<number, string> = {
  1: "max-w-md",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};

export default function PricesListClient({
  pricingPlans,
}: {
  pricingPlans: PricePlan[];
}) {
  const hasCreditPrices = pricingPlans.some((plan) => plan.creditPrice);
  const [priceType, setPriceType] = useState<"parts" | "full">(
    hasCreditPrices ? "parts" : "full",
  );

  return (
    <div className="space-y-6 text-start">
      {hasCreditPrices && (
        <div className="flex w-full sm:w-fit gap-1 p-1 bg-muted rounded-full border">
          <Button
            className="flex-1 sm:flex-none"
            variant={priceType === "parts" ? "default" : "ghost"}
            onClick={() => setPriceType("parts")}
          >
            По частям
          </Button>
          <Button
            className="flex-1 sm:flex-none"
            variant={priceType === "full" ? "default" : "ghost"}
            onClick={() => setPriceType("full")}
          >
            Одним платежом
          </Button>
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-1 gap-4 items-stretch",
          GRID_COLS[pricingPlans.length] ?? GRID_COLS[3],
        )}
      >
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} priceType={priceType} />
        ))}
      </div>
    </div>
  );
}

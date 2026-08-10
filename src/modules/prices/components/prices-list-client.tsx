"use client";

import { Button } from "@/components/ui/button";
import type { PricePlan } from "@/types/admin";
import { useState } from "react";
import { Check, Minus } from "lucide-react";

export default function PricesListClient({
  pricingPlans,
}: {
  pricingPlans: PricePlan[];
}) {
  const [priceType, setPriceType] = useState<"parts" | "full">("parts");

  // --- УМНАЯ РАСШИФРОВКА ПАКЕТОВ ---
  
  // 1. Создаем карту пакетов для быстрого поиска по названию (в нижнем регистре)
  const plansMap = new Map(pricingPlans.map(p => [p.title.toLowerCase(), p]));

  // 2. Рекурсивная функция: достает все услуги пакета, включая те, что он наследует
  const getResolvedFeatures = (planTitle: string, visited = new Set<string>()): string[] => {
    if (visited.has(planTitle)) return []; // Защита от зацикливания
    visited.add(planTitle);

    const plan = plansMap.get(planTitle.toLowerCase());
    if (!plan) return [];

    let features: string[] = [];
    
    for (const item of (plan.included || [])) {
      const lowerItem = item.toLowerCase();
      // Если находим фразу про "Все услуги", подтягиваем чужие пункты
      if (lowerItem.includes("все услуги")) {
        if (lowerItem.includes("базов")) features.push(...getResolvedFeatures("базовый", visited));
        if (lowerItem.includes("стандарт")) features.push(...getResolvedFeatures("стандартный", visited));
        if (lowerItem.includes("премиум")) features.push(...getResolvedFeatures("премиум", visited));
      } else {
        // Иначе просто добавляем обычную услугу
        features.push(item);
      }
    }
    
    return Array.from(new Set(features)); // Убираем дубликаты
  };

  
  // 3. Создаем "расширенную" версию планов с полными списками услуг
  const expandedPlans = pricingPlans.map(plan => ({
    ...plan,
    resolvedIncluded: getResolvedFeatures(plan.title)
  }));

  // 4. Собираем общий список уникальных услуг для левой колонки уже из новых данных
  const allFeatures = Array.from(
    new Set(expandedPlans.flatMap((plan) => plan.resolvedIncluded))
  );

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
     {/* Обертка: отключаем overflow-x-auto на десктопе (lg:overflow-visible), чтобы шапка смогла "прилипнуть" к странице */}
      <div className="overflow-x-auto lg:overflow-visible pb-4 pt-4">
        {/* Меняем border-collapse на border-separate, чтобы заработали скругления (rounded) у популярного пакета */}
        <table className="w-full text-left border-separate border-spacing-0 min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 align-bottom text-left border-b border-border w-1/4 bg-background/95 backdrop-blur-md sticky top-[64px] z-30">
                <span className="font-medium text-muted-foreground">Стоимость</span>
              </th>
              
              {expandedPlans.map((plan) => (
                <th 
                  key={plan.id} 
                  className={`relative p-4 pt-12 border-b border-border w-1/4 align-bottom text-center sticky top-[64px] z-30 ${
                    plan.popular 
                      ? "bg-[rgb(234,222,210)] rounded-t-3xl" // Цвет фона и скругление сверху
                      : "bg-background/95 backdrop-blur-md"
                  }`}
                >
                  {/* Отвязанный бейдж Популярный */}
                  {plan.popular && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary/10 text-primary text-[11px] px-3 py-1 rounded-full font-medium">
                        Популярный
                      </span>
                    </div>
                  )}
                  
                  {/* Название и описание */}
                  <div className="text-xl font-medium">{plan.title}</div>
                  <div className="text-sm text-muted-foreground mt-1 mb-6 font-normal leading-snug mx-auto max-w-[200px]">
                    {plan.description}
                  </div>
                  
                  {/* Выровненная по центру цена */}
                  <div className="text-2xl font-medium text-foreground whitespace-nowrap">
                    {priceType === "parts" ? plan.creditPrice : plan.price}
                  </div>
                  
                  {/* Контейнер для бейджа рассрочки */}
                  <div className="mt-1.5 h-5 flex items-center justify-center">
                    {priceType === "parts" && (
                      <span className={`border text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        plan.popular ? "text-muted-foreground/70 border-muted-foreground/20" : "text-muted-foreground border-border"
                      }`}>
                        рассрочка 0-0-3
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {/* Генерируем строки на основе уникальных услуг */}
            {allFeatures.map((feature, idx) => (
              <tr key={idx} className="group hover:bg-muted/50 transition-colors">
                <td className="p-4 border-b border-border text-sm text-foreground sticky left-0 z-20 bg-background group-hover:bg-muted/50 transition-colors border-r border-border lg:border-r-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] lg:shadow-none">
                  {feature}
                </td>
                {expandedPlans.map((plan) => {
                  const hasFeature = plan.resolvedIncluded.includes(feature);
                  return (
                    <td 
                      key={plan.id} 
                      // Красим ячейку, если это популярный тариф
                      className={`p-4 border-b border-border text-center ${
                        plan.popular ? "bg-[rgb(234,222,210)]" : ""
                      }`}
                    >
                      {hasFeature ? (
                        <Check className="w-5 h-5 text-primary mx-auto" />
                      ) : (
                        <Minus className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            
           {/* Строка с кнопками */}
            <tr>
              <td className="p-4 pt-8 sticky left-0 z-20 bg-background border-r border-border lg:border-r-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] lg:shadow-none"></td>
              {expandedPlans.map((plan) => (
                <td 
                  key={plan.id} 
                  // Красим нижнюю ячейку и скругляем углы снизу
                  className={`p-4 pt-8 text-center ${
                    plan.popular ? "bg-[rgb(234,222,210)] rounded-b-3xl" : ""
                  }`}
                >
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Выбрать пакет
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

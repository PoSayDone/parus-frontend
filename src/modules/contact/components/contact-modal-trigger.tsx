"use client";

import { Button } from "@/components/ui/button";
import { useContactModal } from "@/lib/hooks/use-contact-modal";
import type { ComponentProps } from "react";

// Расширяем стандартные свойства кнопки, добавляя наши service и plan
interface ContactModalTriggerProps
  extends Omit<ComponentProps<typeof Button>, "onClick"> {
  service?: string;
  plan?: string;
}

export default function ContactModalTrigger({
  service,
  plan,
  ...rest
}: ContactModalTriggerProps) {
  const { openModal } = useContactModal();

  const handleClick = () => {
    // --- ОТПРАВКА ЦЕЛИ (КЛИК) В МЕТРИКУ ---
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(106913480, 'reachGoal', 'lead_form_click');
    }
    // --------------------------------------
    
    // Открываем саму модалку и передаем данные
    openModal(service, plan);
  };

  // Важно: onClick ставим ПОСЛЕ {...rest}, чтобы он 100% сработал
  return <Button {...rest} onClick={handleClick} />;
}
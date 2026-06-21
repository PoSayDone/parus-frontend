"use function";
"use client";

import { useEffect } from "react";
import { useContactModal } from "@/lib/hooks/use-contact-modal";

export default function AutoContactPopup({ 
  service = "Помощь на странице кладбища" 
}: { 
  service?: string 
}) {
  const { openModal } = useContactModal();

  useEffect(() => {
    // 1. Проверяем, показывали ли мы форму в этой сессии
    const hasSeenPopup = sessionStorage.getItem("hasSeenAutoPopup");
    
    if (hasSeenPopup) return; // Если показывали - умываем руки

    // 2. Заводим таймер на 40 секунд (40000 мс)
    const timer = setTimeout(() => {
      
      // отправить отдельную цель в Метрику, 
      // чтобы знать, что форма открылась автоматически
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym(106913480, 'reachGoal', 'auto_popup_shown');
      }

      // Открываем модалку и передаем название страницы/услуги
      openModal(service);
      
      // Записываем в память, чтобы больше не бесить пользователя
      sessionStorage.setItem("hasSeenAutoPopup", "true"); 
    }, 40000);

    // 3. Очищаем таймер, если человек ушел со страницы раньше 40 секунд
    return () => clearTimeout(timer);
  }, [openModal, service]);

  return null; // Этот компонент абсолютно прозрачный, он не влияет на дизайн
}
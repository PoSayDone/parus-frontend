"use client";

import { useEffect } from "react";

export function PhoneClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Ищем, был ли клик по тегу <a> или по чему-то внутри него (например, по иконке трубки)
      const target = event.target as Element;
      const link = target.closest('a');

      // Если клик был по ссылке и атрибут href начинается с "tel:"
      if (link && link.getAttribute("href")?.startsWith("tel:")) {
        // Отправляем цель в Метрику
        if (typeof window !== "undefined" && (window as any).ym) {
          (window as any).ym(106913480, "reachGoal", "phone_click");
        }
      }
    };

    // Вешаем слушатель на весь документ
    document.addEventListener("click", handleClick);

    // Убираем слушатель, если компонент размонтируется
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null; // Компонент абсолютно невидимый, он просто делает свою работу
}
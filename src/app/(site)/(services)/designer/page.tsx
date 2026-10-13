import type { Metadata } from "next";
import { TypographyH1 } from "@/components/typography";
// Импортируем наш новый компонент (укажите правильный путь)
import DesignerClient from "./designer-client"; 

export const metadata: Metadata = {
  title: "Конструктор ритуальных изделий - Парус",
  description:
    "Создайте уникальные ритуальные изделия с помощью нашего конструктора. Персонализированные надгробия, кресты и другие изделия.",
  openGraph: {
    type: "website",       // <--  тип
    url: "/designer",      // <--  URL страницы конструктора
    title: "Конструктор ритуальных изделий - Парус",
    description:
      "Создайте уникальные ритуальные изделия с помощью нашего конструктора. Персонализированные надгробия, кресты и другие изделия.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "/designer",
  },
};

export default function DesignerPage() {
  return (
    <div className="w-full min-h-[calc(100dvh-80px)] bg-background">
      {/* Шапка конструктора */}
      <div>
        <div className="container mx-auto px-4 pt-8 lg:pt-12 page-header">
          <TypographyH1 className="mb-4">Конструктор памятника</TypographyH1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl text-pretty">
            Соберите предварительный макет за 4 шага. Мы подготовим точный расчет 
            с учетом размеров вашего участка.
          </p>
        </div>
      </div>

      {/* Сам интерактивный конструктор */}
      <DesignerClient />
    </div>
  );
}
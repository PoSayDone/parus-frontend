import type { Metadata } from "next";
// Импортируем наш новый компонент (укажите правильный путь)
import DesignerClient from "./designer-client"; 

export const metadata: Metadata = {
  title: "Конструктор ритуальных изделий - Парус",
  description:
    "Создайте уникальные ритуальные изделия с помощью нашего конструктора. Персонализированные надгробия, кресты и другие изделия.",
  openGraph: {
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
    <div className="w-full min-h-[calc(100vh-80px)] bg-background">
      {/* Шапка конструктора */}
      <div className="bg-muted/30 border-b py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-medium mb-4">
            Конструктор памятника
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
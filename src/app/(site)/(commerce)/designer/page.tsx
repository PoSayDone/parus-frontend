import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

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
    <div className="w-full py-12">
      <div
        className="py-4 sm:py-48 px-2 flex flex-col justify-center items-start"
        data-testid="empty-cart-message"
      >
        <h1 className="text-3xl">Конструктор в разработке</h1>
        <div className="text-lg mt-4 mb-6 max-w-[32rem]">
          На данный момент конструктор находится в разработке, просим прощения
          за предоставленные неудобства. Сейчас вы можете воспользоваться
          катлогом товаров и найти интересующий вас товар при помощи него.
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/services"
            className={cn(
              buttonVariants({
                variant: "default",
                className: "w-full sm:w-auto",
              }),
            )}
          >
            Перейти к услугам
          </Link>
          <Link
            href="/store"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "w-full sm:w-auto",
              }),
            )}
          >
            Перейти к товарам
          </Link>
        </div>
      </div>
    </div>
  );
}

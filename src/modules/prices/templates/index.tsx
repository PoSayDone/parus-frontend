import PageTemplate from "@/modules/common/templates/page-template";
import SkeletonPricesList from "@/modules/skeletons/templates/skeleton-prices-grid";
import { Suspense } from "react";
import PricesList from "../components/prices-list";

const EXTRA_SERVICES = [
  {
    title: "Кремация",
    description: "Организация кремации с урной",
    price: "от 25 000 ₽",
  },
  {
    title: "Отпевание",
    description: "Религиозная церемония",
    price: "от 8 000 ₽",
  },
  {
    title: "Бальзамирование",
    description: "Подготовка тела",
    price: "от 15 000 ₽",
  },
];

export default function PricesTemplate() {
  return (
    <PageTemplate
      title="Цены на услуги"
      description="Мы предлагаем различные пакеты услуг, чтобы каждая семья могла выбрать подходящий вариант. Все цены указаны ориентировочно и могут корректироваться в зависимости от ваших пожеланий и требований."
      contactSection={{
        title: "Индивидуальный расчет",
        description:
          "Каждая ситуация уникальна. Мы готовы составить индивидуальное предложение с учетом всех ваших пожеланий и финансовых возможностей. Консультация и выезд специалиста бесплатны.",
      }}
    >
      <Suspense fallback={<SkeletonPricesList />}>
        <PricesList />
      </Suspense>

      <div>
        <h2 className="block-title">
          Дополнительные услуги
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EXTRA_SERVICES.map((item) => (
            <li
              key={item.title}
              className="flex flex-col rounded-3xl border bg-card p-6"
            >
              <p className="text-lg lg:text-xl font-medium">{item.title}</p>
              <p className="text-muted-foreground mt-1">{item.description}</p>
              <p className="text-2xl font-medium mt-6">{item.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </PageTemplate>
  );
}

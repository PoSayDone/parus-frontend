import PageTemplate from "@/modules/common/templates/page-template";
import SkeletonPricesList from "@/modules/skeletons/templates/skeleton-prices-grid";
import { Suspense } from "react";
import PricesList from "../components/prices-list";

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

      <div className="bg-muted/50 rounded-[32px] p-8 mb-8 md:pb-16 mt-12">
        <p className="text-2xl font-semibold text-foreground mb-8 text-center">
          Дополнительные услуги
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="font-semibold text-foreground mb-2">Кремация</p>
            <p className="text-muted-foreground text-sm mb-2">
              Организация кремации с урной
            </p>
            <span className="text-primary font-medium">от 25 000 ₽</span>
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground mb-2">Отпевание</p>
            <p className="text-muted-foreground text-sm mb-2">
              Религиозная церемония
            </p>
            <span className="text-primary font-medium">от 8 000 ₽</span>
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground mb-2">
              Бальзамирование
            </p>
            <p className="text-muted-foreground text-sm mb-2">
              Подготовка тела
            </p>
            <span className="text-primary font-medium">от 15 000 ₽</span>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

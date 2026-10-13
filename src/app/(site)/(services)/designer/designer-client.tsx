"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import Image from "next/image";
import ContactModal from "@/modules/contact/components/contact-modal";

// 1. Данные для конструктора (взяты из прайса)
const MATERIALS = [
  { id: "gabbro", name: "Гранит Габбро (Карелия)", color: "bg-zinc-800", image: "/images/materials/gabbro.jpg" },
  { id: "mramor", name: "Мрамор (светлый)", color: "bg-slate-100", image: "/images/materials/mramor.jpg" },
  { id: "dymovskiy", name: "Дымовский (Балтика)", color: "bg-red-900", image: "/images/materials/dymovskiy.jpg" },
  { id: "amfibolit", name: "Амфиболит гранатовый", color: "bg-stone-700", image: "/images/materials/amfibolit.jpg" },
  { id: "grey", name: "Серый гранит", color: "bg-gray-400", image: "/images/materials/grey.jpg" },
  { id: "syuskyu", name: "Сюскюянсаари (красный)", color: "bg-rose-900", image: "/images/materials/syuskyu.jpg" },
];

const PORTRAITS = [
  { id: "glass", name: "Фотостекло", desc: "Современный премиум-вариант (вклейка в нишу)", shape: "rect" },
  { id: "enamel", name: "Фотоэмаль", desc: "Классическая керамика (овал или прямоугольник)", shape: "oval" },
  { id: "engraving_a4", name: "Гравировка (А4)", desc: "Классический рисунок портрета на граните", shape: "engraving" },
  { id: "text_only", name: "Без фото", desc: "Только текстовая гравировка (ФИО и даты)", shape: "none" },
];

const EXTRAS = [
  { id: "vase", name: "Ваза (гранит/мрамор)" },
  { id: "flowerbed", name: "Цветник" },
  { id: "slab", name: "Плита мощения" },
  { id: "tile", name: "Облицовка плиткой" },
  { id: "chips", name: "Мраморная крошка" },
  { id: "fence", name: "Заливка основания / Бордюр" },
  { id: "metal_fence", name: "Ограда (металл / ковка)" },
  { id: "bench", name: "Лавка" },
  { id: "table", name: "Столик" }, 
];
const SERVICES = [
  { id: "inst_monument", name: "Установка памятника" },
  { id: "cut_tile", name: "Врезка в плитку" },
  { id: "demontage", name: "Демонтаж заливки" },
  { id: "add_polish", name: "Дополнительная полировка" },
  { id: "change_shape", name: "Изменение формы стелы" },
  { id: "reinst_enamel", name: "Переустановка фотоэмали" },
  { id: "lift_monument", name: "Подъём памятника" },
  { id: "polish_stela", name: "Полировка стелы" },
  { id: "cut_stone", name: "Резка камня" },
  { id: "retouch", name: "Ретушь" },
  { id: "inst_vase", name: "Установка вазы" },
  { id: "inst_portrait", name: "Установка портрета" },
];

const STEPS = [
  { num: 1, name: "Тип" },
  { num: 2, name: "Материал" },
  { num: 3, name: "Портрет" },
  { num: 4, name: "Участок" },
  { num: 5, name: "Заявка" },
];

// Типы для нашего состояния
type DesignerState = {
  type: "single" | "family" | null;
  material: string | null;
  portrait: string | null;
  extras: string[];
  services: string[];
};

export default function DesignerClient() {
  const [step, setStep] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия формы
  const [selections, setSelections] = useState<DesignerState>({
    type: null,
    material: null,
    portrait: null,
    extras: [],
    services: [],
  });

  // Заглушка настроек для модалки
  const modalSettings = {
    phone: "+7 342 277-72-72", 
    email: "info@parus-ritual.ru",
    address: "г. Пермь",
    footerNote: ""
  };

  // Функции навигации
  // При смене шага возвращаем посетителя к началу мастера
  const goToStep = (target: number) => {
    setStep(target);
    rootRef.current?.scrollIntoView({ block: "start" });
  };
  const nextStep = () => goToStep(Math.min(step + 1, 5));
  const prevStep = () => goToStep(Math.max(step - 1, 1));

  // Функция для безопасного клика по шагам (вперед пускает только если всё заполнено)
  const handleStepClick = (targetStep: number) => {
    if (targetStep < step) {
      goToStep(targetStep); // Назад можно всегда
      return;
    }
    // Проверки для блокировки прыжков вперед
    if (targetStep === 2 && !selections.type) return;
    if (targetStep === 3 && (!selections.type || !selections.material)) return;
    if (targetStep === 4 && (!selections.type || !selections.material || !selections.portrait)) return;
    if (targetStep === 5 && (!selections.type || !selections.material || !selections.portrait)) return;
    
    goToStep(targetStep);
  };

  

  // Функции обновления состояния
  const setType = (type: "single" | "family") => setSelections({ ...selections, type });
  const setMaterial = (material: string) => setSelections({ ...selections, material });
  const setPortrait = (portrait: string) => setSelections({ ...selections, portrait });
  const toggleService = (serviceId: string) => {
    setSelections((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  };
  
  const toggleExtra = (extraId: string) => {
    setSelections((prev) => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter((id) => id !== extraId)
        : [...prev.extras, extraId],
    }));
  };

  // Поиск выбранного материала для визуала
  const activeMaterial = MATERIALS.find((m) => m.id === selections.material);
  const activePortrait = PORTRAITS.find((p) => p.id === selections.portrait);
 // Выбор 3D-модели (Плита -> Крошка -> Цветник -> Базовая тумба)
 const modelImageSrc = selections.extras.includes("slab") 
   ? '/images/materials/plita_stela.png' 
   : selections.extras.includes("chips") 
     ? '/images/materials/cvetnik_kroshka.png' 
     : selections.extras.includes("flowerbed") 
       ? '/images/materials/obrazetc.png' 
       : '/images/materials/stela_tumba.png';

  return (
    <div ref={rootRef} className="container mx-auto px-4 pb-16 lg:pb-24 scroll-mt-24">
      {/* Прогресс бар */}
      <div className="mb-8">
        {/* На телефоне пять подписей не помещаются в строку: показываем номер и название текущего шага */}
        <div className="sm:hidden flex items-baseline justify-between gap-4 mb-3">
          <span className="text-base font-medium">{STEPS[step - 1]?.name}</span>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Шаг {step} из {STEPS.length}
          </span>
        </div>
        <div className="hidden sm:flex justify-between text-sm font-medium text-muted-foreground mb-4">
          {STEPS.map((s) => (
            <button
              type="button"
              key={s.num}
              onClick={() => handleStepClick(s.num)}
              aria-current={step === s.num ? "step" : undefined}
              className={`transition-colors hover:text-foreground ${
                step >= s.num ? "text-primary cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
            >
              {s.num}. {s.name}
            </button>
          ))}
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-[width] duration-300"
            style={{ width: `${(step / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ШАГ 1: ТИП */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl lg:text-3xl font-medium mb-6">Какой тип памятника?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              aria-pressed={selections.type === "single"}
              className={`cursor-pointer text-left outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 flex flex-col items-center justify-center p-8 h-64 text-center rounded-3xl border bg-card ${
                selections.type === "single" ? "border-primary bg-secondary-container" : "border-transparent hover:bg-secondary-container/60"
              }`}
              onClick={() => setType("single")}
            >
                <div className="w-16 h-24 bg-primary/20 rounded-t-full mb-4" />
                <span className="block text-xl font-medium">Одиночный памятник</span>
                <span className="block text-sm text-muted-foreground mt-2">Классическая вертикальная стела</span>
              </button>

            <button
              type="button"
              aria-pressed={selections.type === "family"}
              className={`cursor-pointer text-left outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 flex flex-col items-center justify-center p-8 h-64 text-center rounded-3xl border bg-card ${
                selections.type === "family" ? "border-primary bg-secondary-container" : "border-transparent hover:bg-secondary-container/60"
              }`}
              onClick={() => setType("family")}
            >
                <div className="flex gap-2 mb-4">
                  <div className="w-24 h-20 bg-primary/20 rounded-t-full" />
                </div>
                <span className="block text-xl font-medium">Семейный памятник</span>
                <span className="block text-sm text-muted-foreground mt-2">Горизонтальная стела или мемориальный комплекс</span>
              </button>
          </div>
        </div>
      )}

      {/* ШАГ 2: МАТЕРИАЛ */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl lg:text-3xl font-medium mb-6">Выберите материал</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {MATERIALS.map((mat) => (
              <button
                type="button"
                key={mat.id}
                onClick={() => setMaterial(mat.id)}
                aria-pressed={selections.material === mat.id}
                className={`cursor-pointer text-left outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 flex flex-col items-center gap-3 p-4 rounded-3xl border bg-card ${
                  selections.material === mat.id
                    ? "border-primary bg-secondary-container"
                    : "border-transparent hover:bg-secondary-container/60"
                }`}
              >
                {/* Реальная текстура камня */}
                <div className="w-24 h-24 rounded-full relative overflow-hidden bg-muted">
                  <Image 
                    src={mat.image} 
                    alt={mat.name} 
                    fill 
                    className="object-cover"
                    sizes="96px"
                  />
                  {selections.material === mat.id && (
                    <div className="absolute inset-0 bg-primary/50 flex items-center justify-center z-10">
                      <Check className="text-white w-8 h-8" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-center">{mat.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
		{/* ШАГ 3: ПОРТРЕТ */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl lg:text-3xl font-medium mb-6">Оформление портрета</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTRAITS.map((port) => (
              <button
                type="button"
                key={port.id}
                aria-pressed={selections.portrait === port.id}
                className={`cursor-pointer text-left outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 flex flex-col items-center p-6 h-full text-center rounded-3xl border bg-card ${
                  selections.portrait === port.id ? "border-primary bg-secondary-container" : "border-transparent hover:bg-secondary-container/60"
                }`}
                onClick={() => setPortrait(port.id)}
              >
                  <div className="h-16 flex items-center justify-center mb-4">
                    {port.id === 'glass' && <div className="w-10 h-14 bg-blue-100/50 border-2 border-blue-200 rounded-sm" />}
                    {port.id === 'enamel' && <div className="w-10 h-14 bg-background border border-border rounded-[50%]" />}
                    {port.id === 'engraving_a4' && (
                      <div className="w-10 h-14 border-2 border-dashed border-border flex items-center justify-center rounded-sm">
                        <span className="text-muted-foreground text-xs font-medium">А4</span>
                      </div>
                    )}
                    {port.id === 'text_only' && (
                      <div className="w-14 h-10 border-b-2 border-dashed border-border flex items-center justify-center">
                        <span className="text-muted-foreground text-xl">А-Я</span>
                      </div>
                    )}
                  </div>
                  <span className="block text-base font-medium">{port.name}</span>
                  <span className="block text-sm text-muted-foreground mt-2 leading-snug">{port.desc}</span>
                </button>
            ))}
          </div>
        </div>
      )}
      {/* ШАГ 4: БЛАГОУСТРОЙСТВО И ПРЕВЬЮ */}
      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl lg:text-3xl font-medium mb-6">Благоустройство участка</h2>
         <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
  {/* Настройки слева */}
  <div className="col-span-1 lg:col-span-3 space-y-4">
              <p className="text-muted-foreground mb-4">Выберите дополнительные элементы, которые нужно учесть при расчете:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRAS.map((extra) => {
                  const isSelected = selections.extras.includes(extra.id);
                  return (
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isSelected}
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`cursor-pointer text-left outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 flex items-center gap-3 p-4 rounded-2xl border bg-card ${
                        isSelected ? "border-primary bg-secondary-container" : "border-transparent hover:bg-secondary-container/60"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSelected ? "bg-primary border-primary" : "border-input"}`}>
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <span>{extra.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Блок: Дополнительные услуги */}
              <div className="mt-10">
                <h3 className="text-lg font-medium mb-4">Дополнительные работы и услуги</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((srv) => {
                    const isSelected = selections.services.includes(srv.id);
                    return (
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`cursor-pointer text-left outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 flex items-center gap-3 p-4 rounded-2xl border bg-card ${
                          isSelected ? "border-primary bg-secondary-container" : "border-transparent hover:bg-secondary-container/60"
                        }`}
                      >
                        <div className={`w-5 h-5 flex-shrink-0 rounded-md border flex items-center justify-center ${isSelected ? "bg-primary border-primary" : "border-input"}`}>
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <span className="leading-tight">{srv.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

         {/* Визуал справа */}
<div className="col-span-1 lg:col-span-2 lg:sticky lg:top-24 lg:self-start bg-card rounded-3xl p-6 flex flex-col items-center justify-center min-h-[450px]">
              <p className="text-sm text-muted-foreground mb-6 font-medium">Предварительный вид</p>
              
              {/* 3D Визуализация через CSS-маску */}
<div className="relative w-full max-w-[220px] aspect-[3/4] mx-auto mt-2 mb-20 flex flex-col items-center">
                 
                 {/* 1. Слой с текстурой, обрезанный по силуэту 3D-модели */}
                 <div 
                   className="absolute inset-0 z-0 transition-all duration-500"
                   style={{
                     backgroundImage: activeMaterial?.image ? `url(${activeMaterial.image})` : 'none',
                     backgroundColor: !activeMaterial?.image ? '#27272a' : 'transparent',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     WebkitMaskImage: `url('${modelImageSrc}')`,
                     WebkitMaskSize: 'contain',
                     WebkitMaskRepeat: 'no-repeat',
                     WebkitMaskPosition: 'center',
                     maskImage: `url('${modelImageSrc}')`,
                     maskSize: 'contain',
                     maskRepeat: 'no-repeat',
                     maskPosition: 'center',
                   }}
                 />
                 
                 {/* 2. Слой с объемом (возвращаем блики от оригинальной черной картинки) */}
                 <div 
                   className="absolute inset-0 z-10 mix-blend-screen opacity-80 pointer-events-none transition-opacity"
                   style={{
                     backgroundImage: `url('${modelImageSrc}')`,
                     backgroundSize: 'contain',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'center'
                   }}
                 />

                {/* 3. Портрет (ювелирная настройка) */}
                 <div className="absolute top-[25%] -translate-x-10 z-20 flex flex-col items-center skew-y-[-12deg]">
                    {activePortrait?.shape === 'rect' && (
                      <div className="w-10 h-14 bg-blue-100/40 border border-blue-200/50 shadow-inner rounded-sm backdrop-blur-sm" />
                    )}
                    {activePortrait?.shape === 'oval' && (
                      <div className="w-10 h-14 bg-zinc-100 border border-zinc-300 shadow-md rounded-[50%]" />
                    )}
                    {activePortrait?.shape === 'engraving' && (
                      <div className="w-10 h-14 bg-white/50 border-2 border-white/90 border-dashed rounded-sm flex items-center justify-center shadow-sm backdrop-blur-[1px]">
                        <span className="text-white font-medium text-[10px] drop-shadow-md">А4</span>
                      </div>
                    )}

                    {/* Имитация текста гравировки */}
                    <div className="mt-2 flex flex-col gap-1 items-center drop-shadow-sm">
                      <div className="w-12 h-1 bg-white/80 rounded-full" />
                      <div className="w-8 h-1 bg-white/80 rounded-full" />
                    </div>
                 </div>

                 {/* 4. ВАЗА (отдельный слой-накладка поверх всего) */}
                 {selections.extras.includes("vase") && (
                   <>
                     {/* Текстура камня для вазы */}
                     <div 
                       className="absolute inset-0 z-30 transition-all duration-500"
                       style={{
                         backgroundImage: activeMaterial?.image ? `url(${activeMaterial.image})` : 'none',
                         backgroundColor: !activeMaterial?.image ? '#27272a' : 'transparent',
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                         WebkitMaskImage: `url('/images/materials/vase.png')`,
                         WebkitMaskSize: 'contain',
                         WebkitMaskRepeat: 'no-repeat',
                         WebkitMaskPosition: 'center',
                         maskImage: `url('/images/materials/vase.png')`,
                         maskSize: 'contain',
                         maskRepeat: 'no-repeat',
                         maskPosition: 'center',
                       }}
                     />
                     {/* Объем и блики для вазы */}
                     <div 
                       className="absolute inset-0 z-40 mix-blend-screen opacity-80 pointer-events-none transition-opacity"
                       style={{
                         backgroundImage: `url('/images/materials/vase.png')`,
                         backgroundSize: 'contain',
                         backgroundRepeat: 'no-repeat',
                         backgroundPosition: 'center'
                       }}
                     />
                   </>
                 )}
				 {/* 5. ОГРАДА (с ручным позиционированием) */}
                 {selections.extras.includes("metal_fence") && (
                   <img
                     src="/images/materials/ograda.png"
                     alt="Ограда"
                     className="absolute z-50 pointer-events-none max-w-none"
                     style={{
                       width: '155%', 
                       
                       left: '-22%',  
                       
                       top: '-15%',   
                     }}
                   />
                 )}
				 {/* 6. ЛАВОЧКА */}
                 {selections.extras.includes("bench") && (
                   <img
                     src="/images/materials/lavka.png"
                     alt="Лавочка"
                     className="absolute z-[60] pointer-events-none max-w-none"
                     style={{
                  
                       width: '120%', 
                       left: '-30%',  
                       top: '40%',   
                     }}
                   />
                 )}
				 {/* 7. СТОЛИК */}
                 {selections.extras.includes("table") && (
                   <img
                     src="/images/materials/stolik.png"
                     alt="Столик"
                     className="absolute z-50 pointer-events-none max-w-none"
                     style={{
                       
                       width: '120%', 
                       left: '-30%',  
                       top: '20%',   
                     }}
                   />
                 )}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Визуализация схематична. Точный 3D-макет дизайнер подготовит после заявки.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ШАГ 5: ЗАЯВКА */}
      {step === 5 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-medium mb-4">Конфигурация готова</h2>
          <p className="text-muted-foreground mb-8">
            Оставьте контакты, и мы свяжемся с вами, чтобы обсудить точные размеры, гравировку и подготовить финальную смету.
          </p>
          
          <Card className="p-6 gap-0 lg:gap-0 mb-8 border-none">
            <h3 className="font-medium mb-4 text-lg">Ваш предварительный выбор</h3>
            <ul className="flex flex-col text-muted-foreground [&>li]:grid [&>li]:grid-cols-[9rem_1fr] [&>li]:gap-4 [&>li]:py-3 [&>li:not(:last-child)]:border-b">
              <li>Тип <span className="text-foreground">{selections.type === "single" ? "Одиночный" : "Семейный"}</span></li>
              <li>Материал <span className="text-foreground">{activeMaterial?.name || "Не выбран"}</span></li>
              <li>Портрет <span className="text-foreground">{activePortrait?.name || "Не выбран"}</span></li>
              {selections.extras.length > 0 && (
                <li>Благоустройство <span className="text-foreground">{selections.extras.map(e => EXTRAS.find(x => x.id === e)?.name).join(", ")}</span></li>
              )}
              {selections.services.length > 0 && (
                <li>Услуги <span className="text-foreground">{selections.services.map(s => SERVICES.find(x => x.id === s)?.name).join(", ")}</span></li>
              )}
            </ul>
          </Card>

          {/* Кнопка, открывающая модалку */}
          <Button 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Оставить заявку на расчет
          </Button>

         {/* ContactModal */}
          <ContactModal 
            open={isModalOpen} 
            onOpenChange={setIsModalOpen} 
            selectedService={`Конструктор. Тип: ${selections.type === "single" ? "Одиночный" : "Семейный"}, Мат: ${activeMaterial?.name || "-"}, Портрет: ${activePortrait?.name || "-"}, Допы: ${selections.extras.length > 0 ? selections.extras.map(e => EXTRAS.find(x => x.id === e)?.name).join(", ") : "Нет"}, Услуги: ${selections.services.length > 0 ? selections.services.map(s => SERVICES.find(x => x.id === s)?.name).join(", ") : "Нет"}`}
            settings={modalSettings}
            title="Запросить расчет стоимости"
            description="Оставьте контакты, и наш специалист перезвонит для обсуждения деталей макета и точных размеров."
            submitText="Получить расчет"
          />
        </div>
      )}

      {/* Навигация (Кнопки Назад/Вперед) */}
      <div className="mt-8 lg:mt-12 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={step === 1}
          className={step === 1 ? "invisible" : ""}
        >
          <ChevronLeft />
          Назад
        </Button>

        {step < 5 && (
          <Button 
            onClick={nextStep} 
            disabled={
              (step === 1 && !selections.type) || 
              (step === 2 && !selections.material) ||
              (step === 3 && !selections.portrait)
            }
            className="px-8"
          >
            Далее
            <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
}
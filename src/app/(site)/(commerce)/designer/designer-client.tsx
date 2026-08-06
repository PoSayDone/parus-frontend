"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Функция для безопасного клика по шагам (вперед пускает только если всё заполнено)
  const handleStepClick = (targetStep: number) => {
    if (targetStep < step) {
      setStep(targetStep); // Назад можно всегда
      return;
    }
    // Проверки для блокировки прыжков вперед
    if (targetStep === 2 && !selections.type) return;
    if (targetStep === 3 && (!selections.type || !selections.material)) return;
    if (targetStep === 4 && (!selections.type || !selections.material || !selections.portrait)) return;
    if (targetStep === 5 && (!selections.type || !selections.material || !selections.portrait)) return;
    
    setStep(targetStep);
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
  const activePortrait = PORTRAITS.find((p) => p.id === selections.portrait); // <-- Добавить эту строку
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      {/* Прогресс бар */}
      <div className="mb-8">
        <div className="flex justify-between text-xs md:text-sm font-medium text-muted-foreground mb-4">
          {[
            { num: 1, label: "1. Тип" },
            { num: 2, label: "2. Материал" },
            { num: 3, label: "3. Портрет" },
            { num: 4, label: "4. Участок" },
            { num: 5, label: "5. Заявка" },
          ].map((s) => (
            <span
              key={s.num}
              onClick={() => handleStepClick(s.num)}
              className={`transition-colors hover:text-foreground ${
                step >= s.num ? "text-primary cursor-pointer" : "hidden sm:inline cursor-not-allowed opacity-50"
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* ШАГ 1: ТИП */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-medium mb-6 text-center">Какой тип памятника?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className={`cursor-pointer transition-all hover:border-primary ${
                selections.type === "single" ? "border-primary ring-2 ring-primary/20" : ""
              }`}
              onClick={() => setType("single")}
            >
              <CardContent className="flex flex-col items-center justify-center p-12 h-64 text-center">
                <div className="w-16 h-24 bg-muted rounded-t-full mb-4" />
                <h3 className="text-xl font-medium">Одиночный памятник</h3>
                <p className="text-sm text-muted-foreground mt-2">Классическая вертикальная стела</p>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:border-primary ${
                selections.type === "family" ? "border-primary ring-2 ring-primary/20" : ""
              }`}
              onClick={() => setType("family")}
            >
              <CardContent className="flex flex-col items-center justify-center p-12 h-64 text-center">
                <div className="flex gap-2 mb-4">
                  <div className="w-24 h-20 bg-muted rounded-t-full" />
                </div>
                <h3 className="text-xl font-medium">Семейный памятник</h3>
                <p className="text-sm text-muted-foreground mt-2">Горизонтальная стела или мемориальный комплекс</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ШАГ 2: МАТЕРИАЛ */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-medium mb-6 text-center">Выберите материал</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {MATERIALS.map((mat) => (
              <div
                key={mat.id}
                onClick={() => setMaterial(mat.id)}
                className={`cursor-pointer group flex flex-col items-center gap-3 p-4 rounded-xl border transition-all ${
                  selections.material === mat.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "hover:border-primary/50"
                }`}
              >
                {/* Реальная текстура камня */}
                <div className="w-24 h-24 rounded-full shadow-inner relative overflow-hidden bg-muted">
                  <Image 
                    src={mat.image} 
                    alt={mat.name} 
                    fill 
                    className="object-cover"
                    sizes="96px"
                  />
                  {selections.material === mat.id && (
                    <div className="absolute inset-0 bg-primary/40 flex items-center justify-center backdrop-blur-[2px] z-10">
                      <Check className="text-white w-8 h-8 drop-shadow-md" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-center">{mat.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
		{/* ШАГ 3: ПОРТРЕТ */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-medium mb-6 text-center">Оформление портрета</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTRAITS.map((port) => (
              <Card
                key={port.id}
                className={`cursor-pointer transition-all hover:border-primary ${
                  selections.portrait === port.id ? "border-primary ring-2 ring-primary/20 bg-primary/5" : ""
                }`}
                onClick={() => setPortrait(port.id)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
                  <div className="h-16 flex items-center justify-center mb-4">
                    {port.id === 'glass' && <div className="w-10 h-14 bg-blue-100/50 border-2 border-blue-200 shadow-inner rounded-sm" />}
                    {port.id === 'enamel' && <div className="w-10 h-14 bg-white border border-gray-300 shadow-sm rounded-[50%]" />}
                    {port.id === 'engraving_a4' && (
                      <div className="w-10 h-14 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-sm">
                        <span className="text-gray-400 text-xs font-medium">А4</span>
                      </div>
                    )}
                    {port.id === 'text_only' && (
                      <div className="w-14 h-10 border-b-2 border-dashed border-gray-300 flex items-center justify-center">
                        <span className="text-gray-400 font-serif text-xl">А-Я</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-base font-medium">{port.name}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{port.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {/* ШАГ 4: БЛАГОУСТРОЙСТВО И ПРЕВЬЮ */}
      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-medium mb-6">Благоустройство участка</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Настройки слева */}
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <p className="text-muted-foreground mb-4">Выберите дополнительные элементы, которые нужно учесть при расчете:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRAS.map((extra) => {
                  const isSelected = selections.extras.includes(extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                        isSelected ? "border-primary bg-primary/5" : "hover:border-border/80"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSelected ? "bg-primary border-primary" : "border-input"}`}>
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <span className="font-medium">{extra.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Блок: Дополнительные услуги */}
              <div className="mt-8 border-t border-border/50 pt-8">
                <h3 className="text-lg font-medium mb-4">Дополнительные работы и услуги</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((srv) => {
                    const isSelected = selections.services.includes(srv.id);
                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                          isSelected ? "border-primary bg-primary/5" : "hover:border-border/80"
                        }`}
                      >
                        <div className={`w-5 h-5 flex-shrink-0 rounded-md border flex items-center justify-center ${isSelected ? "bg-primary border-primary" : "border-input"}`}>
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <span className="font-medium text-sm leading-tight">{srv.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

           {/* Визуал справа */}
            <div className="col-span-1 bg-muted/30 rounded-3xl p-6 border flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-sm text-muted-foreground mb-6 font-medium uppercase tracking-wider">Предварительный вид</p>
              {/* Примитивная визуализация */}
              <div className="relative flex flex-col items-center mt-10 mb-8">
                
                {/* 1. Облицовка плиткой (ВРЕМЕННО ОТКЛЮЧЕНО через false &&) */}
                {false && selections.extras.includes("tile") && (
                  <div className="absolute -bottom-8 -left-12 -right-12 h-32 bg-stone-200/50 border border-stone-300 shadow-inner grid grid-cols-5 grid-rows-3 gap-[2px] p-[2px]">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={i} className="bg-stone-200/80 rounded-sm" />
                    ))}
                  </div>
                )}

                {/* 2. Заливка основания / Бордюр (ВРЕМЕННО ОТКЛЮЧЕНО) */}
                {false && selections.extras.includes("fence") && (
                  <div className="absolute -bottom-10 -left-14 -right-14 h-36 border-4 border-stone-400 rounded-sm z-0" />
                )}

                {/* Стела (ОСТАВЛЯЕМ: Текстура + Портрет) */}
                <div 
                  className={`shadow-xl transition-all duration-500 relative z-10 flex flex-col items-center pt-6 ${
                    selections.type === 'family' ? 'w-48 h-32 rounded-t-xl' : 'w-32 h-48 rounded-t-full'
                  } ${!activeMaterial?.image ? (activeMaterial?.color || 'bg-zinc-800') : ''}`} 
                  style={activeMaterial?.image ? { backgroundImage: `url(${activeMaterial.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  {/* ПОРТРЕТ НА СТЕЛЕ */}
                  {activePortrait?.shape === 'rect' && (
                    <div className="w-12 h-16 bg-blue-100/40 border border-blue-200/50 shadow-inner rounded-sm backdrop-blur-sm" />
                  )}
                  {activePortrait?.shape === 'oval' && (
                    <div className="w-12 h-16 bg-zinc-100 border border-zinc-300 shadow-md rounded-[50%]" />
                  )}
                  {activePortrait?.shape === 'engraving' && (
                    <div className="w-12 h-16 bg-white/50 border-2 border-white/90 border-dashed rounded-sm flex items-center justify-center shadow-sm backdrop-blur-[1px]">
                      <span className="text-white font-bold text-[10px] drop-shadow-md uppercase">А4</span>
                    </div>
                  )}
                  {/* Имитация текста гравировки */}
                  <div className="mt-3 flex flex-col gap-1.5 items-center drop-shadow-sm">
                    <div className="w-16 h-1.5 bg-white/80 rounded-full" />
                    <div className="w-10 h-1.5 bg-white/80 rounded-full" />
                  </div>
                </div>
                
                {/* Тумба (ОСТАВЛЯЕМ: Текстура) */}
                <div 
                  className={`w-56 h-8 mt-1 shadow-lg transition-all duration-500 relative z-10 flex items-end justify-end px-4 ${
                    !activeMaterial?.image ? (activeMaterial?.color || 'bg-zinc-800') : ''
                  }`}
                  style={activeMaterial?.image ? { backgroundImage: `url(${activeMaterial.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  {/* 3. Ваза на тумбе (ВРЕМЕННО ОТКЛЮЧЕНО) */}
                  {false && selections.extras.includes("vase") && (
                    <div 
                      className={`w-5 h-10 rounded-b-lg rounded-t-sm shadow-2xl -mt-8 border-x border-t border-white/20 ${
                        !activeMaterial?.image ? (activeMaterial?.color || 'bg-zinc-800') : ''
                      }`}
                      style={activeMaterial?.image ? { backgroundImage: `url(${activeMaterial.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                    />
                  )}
                </div>
                
                {/* Цветник и 4. Мраморная крошка (ВРЕМЕННО ОТКЛЮЧЕНО) */}
                {false && selections.extras.includes("flowerbed") && (
                  <div 
                    className={`w-48 h-16 mt-1 relative z-10 transition-all duration-500 p-2 shadow-inner ${
                      !activeMaterial?.image ? (activeMaterial?.color || 'bg-zinc-800') : ''
                    }`}
                    style={activeMaterial?.image ? { backgroundImage: `url(${activeMaterial.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                  >
                     {/* Внутренняя часть (земля или крошка) */}
                     <div className={`w-full h-full rounded-sm shadow-inner transition-colors ${
                       selections.extras.includes("chips") ? "bg-slate-200" : "bg-stone-800/80"
                     }`}>
                       {selections.extras.includes("chips") && (
                          <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
                       )}
                     </div>
                  </div>
                )}
              </div>
              
              <p className="text-center text-xs text-muted-foreground mt-8">
                * Визуализация схематична. Точный 3D-макет дизайнер подготовит после заявки.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ШАГ 5: ЗАЯВКА */}
      {step === 5 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-medium mb-4">Конфигурация готова</h2>
          <p className="text-muted-foreground mb-8">
            Оставьте контакты, и мы свяжемся с вами, чтобы обсудить точные размеры, гравировку и подготовить финальную смету.
          </p>
          
          <Card className="p-6 text-left mb-8 bg-muted/30 shadow-none">
            <h3 className="font-medium mb-4 text-lg">Ваш предварительный выбор:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Тип: <span className="text-foreground">{selections.type === "single" ? "Одиночный" : "Семейный"}</span></li>
              <li>• Материал: <span className="text-foreground">{activeMaterial?.name || "Не выбран"}</span></li>
              <li>• Портрет: <span className="text-foreground">{activePortrait?.name || "Не выбран"}</span></li>
              {selections.extras.length > 0 && (
                <li>• Благоустройство: <span className="text-foreground">{selections.extras.map(e => EXTRAS.find(x => x.id === e)?.name).join(", ")}</span></li>
              )}
              {selections.services.length > 0 && (
                <li>• Услуги: <span className="text-foreground">{selections.services.map(s => SERVICES.find(x => x.id === s)?.name).join(", ")}</span></li>
              )}
            </ul>
          </Card>

          {/* Кнопка, открывающая модалку */}
          <Button 
            size="lg" 
            className="w-full h-14 text-lg rounded-full"
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
      <div className="mt-12 flex justify-between items-center pt-6 border-t border-border/50">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={step === 1}
          className={step === 1 ? "invisible" : ""}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
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
            className="px-8 rounded-full"
          >
            Далее
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
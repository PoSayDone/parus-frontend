"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Импортируем утилиту для классов, если она есть

export default function ServiceGallery({ images, title }: { images: string[], title: string }) {
  const [selected, setSelected] = useState<{src: string, index: number} | null>(null);

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selected) return;
    const nextIndex = (selected.index + 1) % images.length;
    setSelected({ src: images[nextIndex], index: nextIndex });
  }, [selected, images]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selected) return;
    const prevIndex = (selected.index - 1 + images.length) % images.length;
    setSelected({ src: images[prevIndex], index: prevIndex });
  }, [selected, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selected) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, showNext, showPrev]);

  return (
    <div className="mb-12">
      <p className="text-2xl font-medium text-foreground mb-6">Фотогалерея</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={image + index} 
            className="relative aspect-square cursor-pointer group rounded-lg overflow-hidden bg-secondary/20 border border-border" // Добавили фон и легкую рамку
            onClick={() => setSelected({ src: image, index })}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${title} — фото ${index + 1}`}
              // ИЗМЕНЕНИЕ: меняем object-cover на object-contain
              // Это "впишет" фото целиком, не обрезая его
              className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Модальное окно (Лайтбокс) - без изменений, там фото всегда целиком */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-5xl w-[95vw] h-auto max-h-[95vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center focus:outline-none rounded-none data-[state=open]:animate-in data-[state=closed]:animate-out overflow-hidden">
          <DialogHeader>
             <VisuallyHidden>
                <DialogTitle>Просмотр фото: {title}</DialogTitle>
             </VisuallyHidden>
          </DialogHeader>
          
          {selected && (
            <div className="relative w-full h-auto min-h-[300px] flex items-center justify-center p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
              {/* Кнопки навигации и фото... (тут всё как было) */}
               {images.length > 1 && (
                <button onClick={showPrev} className="absolute left-2 md:left-8 z-50 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
                </button>
              )}

              <img
                src={selected.src}
                alt={`${title} — фото ${selected.index + 1} (увеличенное)`}
                className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 select-none"
                style={{ boxShadow: "0 0 20px rgba(0,0,0,0.5)" }}
              />

              {images.length > 1 && (
                <button onClick={showNext} className="absolute right-2 md:right-8 z-50 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
                </button>
              )}
              
               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/90 text-base font-medium px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm">
                {selected.index + 1} из {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LabelInput from "@/components/ui/floating-input";
import FloatingTextarea from "@/components/ui/floating-textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { createContactRequest } from "@/lib/data/contact-requests";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, "Введите номер телефона")
    // Разрешаем плюс, цифры, пробелы, тире и круглые скобки
    .regex(/^[+\d\s\-\(\)]+$/, "Некорректный формат телефона"), 
  email: z.string().optional().or(z.literal("")),
  service: z.string().optional(),
  plan: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService?: string;
  selectedPlan?: string;
  settings: {
    phone: string;
    email: string;
    address: string;
    footerNote: string;
  };
  title?: string;
  description?: string;
  submitText?: string;
}

export default function ContactModal({
  open,
  onOpenChange,
  selectedService,
  selectedPlan,
  settings,
  title = "Заказать звонок",
  description = "Мы перезвоним в течение 15 минут",
  submitText = "Жду звонка",
}: ContactModalProps) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: selectedService || "",
      plan: selectedPlan || "",
      message: "",
    },
  });

  const addressLines = useMemo(
    () => settings.address.split("\n"),
    [settings.address],
  );

  const onSubmit = async (data: ContactFormData) => {
  try {
    const pageTitle = typeof document !== "undefined" ? document.title : "";
    const pageUrl = typeof window !== "undefined" ? window.location.pathname : "";
    const sourceInfo = `Заявка со страницы: ${pageTitle} (${pageUrl})`;

    // Очищаем номер: оставляем только цифры и плюс
    const cleanPhone = data.phone.replace(/[^\d+]/g, '');

    await createContactRequest({
      name: data.name || "Не указано",
      phone: cleanPhone, // Передаем очищенный номер!
      email: "-", 
      service: selectedService || "-", 
      plan: selectedPlan || "-",       
      message: sourceInfo,
    });
	  // --- ОТПРАВКА ЦЕЛИ В МЕТРИКУ ---
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym(106913480, 'reachGoal', 'lead_form_submit');
      }
      // ----------------------------------------
      toast.success("Заявка отправлена");
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting contact request:", error);
      toast.error("Не удалось отправить заявку");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-full! rounded-2xl mb-8 md:mb-auto md:max-w-125! px-0">
        <DialogHeader className="px-6 text-start mb-2">
          <DialogTitle className="text-2xl font-medium">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>

<Form {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="space-y-3 mt-2 px-6" // Уменьшили space-y и mt
  >
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <LabelInput
              label="Имя" // Убрали звездочку
              placeholder="Как к вам обращаться?"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <LabelInput
              label="Телефон *"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

           {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LabelInput
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingTextarea
                      label="Сообщение"
                      placeholder="Расскажите подробнее о ваших потребностях..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="pt-2"> {/* Убрали контейнер с двумя кнопками */}
      <Button 
        type="submit" 
        className="w-full h-12 text-base"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Отправка..." : submitText}
      </Button>
    </div>
  </form>
</Form>

        {/* Добавили hidden md:block, чтобы скрыть линию на мобилках */}
        <Separator className="hidden md:block my-2" />

        {/* Добавили hidden md:block и pb-4 для аккуратного отступа снизу */}
        <div className="hidden md:block px-6 pb-4">
          <div className="font-medium mb-3">Или свяжитесь с нами напрямую:</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a
                href={`tel:${settings.phone}`}
                className="text-primary hover:underline"
              >
                {settings.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a
                href={`mailto:${settings.email}`}
                className="text-primary hover:underline"
              >
                {settings.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                {addressLines.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {line}
                    {index < addressLines.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Круглосуточно, без выходных
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

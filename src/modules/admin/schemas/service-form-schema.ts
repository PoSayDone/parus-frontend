import { z } from "zod";

export const serviceFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Название должно содержать минимум 2 символа" })
    .max(200, { message: "Название должно содержать максимум 200 символов" }),
  shortDescription: z
    .string()
    .max(500, { message: "Краткое описание должно содержать максимум 500 символов" })
    .optional(),
  description: z
    .string()
    .min(10, { message: "Описание должно содержать минимум 10 символов" }),
  icon: z.string().optional(),
  image: z.string().optional(),
  price: z
    .string()
    .min(1, { message: "Цена обязательна" }),
  duration: z.string().optional(),
  features: z.array(z.string()).optional(),
  included: z.array(z.string()).optional(),
  gallery: z.array(z.string()).optional(),
  active: z.boolean().default(true),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

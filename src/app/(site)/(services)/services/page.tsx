import ServicesTemplate from "@/modules/services/templates";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ритуальные услуги - Парус",
  description:
    "Профессиональные ритуальные услуги от компании Парус. Организация похорон, кремация, транспортировка, бальзамирование и другие услуги.",
  openGraph: {
    title: "Ритуальные услуги - Парус",
    description:
      "Профессиональные ритуальные услуги от компании Парус. Организация похорон, кремация, транспортировка, бальзамирование и другие услуги.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesTemplate />;
}

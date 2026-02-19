import { getSiteSettings } from "@/lib/data/site-settings";
import { Toaster } from "@/components/ui/sonner";
import ContactModalProvider from "@/modules/contact/components/contact-modal-provider";
import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";
import YandexMetrika from "@/components/analytics/yandex-metrika"

export const metadata: Metadata = {
  metadataBase: new URL("https://parus-ritual.ru"),
  title: {
    default: "Парус - Ритуальные услуги и товары",
    template: "%s | Парус",
  },
  description:
    "Профессиональные ритуальные услуги и качественные ритуальные товары от компании Парус. Поможем в трудную минуту с уважением и заботой.",
  authors: [{ name: "Парус" }],
  creator: "Парус",
  publisher: "Парус",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://parus-ritual.ru",
    title: "Парус - Ритуальные услуги и товары",
    description:
      "Профессиональные ритуальные услуги и качественные ритуальные товары от компании Парус. Поможем в трудную минуту с уважением и заботой.",
    siteName: "Парус",
  },
  twitter: {
    card: "summary_large_image",
    title: "Парус - Ритуальные услуги и товары",
    description:
      "Профессиональные ритуальные услуги и качественные ритуальные товары от компании Парус. Поможем в трудную минуту с уважением и заботой.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const golos = Golos_Text({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const settings = await getSiteSettings();
// Задаем значения с "запасным вариантом" (fallback)
  const phone = settings?.phone || "+7 (342) 277-72-72";
  const address = settings?.address || "г. Пермь, Красноборская, 200";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FuneralService",
    "name": "Парус",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address, 
      "addressLocality": "Пермь",
      "addressCountry": "RU"
    },
    "telephone": phone,
    "url": "https://parus-ritual.ru",
    "logo": "https://parus-ritual.ru/logo.svg",
    "image": "https://parus-ritual.ru/images/og-image.png",
    "priceRange": "15000+ RUB"
  };
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${golos.className} antialiased`}>
        <ContactModalProvider />
        <Toaster />
        {children}
		<script
		  type="application/ld+json"
		  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
		<YandexMetrika /> 
      </body>
    </html>
  );
}

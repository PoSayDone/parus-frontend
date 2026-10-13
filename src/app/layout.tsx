import { getSiteSettings } from "@/lib/data/site-settings";
import { Toaster } from "@/components/ui/sonner";
import ContactModalProvider from "@/modules/contact/components/contact-modal-provider";
import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";
import { PhoneClickTracker } from "@/components/phone-click-tracker";
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

// Вариативный файл: на сайте используются только начертания 400 и 500
const golos = Golos_Text({
  subsets: ["cyrillic", "latin"],
  variable: "--font-golos-text",
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
    "@type": "LocalBusiness",
    "name": "Ритуальное агентство Парус",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address, 
      "addressLocality": "Пермь",
      "postalCode": "614067",
      "addressCountry": "RU"
    },
    "telephone": phone,
	"openingHours": "Mo-Su 00:00-23:59", // Добавили круглосуточный график
    "url": "https://parus-ritual.ru",
    "logo": "https://parus-ritual.ru/logo.svg",
    "image": "https://parus-ritual.ru/images/og-image.png",
    "priceRange": "15000+ RUB"
  };
  return (
    <html lang="ru" className={golos.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
	  <ContactModalProvider />
	  <PhoneClickTracker /> 
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

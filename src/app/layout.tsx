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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${golos.className} antialiased`}>
        <ContactModalProvider />
        <Toaster />
        {children}
		<YandexMetrika /> //Яндекс.Метрика
      </body>
    </html>
  );
}

import { buttonVariants } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/data/site-settings";
import { formatPhoneNumber } from "@/lib/utils";
import Logo from "@/modules/common/icons/logo";
import SkeletonFooterDocuments from "@/modules/skeletons/components/skeleton-footer-documents";
import { Phone } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import FooterDocuments from "../../components/footer-documents";

const DEFAULT_ADDRESS = "г. Пермь, Советской армии 52\nэтаж 128, офис 812";
const DEFAULT_PHONE = "+79999999999";
const DEFAULT_EMAIL = "parus@perm.ru";
const DEFAULT_FOOTER_NOTE =
  "Похоронное бюро в СПб ООО «Центр РУ». © 2025. ИНН: 7813661578, КПП: 780601001";

export default async function Footer() {
  const settings = await getSiteSettings();
  const address = settings?.address || DEFAULT_ADDRESS;
  const phone = settings?.phone || DEFAULT_PHONE;
  const email = settings?.email || DEFAULT_EMAIL;
  const footerNote = settings?.footerNote || DEFAULT_FOOTER_NOTE;
  const addressLines = address.split("\n");

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12 lg:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8 lg:mb-12">
        <div className="flex flex-col gap-2">
          <Link href={"/"} aria-label="Парус, на главную" className="mb-2">
            <Logo size={32} />
          </Link>
          <p className="text-sm">
            {addressLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < addressLines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <a href={`mailto:${email}`} className="text-sm hover:underline">
            {email}
          </a>
          <a href={`tel:${phone}`} className="text-sm hover:underline">
            {formatPhoneNumber(phone)}
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-lg mb-2">Покупателям</p>
          <Suspense fallback={<SkeletonFooterDocuments />}>
            <FooterDocuments />
          </Suspense>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-xl lg:text-2xl font-medium mb-2">
            Не нашли ответ на вопрос?
          </p>
          <p className="mb-6 text-muted-foreground">
            Напишите нам удобным способом
            <br /> и специалист ответит в течение 5 минут
          </p>
          <a 
		  href={`tel:${phone}`} 
		  className={buttonVariants({ size: "lg" })}
		>
		  <Phone />
		  Задать вопрос
		</a>
        </div>
      </div>
      <p className="text-muted-foreground text-sm">{footerNote}</p>
      </div>
    </footer>
  );
}

import { buttonVariants } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/data/site-settings";
import { formatPhoneNumber } from "@/lib/utils";
import Logo from "@/modules/common/icons/logo";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
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
    <footer className="px-8 py-10 md:p-20 flex flex-col justify-between border-t">
      <div className="flex flex-col md:flex-row justify-between items-start py-6 gap-6 md:mb-6">
        <div className="flex flex-col gap-2">
          <Link href={"/"} className="font-bold text-xl mb-2">
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
          <Link href={`tel:${phone}`} className="text-sm">
            {formatPhoneNumber(phone)}
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-xl mb-2">Компания</p>
          {/*<Link href={"/"} className="text-sm">
            О нас
          </Link>
          <Link href={"/"} className="text-sm">
            Новости
          </Link>
          <Link href={"/admin"} className="text-sm">
           Панель
          </Link> */}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-xl mb-2">Покупателям</p>
          <ul>
            <Suspense fallback={<SkeletonFooterDocuments />}>
              <FooterDocuments />
            </Suspense>
          </ul>
        </div>
        <div className="flex-col justify-start items-start text-start flex py-8 md:py-0">
          <p className="text-2xl font-medium mb-2">
            Не нашли ответ на вопрос?
          </p>
          <p className="mb-4">
            Напишите нам удобным способом
            <br /> и специалист ответит в течение 5 минут
          </p>
          <ContactModalTrigger className={buttonVariants({ size: "lg" })}>
            <Phone />
            Задать вопрос
          </ContactModalTrigger>
        </div>
      </div>
      <p className="text-muted-foreground text-sm">{footerNote}</p>
    </footer>
  );
}

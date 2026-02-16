import { TypographyH2 } from "@/components/typography";
import { getSiteSettings } from "@/lib/data/site-settings";
import Link from "next/link";

export default async function NotFound() {
  const settings = await getSiteSettings();
  const showCatalog = settings?.showCatalog ?? true;

  return (
    <main className="min-h-[calc(100dvh-64px)] flex flex-col items-start justify-center px-4 py-16 container mx-auto">
      <p className="text-sm font-medium text-muted-foreground">Ошибка 404</p>
      <TypographyH2>Страница не найдена</TypographyH2>
      <p className="mt-3 text-muted-foreground">
        Возможно, ссылка устарела или страница была перемещена.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}

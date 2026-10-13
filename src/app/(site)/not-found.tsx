import { TypographyH1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/data/site-settings";
import Link from "next/link";

export default async function NotFound() {
  const settings = await getSiteSettings();
  const showCatalog = settings?.showCatalog ?? true;

  return (
    <main className="min-h-[calc(100dvh-64px)] flex flex-col items-start justify-center px-4 py-16 container mx-auto">
      <p className="text-sm font-medium text-muted-foreground">Ошибка 404</p>
      <TypographyH1 className="mt-2">Страница не найдена</TypographyH1>
      <p className="mt-4 text-lg text-muted-foreground">
        Возможно, ссылка устарела или страница была перемещена.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className={buttonVariants({ size: "lg" })}
        >
          На главную
        </Link>
      </div>
    </main>
  );
}

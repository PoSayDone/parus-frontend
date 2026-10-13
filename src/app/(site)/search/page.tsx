import prisma from '../../../../prisma/client';
import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar'; 
import { Metadata } from 'next';
import { TypographyH1 } from '@/components/typography';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Поиск по сайту | Парус',
  description: 'Поиск услуг, адресов кладбищ, моргов и товаров в каталоге похоронного бюро Парус.',
  alternates: {
    canonical: '/search', 
  },
};

// 1. Обновляем типизацию: теперь searchParams — это Promise
interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // 2. ДОЖИДАЕМСЯ параметров из URL с помощью await
  const params = await searchParams;
  
  // 3. Теперь безопасно достаем текст запроса
  const q = typeof params?.q === 'string' ? params.q : '';

  // Создаем пустые массивы, чтобы заполнить их, если запрос есть
  let services: any[] = [];
  let addresses: any[] = [];
  let products: any[] = [];
  let posts: any[] = [];

  // Делаем запрос к БД только если есть поисковая фраза
  if (q) {
    [services, addresses, products, posts] = await Promise.all([
      prisma.service.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
          active: true,
        },
        select: { id: true, title: true, shortDescription: true, handle: true },
      }),
      prisma.address.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { address: { contains: q, mode: 'insensitive' } },
          ],
          active: true,
        },
        select: { id: true, name: true, type: true, handle: true, address: true },
      }),
      prisma.product.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
          active: true,
        },
        select: { id: true, title: true, handle: true },
      }),
      prisma.blogPost.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
          draft: false,
        },
        select: { id: true, title: true, handle: true },
      }),
    ]);
  }

  const ADDRESS_TYPE_LABELS: Record<string, string> = {
    cemetery: 'Кладбище',
    morgue: 'Морг',
    zags: 'ЗАГС',
  };

  const groups: {
    title: string;
    items: { id: string; title: string; href: string; description?: string | null; label?: string }[];
  }[] = [
    {
      title: 'Услуги',
      items: services.map((item) => ({
        id: item.id,
        title: item.title,
        href: `/services/${item.handle}`,
        description: item.shortDescription,
      })),
    },
    {
      title: 'Учреждения и адреса',
      items: addresses.map((item) => ({
        id: item.id,
        title: item.name,
        // Отдельные страницы есть только у кладбищ
        href: item.type === 'cemetery' && item.handle ? `/addresses/${item.handle}` : '/addresses',
        description: item.address,
        label: ADDRESS_TYPE_LABELS[item.type],
      })),
    },
    {
      title: 'Товары',
      items: products.map((item) => ({
        id: item.id,
        title: item.title,
        href: `/products/${item.handle}`,
      })),
    },
    {
      title: 'Статьи',
      items: posts.map((item) => ({
        id: item.id,
        title: item.title,
        href: `/blog/post/${item.handle}`,
      })),
    },
  ].filter((group) => group.items.length > 0);

  const totalResults = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="container mx-auto px-4 page-pad min-h-[60vh]">
      <TypographyH1 className="page-header">Поиск по сайту</TypographyH1>

      <div className="max-w-2xl">
        <SearchBar defaultValue={q} key={q} />
      </div>

      {!q ? (
        <p className="mt-8 text-lg text-muted-foreground">
          Введите запрос, чтобы найти услуги, адреса, товары и статьи.
        </p>
      ) : totalResults === 0 ? (
        <div className="mt-8 flex flex-col gap-4">
          <p className="text-lg text-muted-foreground max-w-2xl">
            По запросу «{q}» ничего не найдено. Попробуйте изменить запрос
            или перейдите в один из разделов:
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/services" className={buttonVariants({ variant: 'outline' })}>
              Услуги
            </Link>
            <Link href="/addresses" className={buttonVariants({ variant: 'outline' })}>
              Адреса
            </Link>
            <Link href="/prices" className={buttonVariants({ variant: 'outline' })}>
              Цены
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-6 mb-8 lg:mb-12 text-muted-foreground">
            По запросу «{q}» найдено: {totalResults}
          </p>

          <div className="flex flex-col gap-12 lg:gap-16">
            {groups.map((group) => (
              <section key={group.title}>
                <h2 className="block-title">
                  {group.title}{' '}
                  <span className="text-muted-foreground">{group.items.length}</span>
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className="flex h-full flex-col gap-1.5 rounded-3xl border bg-card p-6 transition-colors hover:border-primary/40"
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-lg font-medium leading-tight">{item.title}</span>
                          {item.label && (
                            <Badge variant="outline" className="rounded-full bg-background mt-0.5">
                              {item.label}
                            </Badge>
                          )}
                        </span>
                        {item.description && (
                          <span className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

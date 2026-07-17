import prisma from '../../../../prisma/client';
import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar'; 
import { Metadata } from 'next';

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
        select: { id: true, name: true, type: true, handle: true },
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

  const totalResults = services.length + addresses.length + products.length + posts.length;
  const isSearchEmpty = !q || totalResults === 0;

  return (
    // Класс min-h-[60vh] гарантирует, что блок займет минимум 60% высоты экрана, отталкивая футер вниз
    <div className="container mx-auto px-4 py-10 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">
        {q ? `Результаты поиска по запросу: «${q}»` : 'Поиск по сайту'}
      </h1>

      {/* БЛОК ПУСТОЙ ВЫДАЧИ ИЛИ ОТСУТСТВИЯ ЗАПРОСА */}
      {isSearchEmpty ? (
        <div className="mt-8 flex flex-col gap-6">
          <p className="text-lg text-gray-700">
            К сожалению, мы не нашли ответ на ваш запрос. Вы можете повторить поиск или поискать нужную информацию в популярных разделах:
          </p>
          
          <div className="max-w-xl w-full">
            <SearchBar />
          </div>

          <div className="flex gap-6 mt-4">
            <Link href="/services" className="hover:underline font-medium">
              Услуги
            </Link>
            <Link href="/addresses" className="hover:underline font-medium">
              Адреса
            </Link>
            {/* <Link href="/store" className="hover:underline font-medium">
              Каталог
            </Link> */}
          </div>
        </div>
      ) : (
        /* БЛОК С РЕЗУЛЬТАТАМИ ПОИСКА */
        <>
          <p className="mb-8 text-gray-600">Найдено совпадений: {totalResults}</p>

          <div className="flex flex-col gap-8">
            {services.length > 0 && (
              <section>
                <p className="text-2xl font-semibold mb-4 border-b pb-2">Услуги</p>
                <ul className="flex flex-col gap-3">
                  {services.map((item) => (
                    <li key={item.id}>
                      <Link href={`/services/${item.handle}`} className="text-blue-600 hover:underline text-lg">
                        {item.title}
                      </Link>
                      {item.shortDescription && <p className="text-sm text-gray-600">{item.shortDescription}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {addresses.length > 0 && (
              <section>
                <p className="text-2xl font-semibold mb-4 border-b pb-2">Учреждения и адреса</p>
                <ul className="flex flex-col gap-3">
                  {addresses.map((item) => (
                    <li key={item.id}>
                      <Link href={`/${item.type}/${item.handle}`} className="text-blue-600 hover:underline text-lg">
                        {item.name}
                      </Link>
                      <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded text-gray-700">
                        {item.type === 'cemetery' ? 'Кладбище' : item.type === 'morgue' ? 'Морг' : 'ЗАГС'}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {products.length > 0 && (
              <section>
                <p className="text-2xl font-semibold mb-4 border-b pb-2">Товары</p>
                <ul className="flex flex-col gap-3">
                  {products.map((item) => (
                    <li key={item.id}>
                      <Link href={`/catalog/${item.handle}`} className="text-blue-600 hover:underline text-lg">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {posts.length > 0 && (
              <section>
                <p className="text-2xl font-semibold mb-4 border-b pb-2">Статьи</p>
                <ul className="flex flex-col gap-3">
                  {posts.map((item) => (
                    <li key={item.id}>
                      <Link href={`/blog/${item.handle}`} className="text-blue-600 hover:underline text-lg">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </>
      )}
    </div>
  );
}
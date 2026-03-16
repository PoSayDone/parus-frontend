import Link from "next/link";
import { ChevronRight } from "lucide-react"; 

export type BreadcrumbItem = {
  label: string;
  href?: string;
};
// Функция для очистки текста от упоминаний города
const cleanCity = (text: string) => {
  if (typeof text !== "string") return text;
  
  return text
    // Удаляем "в Перми", "Пермь", "г. Пермь" с пробелами вокруг
    .replace(/\s*(в\s+)?(г\.\s+)?Перм[иь]\s*/gi, "")
    // Убираем лишние пробелы по краям, если они остались
    .trim();
};
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const domain = "https://parus-ritual.ru";
  
  const allItems = [
    { label: "Похоронное бюро", href: "/" },
    ...items.map(item => ({
      ...item,
      // Применяем очистку к каждому пункту
      label: cleanCity(item.label)
    }))
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      // Теперь item (URL) будет у всех пунктов, включая последний
      "item": item.href ? `${domain}${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          
          return (
            <li key={index} className="flex items-center space-x-2">
              {index > 0 && <ChevronRight className="w-4 h-4 opacity-50" />}
              
              {/* Условие !isLast гарантирует, что визуально 
                последний пункт останется текстом (span), 
                даже если в данных есть href 
              */}
              {item.href && !isLast ? (
                <Link 
                  href={item.href} 
                  className="hover:text-primary transition-colors"
                  title={index === 0 ? "На главную страницу похоронного бюро" : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
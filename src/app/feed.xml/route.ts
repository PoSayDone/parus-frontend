import { listServices } from "@/lib/data/services";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://parus-ritual.ru";
  
  // 1. Получаем все услуги из базы данных
  const servicesData = await listServices({
    queryParams: { limit: 100 },
  });
  const allServices = servicesData.response.data || [];

  // 2. Формируем шапку YML-фида
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${new Date().toISOString()}">
  <shop>
    <name>Парус</name>
    <company>Ритуальное агентство Парус</company>
    <url>${baseUrl}</url>
    <currencies>
      <currency id="RUB" rate="1"/>
    </currencies>
    <categories>
      <category id="1">Ритуальные услуги</category>
    </categories>
    <offers>`;

  // 3. Проходимся по каждой услуге и формируем тег <offer>
  allServices.forEach((service) => {
    // Логика цены: проверяем, бесплатная ли услуга (Консультация)
    const isFree = service.price.toLowerCase().includes("бесплатно") || service.price === "0";
    
    // Вытаскиваем только цифры из цены (например, "от 18 000 ₽" -> "18000")
    const numericPrice = isFree ? "0" : service.price.replace(/[^0-9]/g, "");
    
    // Формируем описание. Если услуга платная — добавляем приписку. Если бесплатная — оставляем как есть.
    const suffix = isFree ? "" : ". <br />Цена указана минимальная, более точную расчитает менеджер при обращении.";
    const description = `${service.shortDescription || ""}${suffix}`.trim();

    // Картинка: берем напрямую из базы (она уже со ссылкой на Яндекс.Облако)
    // На всякий случай делаем проверку, если вдруг ссылка относительная
    let pictureUrl = service.thumbnail || "";
    if (pictureUrl && !pictureUrl.startsWith("http")) {
      pictureUrl = `${baseUrl}${pictureUrl}`;
    }

    xml += `
      <offer id="${service.handle}">
        <name>${service.title}</name>
        <price>${numericPrice}</price>
        <currencyId>RUB</currencyId>
        <categoryId>1</categoryId>
        ${pictureUrl ? `<picture>${pictureUrl}</picture>` : ""}
        <description><![CDATA[${description}]]></description>
        <url>${baseUrl}/services/${service.handle}</url>
      </offer>`;
  });

  // Закрываем теги
  xml += `
    </offers>
  </shop>
</yml_catalog>`;

  // 4. Отдаем результат как XML-документ
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      // Кэшируем фид на 1 час, чтобы не дергать базу при каждом запросе робота
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
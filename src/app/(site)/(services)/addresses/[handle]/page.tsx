import type { Metadata } from "next";
import { getCemeteryByHandle, listAddresses } from "@/lib/data/addresses";
import CemeteryPageTemplate from "@/modules/addresses/templates/cemetery-page-template";

export async function generateStaticParams() {
	const {
		response: { data: cemeteries },
	} = await listAddresses({
		page: 1,
		queryParams: { limit: 200, type: "cemetery" },
	});

	return cemeteries
		.filter((cemetery) => cemetery.handle)
		.map((cemetery) => ({
			handle: cemetery.handle!,
		}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ handle: string }>;
}): Promise<Metadata> {
	const { handle } = await params;
	const cemetery = await getCemeteryByHandle(handle);

	if (!cemetery) {
		return {};
	}

	// 1. Умная генерация Title (избегаем двойного "Парус", если оно уже есть)
	const title = cemetery.metaTitle 
		? cemetery.metaTitle
		: `Кладбище «${cemetery.name}» (Пермь) - адрес, статус, как добраться | Парус`;

	// 2. Шаблонный Description с ключевыми словами для сниппета
	const description = cemetery.metaDescription || `Информация о кладбище «${cemetery.name}» в г. Пермь: точный адрес, статус захоронений, список документов и схема проезда. Помощь в организации похорон от агентства «Парус».`;
	
	// 3. Абсолютные ссылки для правильной индексации и превью в мессенджерах
	const SITE_URL = "https://parus-ritual.ru"; // Базовый домен
	const pageUrl = `${SITE_URL}/addresses/${handle}`;
	
	// Проверяем, является ли ссылка на картинку уже абсолютной (начинается с http)
	const ogImage = cemetery.cemeteryThumbnail
		? (cemetery.cemeteryThumbnail.startsWith('http') ? cemetery.cemeteryThumbnail : `${SITE_URL}${cemetery.cemeteryThumbnail}`)
		: `${SITE_URL}/images/og-image.png`;
		
	return {
		title,
		description,
		openGraph: {
			type: "website",                  // <--  тип 
			url: `/addresses/${handle}`,      // <--  динамический URL кладбища
			title,
			description,
			// <-- Если у кладбища нет своего фото, подставляем  общую заглушку
			images: cemetery.cemeteryThumbnail
				? [cemetery.cemeteryThumbnail]
				: ["/images/og-image.png"],
		},
		alternates: {
			canonical: pageUrl,
		},
	};
}

export default async function CemeteryPage({
	params,
}: {
	params: Promise<{ handle: string }>;
}) {
	const { handle } = await params;
	return <CemeteryPageTemplate handle={handle} />;
}

import { PrismaClient } from "@prisma/client";

export const pricingPlans = [
	{
		id: "basic",
		title: "Базовый",
		description: "Основные услуги для достойного прощания",
		price: "от 45 000",
		creditPrice: "15 000",
		popular: false,
		features: [
			"Оформление документов",
			"Транспортировка",
			"Базовый гроб",
			"Венок и цветы",
			"Организация церемонии",
			"Место на кладбище",
		],
		href: "/contact?plan=basic",
	},
	{
		id: "standard",
		title: "Стандартный",
		description:
			"Расширенный комплекс услуг с дополнительными возможностями",
		price: "от 75 000",
		creditPrice: "25 000",
		popular: true,
		features: [
			"Все услуги базового пакета",
			"Улучшенный гроб",
			"Прощальный зал на 2 часа",
			"Поминальный обед (20 человек)",
			"Фото и видеосъемка",
			"Музыкальное сопровождение",
			"Временный памятник",
		],
		href: "/contact?plan=standard",
	},
	{
		id: "premium",
		title: "Премиум",
		description: "Полный комплекс услуг высшего класса",
		price: "от 120 000",
		creditPrice: "40 000",
		popular: false,
		features: [
			"Все услуги стандартного пакета",
			"Элитный гроб",
			"Прощальный зал на 4 часа",
			"Поминальный обед (50 человек)",
			"Профессиональная фотосессия",
			"Живые цветы и композиции",
			"Памятник из гранита",
			"Персональный координатор",
		],
		href: "/contact?plan=premium",
	},
	{
		id: "vip",
		title: "VIP",
		description: "Эксклюзивные услуги с индивидуальным подходом",
		price: "от 200 000",
		creditPrice: "67 000",
		popular: false,
		features: [
			"Все услуги премиум пакета",
			"Эксклюзивный гроб на заказ",
			"Частный прощальный зал",
			"Банкет без ограничений",
			"Профессиональная видеохроника",
			"Индивидуальный мемориальный комплекс",
			"Круглосуточная поддержка семьи",
			"Услуги психолога",
		],
		href: "/contact?plan=vip",
	},
];
export const zagsData = [
	{
		name: "Индустриальный отдел управления ЗАГС",
		address: "614022 г. Пермь, ул.Мира,15",
		phone: "227-93-18, 227-99-88",
	},
	{
		name: "Дзержинский отдел управления ЗАГС",
		address: "614068, г. Пермь, ул. Ленина, 98",
		phone: "236-77-70, 236-79-77",
	},
	{
		name: "Кировский отдел управления ЗАГС",
		address: "614113 г. Пермь, ул. Кировоградская, 43",
		phone: "252-35-70, 252-09-58",
	},
	{
		name: "Специализированный отдел управления ЗАГС",
		address: "614000 г. Пермь, ул. Газеты Звезда, 8",
		phone: "212-76-92, 212-99-83",
	},
	{
		name: "Мотовилихинский отдел управления ЗАГС",
		address: "614060 г. Пермь, ул. Уральская, 111",
		phone: "260-14-24, 282-52-43",
	},
	{
		name: "Орджоникидзевский отдел управления ЗАГС",
		address: "614030 г. Пермь, ул. Пулковская, 7",
		phone: "274-57-41, 274-55-08",
	},
	{
		name: "Свердловский отдел управления ЗАГС",
		address: "614039 г. Пермь, пр. Комсомольский, 69",
		phone: "241-37-77, 241-11-90, 241-03-26",
	},
];

export const morguesData: Morgue[] = [
	{
		institution:
			"Клиническое патологоанатомическое бюро Патологоанатомическое отделение № 1",
		address: "г.Пермь, ул. Писарева 56 лит Д",
		schedule: "Пн-Пт: 08.00-15.00, Сб, Вс: выходной",
	},
	{
		institution:
			"Клиническое патологоанатомическое бюро Патологоанатомическое отделение № 2",
		address: "г.Пермь, ул. Автозаводская, 82 лит Н",
		schedule: "Пн-Пт: 08.00-15.00, Сб, Вс: выходной",
	},
	{
		institution:
			"Клиническое патологоанатомическое бюро Патологоанатомическое отделение № 3",
		address: "г.Пермь, ул. Братьев Игнатовых, 2 лит Л1",
		schedule: "Пн-Пт: 08.00-15.00, Сб, Вс: выходной",
	},
	{
		institution:
			"Клиническое патологоанатомическое бюро Патологоанатомическое отделение № 3",
		address: "г.Пермь, ул. Плеханова, 36 лит К",
		schedule: "Пн-Пт: 08.00-15.00, Сб, Вс: выходной",
	},
	{
		institution:
			"Клиническое патологоанатомическое бюро Патологоанатомическое отделение № 4",
		address: "г.Пермь, ул.Грачева, 12 лит С",
		schedule: "Пн-Пт: 08.00-15.00, Сб, Вс: выходной",
	},
	{
		institution: "Пермское краевое бюро судебно-медицинской экспертизы",
		address: "г.Пермь, ул. Старцева, 61",
		schedule: "Пн-Сб: 09.00-17.00, Вс: выходной",
	},
	{
		institution:
			"Патологоанатомическое отделение Пермской краевой клинической больницы",
		address: "г.Пермь, ул. Пушкина, 85Б",
		schedule: "Пн-Пт: 08.00-15.00, Сб, Вс: выходной",
	},
];

export const cemeteriesData: Cemetery[] = [
	{
		district: "Дзержинский",
		name: "Северное",
		location: "г. Пермь, ул. Красноборская, 200/1",
	},
	{
		district: "Дзержинский",
		name: "Окуловское",
		location: "г. Пермь, напротив кладбища «Северное»",
	},
	{
		district: "Индустриальный район",
		name: "Верхне-Мулинское",
		location: "г. Пермь, ул. 5-я Ипподромная",
	},
	{
		district: "Кировский",
		name: "Закамское",
		location: "г. Пермь, ул. Липатова,35",
	},
	{
		district: "Кировский",
		name: "Заборное",
		location: "г. Пермь, ул. Заборная",
	},
	{
		district: "Кировский",
		name: "Блочное",
		location: "г. Пермь, ул. Блочная",
	},
	{
		district: "Мотовилихинский",
		name: "Запрудское",
		location: "г. Пермь ул. Павлика Морозова",
	},
	{
		district: "Мотовилихинский",
		name: "Верхне-Курьинское",
		location: "г. Пермь, мкр. Верхняя Курья, ул. 2-я Линия",
	},
	{
		district: "Орджоникидзевский",
		name: "Кислотные дачи",
		location: "г. Пермь, ул. Генерала Доватора, 9/1",
	},
	{
		district: "Орджоникидзевский",
		name: "на Банной горе (новое)",
		location: "г. Пермь, Соликамский тракт, 2",
	},
	{
		district: "Орджоникидзевский",
		name: "на Банной горе (старое)",
		location: "г. Пермь, ул. 2-я Корсуньская",
	},
	{
		district: "Орджоникидзевский",
		name: "Заозерское",
		location: "г. Пермь, мкр. Турбино",
	},
	{
		district: "Орджоникидзевский",
		name: "Головановское",
		location: "г. Пермь, ул.Фрунзе",
	},
	{
		district: "Свердловский",
		name: "Южное",
		location: "г. Пермь, Южная дамба, 1",
	},
	{
		district: "Свердловский",
		name: "Егошихинское",
		location: "г. Пермь, ул. Тихая",
	},
	{
		district: "Свердловский",
		name: "Воинское",
		location: "п. Новые Ляды",
	},
	{
		district: "Новые Ляды",
		name: "Ново-Лядовское",
		location: "г. Пермь, посёлок Новые Ляды",
	},
];

// Define service data type locally to handle the icon component issue
interface ServiceData {
	handle: string;
	title: string;
	shortDescription: string;
	description: string;
	icon: any; // React component
	price: string;
	duration: string;
	features: string[];
	included: string[];
}

const servicesData: Record<string, ServiceData> = {
	"funeral-organization": {
		title: "Организация похорон",
		handle: "funeral-organization",
		shortDescription: "Полный комплекс услуг по организации похорон",
		description:
			"Мы берем на себя все заботы по организации достойных похорон, обеспечивая профессиональный подход и деликатное отношение к вашему горю. Наша команда имеет многолетний опыт и готова помочь в любое время суток.",
		icon: null,
		price: "от 25 000 ₽",
		duration: "1-2 дня",
		features: [
			"Консультация и планирование церемонии",
			"Подготовка усопшего",
			"Организация церемонии прощания",
			"Координация всех служб",
			"Поддержка семьи на всех этапах",
		],
		included: [
			"Гроб стандартный",
			"Ритуальное белье",
			"Венок траурный",
			"Организация церемонии",
			"Транспорт до кладбища",
		],
	},
	"ritual-goods": {
		handle: "ritual-goods",
		title: "Ритуальные товары",
		shortDescription:
			"Широкий ассортимент качественных ритуальных принадлежностей",
		description:
			"Предлагаем полный ассортимент ритуальных товаров высокого качества: гробы различных категорий, венки, цветочные композиции, ритуальную одежду и аксессуары. Все товары сертифицированы и соответствуют традициям.",
		icon: null,
		price: "от 5 000 ₽",
		duration: "В наличии",
		features: [
			"Гробы различных категорий",
			"Венки и цветочные композиции",
			"Ритуальная одежда и белье",
			"Памятные аксессуары",
			"Свечи и лампады",
		],
		included: [
			"Консультация по выбору",
			"Доставка по городу",
			"Гарантия качества",
			"Индивидуальный подход",
		],
	},
	transportation: {
		handle: "transportation",
		title: "Транспортные услуги",
		shortDescription: "Специализированный транспорт для перевозки",
		description:
			"Обеспечиваем профессиональные транспортные услуги с использованием специализированного автотранспорта. Наши водители имеют большой опыт и гарантируют деликатное и своевременное выполнение всех перевозок.",
		icon: null,
		price: "от 3 000 ₽",
		duration: "По запросу",
		features: [
			"Катафалк для перевозки усопшего",
			"Автобус для сопровождающих",
			"Грузовой транспорт для венков",
			"Опытные водители",
			"Круглосуточная доступность",
		],
		included: [
			"Подача транспорта в назначенное время",
			"Помощь в погрузке/выгрузке",
			"Сопровождение до места назначения",
			"Топливо и все расходы",
		],
	},
	"memorial-services": {
		handle: "memorial-services",
		title: "Поминальные услуги",
		shortDescription: "Организация поминальных обедов и мероприятий",
		description:
			"Организуем поминальные обеды и памятные мероприятия с соблюдением всех традиций. Предоставляем залы, организуем питание и помогаем с проведением поминальных служб в различных конфессиях.",
		icon: null,
		price: "от 800 ₽/чел",
		duration: "2-4 часа",
		features: ["Организация поминального обеда", "Бронирование залов"],
		included: [
			"Аренда зала",
			"Традиционные блюда",
			"Сервировка и обслуживание",
		],
	},
	"grave-care": {
		handle: "grave-care",
		title: "Уход за могилами",
		shortDescription:
			"Профессиональный уход и благоустройство мест захоронения",
		description:
			"Предоставляем услуги по уходу за могилами и благоустройству мест захоронения. Наши специалисты обеспечат достойное содержание памятного места в любое время года.",
		icon: null,
		price: "от 2 000 ₽",
		duration: "Регулярно",
		features: [
			"Уборка территории могилы",
			"Уход за растениями и цветами",
			"Мойка и реставрация памятников",
			"Замена цветов и венков",
			"Зимняя очистка от снега",
		],
		included: [
			"Инвентарь и материалы",
			"Вывоз мусора",
			"Фотоотчет о проделанной работе",
			"Гарантия качества услуг",
		],
	},
	cremation: {
		handle: "cremation",
		title: "Кремация",
		shortDescription: "Услуги кремации с соблюдением всех требований",
		description:
			"Предоставляем услуги кремации в современном крематории с соблюдением всех санитарных норм и религиозных традиций. Обеспечиваем деликатное отношение и полную конфиденциальность процесса.",
		icon: null,
		price: "от 15 000 ₽",
		duration: "1 день",
		features: [
			"Подготовка к кремации",
			"Процедура кремации",
			"Урна для праха",
			"Справка о кремации",
		],
		included: [
			"Все процедуры кремации",
			"Стандартная урна",
			"Документооборот",
		],
	},
	documents: {
		handle: "documents",
		title: "Оформление документов",
		shortDescription: "Помощь в оформлении всех необходимых документов",
		description:
			"Берем на себя все вопросы по оформлению документов, связанных с похоронами. Наши специалисты помогут получить все необходимые справки, разрешения и свидетельства в кратчайшие сроки.",
		icon: null,
		price: "от 3 000 ₽",
		duration: "1-3 дня",
		features: [
			"Консультация по документообороту",
			"Получение медицинского свидетельства",
			"Регистрация смерти в ЗАГС (оформление гербового свидетельства о смерти и справки формы № 11 для получения пособия на погребение)",
			"Сопровождение по оформлению документов для захоронения",
		],
		included: [
			"Консультация специалиста",
			"Подготовка документов",
			"Госпошлины и сборы",
			"Курьерская доставка документов",
		],
	},
	consultation: {
		handle: "consultation",
		title: "Консультации 24/7",
		shortDescription:
			"Круглосуточная поддержка и консультации специалистов",
		description:
			"Предоставляем круглосуточные консультации по всем вопросам, связанным с организацией похорон. Наши опытные специалисты готовы помочь и поддержать в трудную минуту в любое время суток.",
		icon: null,
		price: "Бесплатно",
		duration: "Круглосуточно",
		features: [
			"Консультации по телефону 24/7",
			"Выезд специалиста на дом",
			"Помощь в планировании церемонии",
			"Психологическая поддержка",
			"Консультации по традициям и обрядам",
		],
		included: [
			"Первичная консультация бесплатно",
			"Выезд специалиста в пределах города",
			"Составление плана мероприятий",
			"Поддержка на всех этапах",
		],
	},
};

const prisma = new PrismaClient();

async function seedAddresses() {
	console.log("Seeding addresses...");

	// Clear existing addresses
	await prisma.address.deleteMany({});

	// Seed ZAGS
	for (const zags of zagsData) {
		await prisma.address.create({
			data: {
				type: "zags",
				name: zags.name,
				address: zags.address,
				phone: zags.phone,
			},
		});
	}

	// Seed Morgues
	for (const morgue of morguesData) {
		await prisma.address.create({
			data: {
				type: "morgue",
				name: morgue.institution,
				address: morgue.address,
				schedule: morgue.schedule,
			},
		});
	}

	// Seed Cemeteries
	for (const cemetery of cemeteriesData) {
		await prisma.address.create({
			data: {
				type: "cemetery",
				name: cemetery.name,
				address: cemetery.location, // Store location in address field for consistency
				district: cemetery.district,
				location: cemetery.location,
			},
		});
	}

	console.log("Addresses seeded successfully");
}

async function seedServices() {
	console.log("Seeding services...");

	// Clear existing services
	await prisma.service.deleteMany({});

	for (const serviceId in servicesData) {
		const service = servicesData[serviceId];
		await prisma.service.create({
			data: {
				title: service.title,
				handle: service.handle,
				shortDescription: service.shortDescription,
				description: service.description,
				icon: null, // All icons are null in our local definition
				price: service.price,
				duration: service.duration,
				features: service.features,
				included: service.included,
				thumbnail: "", // Add default thumbnail
				images: [], // Add default images array
			},
		});
	}

	console.log("Services seeded successfully");
}

async function seedPricingPlans() {
	console.log("Seeding pricing plans...");

	// Clear existing pricing plans
	await prisma.pricePlan.deleteMany({});

	for (const plan of pricingPlans) {
		await prisma.pricePlan.create({
			data: {
				title: plan.title,
				description: plan.description,
				price: plan.price,
				creditPrice: plan.creditPrice || null,
				popular: plan.popular,
				included: plan.features,
			},
		});
	}

	console.log("Pricing plans seeded successfully");
}

async function main() {
	console.log("Starting seed process...");

	try {
		await seedAddresses();
		await seedServices();
		await seedPricingPlans();

		console.log("Seed process completed successfully!");
	} catch (error) {
		console.error("Error during seed process:", error);
		process.exit(1);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

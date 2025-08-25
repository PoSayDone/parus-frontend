import {
	Heart,
	Flower2,
	Car,
	Clock,
	Users,
	Wrench,
	Building,
	Phone,
} from "lucide-react";

export interface Service {
	id: string;
	title: string;
	shortDescription: string;
	description: string;
	icon: any;
	image: string;
	price: string;
	duration: string;
	features: string[];
	included: string[];
	gallery: string[];
}

export const servicesData: Record<string, Service> = {
	"funeral-organization": {
		id: "funeral-organization",
		title: "Организация похорон",
		shortDescription: "Полный комплекс услуг по организации похорон",
		description:
			"Мы берем на себя все заботы по организации достойных похорон, обеспечивая профессиональный подход и деликатное отношение к вашему горю. Наша команда имеет многолетний опыт и готова помочь в любое время суток.",
		icon: Heart,
		image: "/funeral-ceremony-hall-with-flowers.png",
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
		gallery: [
			"/funeral-flowers-arrangement.png",
			"/memorial-candles.png",
			"/funeral-ceremony-setup.png",
		],
	},
	"ritual-goods": {
		id: "ritual-goods",
		title: "Ритуальные товары",
		shortDescription:
			"Широкий ассортимент качественных ритуальных принадлежностей",
		description:
			"Предлагаем полный ассортимент ритуальных товаров высокого качества: гробы различных категорий, венки, цветочные композиции, ритуальную одежду и аксессуары. Все товары сертифицированы и соответствуют традициям.",
		icon: Flower2,
		image: "/ritual-goods-store-with-coffins-and-flowers.png",
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
		gallery: [
			"/wooden-coffins-display.png",
			"/funeral-wreaths-and-flowers.png",
			"/ritual-clothing-and-accessories.png",
		],
	},
	transportation: {
		id: "transportation",
		title: "Транспортные услуги",
		shortDescription: "Специализированный транспорт для перевозки",
		description:
			"Обеспечиваем профессиональные транспортные услуги с использованием специализированного автотранспорта. Наши водители имеют большой опыт и гарантируют деликатное и своевременное выполнение всех перевозок.",
		icon: Car,
		image: "/funeral-hearse-car.png",
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
		gallery: [
			"/black-funeral-hearse.png",
			"/passenger-bus-for-funeral.png",
			"/loading-funeral-flowers-into-truck.png",
		],
	},
	"memorial-services": {
		id: "memorial-services",
		title: "Поминальные услуги",
		shortDescription: "Организация поминальных обедов и мероприятий",
		description:
			"Организуем поминальные обеды и памятные мероприятия с соблюдением всех традиций. Предоставляем залы, организуем питание и помогаем с проведением поминальных служб в различных конфессиях.",
		icon: Users,
		image: "/memorial-dinner-hall.png",
		price: "от 800 ₽/чел",
		duration: "2-4 часа",
		features: [
			"Организация поминального обеда",
			"Бронирование залов",
			"Традиционное меню",
			"Сервировка столов",
			"Координация с духовенством",
		],
		included: [
			"Аренда зала на 4 часа",
			"Традиционные блюда",
			"Сервировка и обслуживание",
			"Поминальная свеча на стол",
		],
		gallery: [
			"/memorial-table-setting.png",
			"/traditional-memorial-food.png",
			"/memorial-candles-on-table.png",
		],
	},
	"grave-care": {
		id: "grave-care",
		title: "Уход за могилами",
		shortDescription:
			"Профессиональный уход и благоустройство мест захоронения",
		description:
			"Предоставляем услуги по уходу за могилами и благоустройству мест захоронения. Наши специалисты обеспечат достойное содержание памятного места в любое время года.",
		icon: Wrench,
		image: "/grave-maintenance-tools.png",
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
		gallery: [
			"/clean-grave-with-flowers.png",
			"/monument-cleaning-process.png",
			"/seasonal-grave-decoration.png",
		],
	},
	cremation: {
		id: "cremation",
		title: "Кремация",
		shortDescription: "Услуги кремации с соблюдением всех требований",
		description:
			"Предоставляем услуги кремации в современном крематории с соблюдением всех санитарных норм и религиозных традиций. Обеспечиваем деликатное отношение и полную конфиденциальность процесса.",
		icon: Building,
		image: "/modern-crematorium-building.png",
		price: "от 15 000 ₽",
		duration: "1 день",
		features: [
			"Подготовка к кремации",
			"Процедура кремации",
			"Урна для праха",
			"Справка о кремации",
			"Возможность присутствия родственников",
		],
		included: [
			"Все процедуры кремации",
			"Стандартная урна",
			"Документооборот",
			"Хранение праха до 1 месяца",
		],
		gallery: [
			"/crematorium-ceremony-hall.png",
			"/cremation-urns-display.png",
			"/crematorium-farewell-room.png",
		],
	},
	documents: {
		id: "documents",
		title: "Оформление документов",
		shortDescription: "Помощь в оформлении всех необходимых документов",
		description:
			"Берем на себя все вопросы по оформлению документов, связанных с похоронами. Наши специалисты помогут получить все необходимые справки, разрешения и свидетельства в кратчайшие сроки.",
		icon: Clock,
		image: "/document-processing-office.png",
		price: "от 3 000 ₽",
		duration: "1-3 дня",
		features: [
			"Получение медицинского свидетельства",
			"Оформление разрешения на захоронение",
			"Регистрация смерти в ЗАГСе",
			"Получение справок для пенсионного фонда",
			"Консультации по документообороту",
		],
		included: [
			"Консультация специалиста",
			"Подготовка документов",
			"Госпошлины и сборы",
			"Курьерская доставка документов",
		],
		gallery: [
			"/official-documents-stack.png",
			"/document-signing-process.png",
			"/government-office-interior.png",
		],
	},
	consultation: {
		id: "consultation",
		title: "Консультации 24/7",
		shortDescription:
			"Круглосуточная поддержка и консультации специалистов",
		description:
			"Предоставляем круглосуточные консультации по всем вопросам, связанным с организацией похорон. Наши опытные специалисты готовы помочь и поддержать в трудную минуту в любое время суток.",
		icon: Phone,
		image: "/consultation-phone-service.png",
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
		gallery: [
			"/consultation-specialist-at-work.png",
			"/home-visit-consultation.png",
			"/phone-consultation-service.png",
		],
	},
};

export const getServiceSlugs = () => Object.keys(servicesData);
export const getServiceBySlug = (slug: string) => servicesData[slug];

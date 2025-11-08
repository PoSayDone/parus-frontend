import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddressesPage() {
	const zagsData = [
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

	// Morgues data
	const morguesData = [
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

	// Cemeteries data
	const cemeteriesData = [
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

	const groupedCemeteries = cemeteriesData.reduce(
		(acc, cemetery) => {
			if (!acc[cemetery.district]) {
				acc[cemetery.district] = [];
			}
			acc[cemetery.district].push(cemetery);
			return acc;
		},
		{} as Record<string, typeof cemeteriesData>,
	);

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 md:px-8 py-12">
				<div className="text-center">
					<h1 className="text-3xl md:text-4xl mb-4">
						Полезные адреса в Перми
					</h1>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						На этой странице собраны важные адреса и контактная
						информация городских учреждений Перми — ЗАГСов, моргов и
						кладбищ. Эти данные помогут вам быстро найти нужное
						место и уточнить время работы.
					</p>
				</div>

				{/* ZAGS Section */}
				<div className="mt-8">
					<h2 className="text-xl font-medium mb-4 text-center">
						ЗАГС города Перми
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{zagsData.map((zags, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle className="text-lg max-w-[80%]">
										{zags.name}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="mb-2 border-b pb-2">
										<p className="text-sm text-muted-foreground">
											Адрес
										</p>
										<p>{zags.address}</p>
									</div>
									<div className="">
										<p className="text-sm text-muted-foreground">
											Телефон
										</p>
										<p>{zags.phone}</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Morgues Section */}
				<div className="mt-8">
					<h2 className="text-xl font-medium mb-4 text-center">
						Морги города Перми
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{morguesData.map((morgue, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle className="text-lg max-w-[80%]">
										{morgue.institution}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="mb-2 border-b pb-2">
										<p className="text-sm text-muted-foreground">
											Адрес
										</p>
										<p>{morgue.address}</p>
									</div>
									<div className="">
										<p className="text-sm text-muted-foreground">
											График работы
										</p>
										<p>{morgue.schedule}</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Cemeteries Section */}
				<div className="mt-8">
					<h2 className="text-xl font-medium mb-4 text-center">
						Кладбища города Перми
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{Object.entries(groupedCemeteries).map(
							([district, cemeteries]) => (
								<Card key={district}>
									<CardHeader>
										<CardTitle className="text-lg">
											{district}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											{cemeteries.map(
												(cemetery, index) => (
													<div
														key={index}
														className="border-b pb-2 last:border-b-0 last:pb-0"
													>
														<p>{cemetery.name}</p>
														<p className="text-sm text-muted-foreground">
															{cemetery.location}
														</p>
													</div>
												),
											)}
										</div>
									</CardContent>
								</Card>
							),
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

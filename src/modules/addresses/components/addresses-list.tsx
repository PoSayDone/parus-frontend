import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listAddresses } from "@/lib/data/addresses-db";

export default async function AddressesList() {
	const {
		response: { data: addresses },
	} = await listAddresses({
		page: 1,
		queryParams: { limit: 100 },
	});

	const zagsData = addresses.filter((address) => address.type === "zags");
	const morguesData = addresses.filter(
		(address) => address.type === "morgue",
	);
	const cemeteriesData = addresses.filter(
		(address) => address.type === "cemetery",
	);

	const groupedCemeteries = cemeteriesData.reduce(
		(acc, cemetery) => {
			if (!acc[cemetery.district!]) {
				acc[cemetery.district!] = [];
			}
			acc[cemetery.district!].push(cemetery);
			return acc;
		},
		{} as Record<string, typeof cemeteriesData>,
	);

	return (
		<>
			{/* ZAGS Section */}
			<div className="mt-8">
				<h2 className="text-xl font-medium mb-4 text-center">
					ЗАГС города Перми
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{zagsData.map((zags) => (
						<Card key={zags.id}>
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
					{morguesData.map((morgue) => (
						<Card key={morgue.id}>
							<CardHeader>
								<CardTitle className="text-lg max-w-[80%]">
									{morgue.name}
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
			<div className="mt-8 mb-8">
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
										{cemeteries.map((cemetery) => (
											<div
												key={cemetery.id}
												className="border-b pb-2 last:border-b-0 last:pb-0"
											>
												<p>{cemetery.name}</p>
												<p className="text-sm text-muted-foreground">
													{cemetery.location}
												</p>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						),
					)}
				</div>
			</div>
		</>
	);
}

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listAddresses } from "@/lib/data/addresses";

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

	return (
		<>
			{/* Cemeteries Section */}
			<div className="mt-8">
				<h2 className="text-xl font-medium mb-4 text-center">
					Кладбища города Перми
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
					{cemeteriesData.map((cemetery) => {
						const primaryImage =
							cemetery.cemeteryThumbnail ||
							cemetery.cemeteryImages?.[0];
						const content = (
							<Card className="relative overflow-hidden">
								<div
									className="pointer-events-none absolute right-0 top-0 h-full w-64 opacity-100"
									style={{
										backgroundImage:
											primaryImage
												? `url(${primaryImage})`
												: "url(/placeholder.svg)",
										backgroundSize: "cover",
										backgroundPosition: "center",
										maskImage:
											"linear-gradient(90deg, transparent 0%, #000 100%)",
									}}
								/>
								<CardHeader>
									<CardTitle className="text-lg max-w-[80%]">
										{cemetery.name}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										{cemetery.address && (
											<div>
												<p className="text-sm text-muted-foreground">
													Адрес
												</p>
												<p>{cemetery.address}</p>
											</div>
										)}
										{cemetery.district && (
											<div>
												<p className="text-sm text-muted-foreground">
													Район
												</p>
												<p>{cemetery.district}</p>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						);

						return cemetery.handle ? (
							<Link
								key={cemetery.id}
								href={`/addresses/${cemetery.handle}`}
								className="block hover:opacity-90 transition-opacity"
							>
								{content}
							</Link>
						) : (
							<div key={cemetery.id}>{content}</div>
						);
					})}
				</div>
			</div>

			{/* ZAGS Section */}
			<div className="mt-8">
				<h2 className="text-xl font-medium mb-4 text-center">
					ЗАГС города Перми
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
			<div className="mt-8 mb-8">
				<h2 className="text-xl font-medium mb-4 text-center">
					Морги города Перми
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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

		</>
	);
}

import { listServices } from "@/lib/data/services-db";
import ServicePageTemplate from "@/modules/services/templates/service-page-template";

export async function generateStaticParams() {
	return (
		await listServices({ page: 1, queryParams: { limit: 100 } })
	).response.data.map((item) => ({
		handle: item.handle,
	}));
}

export default async function ServicePage({
	params,
}: {
	params: Promise<{ handle: string }>;
}) {
	const { handle } = await params;
	return <ServicePageTemplate handle={handle} />;
}

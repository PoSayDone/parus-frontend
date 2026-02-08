import { getService, listServices } from "@/lib/data/services";
import ServicePageTemplate from "@/modules/services/templates/service-page-template";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	return (
		await listServices({ page: 1, queryParams: { limit: 100 } })
	).response.data.map((item) => ({
		handle: item.handle,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ handle: string }>;
}) {
	const { handle } = await params;
	const service = await getService(handle);

	if (!service) {
		notFound();
	}

	const title = (service.metaTitle || service.title) + " - Парус";
	const description =
		service.metaDescription ||
		service.shortDescription ||
		service.title;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: service.thumbnail ? [service.thumbnail] : [],
		},
	};
}

export default async function ServicePage({
	params,
}: {
	params: Promise<{ handle: string }>;
}) {
	const { handle } = await params;
	return <ServicePageTemplate handle={handle} />;
}

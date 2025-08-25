import { getServiceSlugs } from "@/lib/data/services";
import ServicePageTemplate from "@/modules/services/templates/service-page-template";

export async function generateStaticParams() {
	return getServiceSlugs().map((slug) => ({
		slug: slug,
	}));
}

export default async function ServicePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	return <ServicePageTemplate slug={slug} />;
}

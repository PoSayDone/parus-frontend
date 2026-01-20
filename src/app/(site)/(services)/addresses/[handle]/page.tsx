import { listAddresses } from "@/lib/data/addresses";
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

export default async function CemeteryPage({
	params,
}: {
	params: Promise<{ handle: string }>;
}) {
	const { handle } = await params;
	return <CemeteryPageTemplate handle={handle} />;
}

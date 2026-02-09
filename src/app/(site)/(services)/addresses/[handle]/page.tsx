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

	const title =
		(cemetery.metaTitle || cemetery.name) + " - Парус";
	const description =
		cemetery.metaDescription ||
		cemetery.description ||
		cemetery.address ||
		cemetery.name;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: cemetery.cemeteryThumbnail
				? [cemetery.cemeteryThumbnail]
				: [],
		},
		alternates: {
			canonical: `/addresses/${handle}`,
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

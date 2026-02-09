import type { Data } from "@puckeditor/core";
import { getLandingPage } from "@/lib/data/landing-page";
import LandingPageEditor from "@/modules/admin/templates/landing-page-editor";
import { defaultLandingData } from "@/modules/landing/puck/default-data";

const normalizeLandingData = (data: Data | null): Data => {
	if (data && Array.isArray(data.content)) {
		return data;
	}
	return defaultLandingData as Data;
};

export default async function LandingEditorPage() {
	const page = await getLandingPage();
	const storedData = page?.data as Data | null;
	const initialData = normalizeLandingData(storedData);

	return <LandingPageEditor initialData={initialData} />;
}

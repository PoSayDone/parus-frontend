"use server";

import prisma from "@lib/prisma";
import { revalidatePath } from "next/cache";
import type { SiteSettings } from "@/types/admin";

const SETTINGS_KEY = "default";

export type SiteSettingsInput = {
	phone: string;
	email: string;
	address: string;
	footerNote: string;
	showCatalog: boolean;
};

export const getSiteSettings = async (): Promise<SiteSettings | null> => {
	return prisma.siteSettings.findUnique({
		where: { key: SETTINGS_KEY },
	});
};

export const updateSiteSettings = async (
	data: SiteSettingsInput,
): Promise<SiteSettings> => {
	const settings = await prisma.siteSettings.upsert({
		where: { key: SETTINGS_KEY },
		update: data,
		create: {
			key: SETTINGS_KEY,
			...data,
		},
	});

	await revalidateSiteSettings();
	return settings;
};

export const revalidateSiteSettings = async () => {
	revalidatePath("/", "layout");
};

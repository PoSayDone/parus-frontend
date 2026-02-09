"use server";

import prisma from "@lib/prisma";
import { revalidatePath } from "next/cache";
import type { LandingPage } from "@/types/admin";

const LANDING_KEY = "home";

export const getLandingPage = async (): Promise<LandingPage | null> => {
	return prisma.landingPage.findUnique({
		where: { key: LANDING_KEY },
	});
};

export const updateLandingPage = async (
	data: LandingPage["data"],
): Promise<LandingPage> => {
	const page = await prisma.landingPage.upsert({
		where: { key: LANDING_KEY },
		update: { data },
		create: { key: LANDING_KEY, data },
	});

	revalidatePath("/(site)/(landing)", "page");
	return page;
};

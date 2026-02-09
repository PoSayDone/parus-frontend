"use server";

import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";
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
	const normalizedData =
		data === null || typeof data === "undefined"
			? Prisma.DbNull
			: data;
	const page = await prisma.landingPage.upsert({
		where: { key: LANDING_KEY },
		update: { data: normalizedData },
		create: { key: LANDING_KEY, data: normalizedData },
	});

	revalidatePath("/(site)/(landing)", "page");
	return page;
};

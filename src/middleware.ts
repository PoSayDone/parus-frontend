import { HttpTypes } from "@medusajs/types";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL;
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const DEFAULT_REGION = "ru";

const regionMapCache = {
	regionMap: new Map<string, HttpTypes.StoreRegion>(),
	regionMapUpdated: Date.now(),
};

async function getRegionMap(cacheId: string) {
	const { regionMap, regionMapUpdated } = regionMapCache;

	if (!BACKEND_URL) {
		throw new Error("Missing MEDUSA_BACKEND_URL");
	}

	if (
		!regionMap.keys().next().value ||
		regionMapUpdated < Date.now() - 3600 * 1000
	) {
		const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
			headers: {
				"x-publishable-api-key": PUBLISHABLE_API_KEY!,
			},
			next: {
				revalidate: 3600,
				tags: [`regions-${cacheId}`],
			},
			cache: "force-cache",
		}).then(async (response) => {
			const json = await response.json();
			if (!response.ok) throw new Error(json.message);
			return json;
		});

		if (!regions?.length) {
			throw new Error("No regions found.");
		}

		regions.forEach((region: HttpTypes.StoreRegion) => {
			region.countries?.forEach((c) => {
				regionMapCache.regionMap.set(c.iso_2 ?? "", region);
			});
		});

		regionMapCache.regionMapUpdated = Date.now();
	}

	return regionMapCache.regionMap;
}

async function getCountryCode(
	request: NextRequest,
	regionMap: Map<string, HttpTypes.StoreRegion | number>,
) {
	try {
		const vercelCountryCode = request.headers
			.get("x-vercel-ip-country")
			?.toLowerCase();

		if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
			return vercelCountryCode;
		}

		if (regionMap.has(DEFAULT_REGION)) {
			return DEFAULT_REGION;
		}

		return regionMap.keys().next().value;
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error getting country code:", error);
		}
	}
}

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();

	const cacheIdCookie = request.cookies.get("_medusa_cache_id");
	const cacheId = cacheIdCookie?.value || crypto.randomUUID();

	const regionMap = await getRegionMap(cacheId);
	const countryCode = await getCountryCode(request, regionMap);

	if (!cacheIdCookie) {
		response.cookies.set("_medusa_cache_id", cacheId, {
			maxAge: 60 * 60 * 24,
		});
	}

	// You can optionally attach region info to headers or cookies here if needed
	if (countryCode) {
		response.headers.set("x-region-code", countryCode);
	}

	return response;
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
	],
};

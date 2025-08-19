import "server-only";
import { cookies as nextCookies } from "next/headers";

// Simplified cookie functions without Medusa references
export const getCacheOptions = async (
	tag: string,
): Promise<{ tags: string[] } | {}> => {
	// Return empty object since we're not using caching tags
	return {};
};
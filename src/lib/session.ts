import type { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
	password:
		process.env.SESSION_PASSWORD ??
		"complex_password_at_least_32_characters_long",
	cookieName: "parus_admin_session",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 7, // 1 week
		httpOnly: true,
	},
};

export type User = {
	id: string;
	name: string;
	email: string;
	role: "admin" | "user";
};

declare module "iron-session" {
	interface IronSessionData {
		user?: User;
	}
}

import { getSiteSettings } from "@/lib/data/site-settings";
import ContactModalClient, {
	type ContactSettings,
} from "./contact-modal-client";

const DEFAULT_SETTINGS: ContactSettings = {
	phone: "+79999999999",
	email: "perm@parus.ru",
	address: "г. Пермь, Советской армии 52\nэтаж 128, офис 812",
	footerNote:
		"Похоронное бюро в СПб ООО «Центр РУ». © 2025. ИНН: 7813661578, КПП: 780601001",
};

export default async function ContactModalProvider() {
	const settings = await getSiteSettings();
	const resolvedSettings: ContactSettings = {
		phone: settings?.phone || DEFAULT_SETTINGS.phone,
		email: settings?.email || DEFAULT_SETTINGS.email,
		address: settings?.address || DEFAULT_SETTINGS.address,
		footerNote: settings?.footerNote || DEFAULT_SETTINGS.footerNote,
	};

	return <ContactModalClient settings={resolvedSettings} />;
}

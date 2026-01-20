import Section from "@/components/ui/section";
import { listAddresses } from "@/lib/data/addresses";
import type { CemeteryLocation } from "@/types/landing";
import LandingAddressesClient from "./landing-addresses-client";

export default async function LandingAddresses() {
	const {
		response: { data: addresses },
	} = await listAddresses({
		page: 1,
		queryParams: { limit: 200 },
	});

	const cemeteries = addresses.filter(
		(address) => address.type === "cemetery",
	);

	const cemeteriesForMap: CemeteryLocation[] = cemeteries.map((cemetery) => ({
		id: cemetery.id,
		name: cemetery.name,
		address: cemetery.address || "",
		handle: cemetery.handle || undefined,
		phone: cemetery.phone || [],
		coords:
			typeof cemetery.cemeteryLat === "number" &&
			typeof cemetery.cemeteryLng === "number"
				? ([cemetery.cemeteryLat, cemetery.cemeteryLng] as [
						number,
						number,
					])
				: null,
	}));

	return (
		<Section
			id="addresses"
			title="Полезные адреса"
			subtitle="Кладбища Перми с адресами и отметками на карте."
		>
			<LandingAddressesClient cemeteries={cemeteriesForMap} />
		</Section>
	);
}

"use client";

import { useParams } from "next/navigation";
import AddressForm from "@/modules/admin/templates/address-form";

export default function EditAddressPage() {
	const params = useParams();
	const addressId = params.id as string;

	return <AddressForm addressId={addressId} />;
}

"use client";

import { UserForm } from "@/modules/admin/templates/user-form";
import { useParams } from "next/navigation";

export default function EditUserPage() {
	const params = useParams();
	const userId = params.id as string;

	return <UserForm userId={userId} />;
}

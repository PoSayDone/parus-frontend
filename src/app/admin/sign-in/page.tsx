import { SignInForm } from "@/modules/admin/components/sign-in-form";
import { getUser } from "@/lib/data/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
	const user = await getUser();

	if (user) {
		redirect("/admin");
	}

	return (
		<div className="w-full flex-1 flex items-center justify-center bg-background">
			<SignInForm />
		</div>
	);
}

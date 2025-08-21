"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/data/auth";
import { LogOut } from "lucide-react";

export function SignOutButton() {
	return (
		<form action={signOut}>
			<Button
				type="submit"
				variant="ghost"
				className="w-full justify-start px-4 text-destructive"
			>
				<LogOut />
				Выйти
			</Button>
		</form>
	);
}

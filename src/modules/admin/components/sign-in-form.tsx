"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/data/auth";
import {
	signInFormSchema,
	SignInFormSchema,
} from "@/modules/admin/schemas/sign-in-form-schema";

export function SignInForm() {
	const router = useRouter();

	const form = useForm<SignInFormSchema>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: SignInFormSchema) {
		try {
			const result = await signIn(values);

			if (result?.error) {
				toast.error(result.error);
				return;
			}

			if (result?.success) {
				toast.success("Вы успешно вошли в систему");
				router.push("/admin");
				router.refresh();
			}
		} catch (error) {
			toast.error("Произошла ошибка при входе");
		}
	}

	return (
		<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
					Вход в панель управления
				</h1>
				<p className="text-sm text-muted-foreground">
					Введите свои учетные данные для доступа к панели управления
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="admin@example.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="••••••"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="w-full"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? "Вход..." : "Войти"}
					</Button>
				</form>
			</Form>
		</div>
	);
}

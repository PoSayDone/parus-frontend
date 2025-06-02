"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { MenuIcon, Phone, XIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Dispatch, useState } from "react";
import { headerLinks } from "@/lib/constants";

const HeaderContent = ({
	menuState,
	setMenuState,
}: {
	menuState: boolean;
	setMenuState: Dispatch<boolean>;
}) => {
	return (
		<>
			<div className="flex flex-row  gap-8">
				<Link href={"/"} className="font-bold text-xl ml-2 -mt-0.5">
					Парус
				</Link>
				<nav className="justify-center hidden md:flex gap-6">
					{headerLinks.map((item) => {
						return (
							<Link key={item.href} href={item.href}>
								{item.label}
							</Link>
						);
					})}
				</nav>
			</div>
			<div className="flex justify-end gap-2 items-center">
				<Popover>
					<PopoverTrigger asChild>
						<Button className="flex w-[54px] !px-0 sm:size-auto sm:w-auto sm:h-[54px] sm:!px-7.5">
							<Phone />{" "}
							<span className="hidden sm:block">Позвонить</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-6" align="end">
						<div className="flex flex-col">
							<p className="mb-1">По телефону</p>
							<a
								className="text-xl font-medium"
								href="tel:+79999999999"
							>
								+7 999 999 99 99
							</a>
							<p className="text-sm text-muted-foreground">
								Для всех абонентов
							</p>
						</div>
					</PopoverContent>
				</Popover>
				<Button
					className="md:hidden"
					size={"icon"}
					variant={"secondary"}
					onClick={() => {
						setMenuState((prev) => !prev);
					}}
				>
					{menuState ? <XIcon /> : <MenuIcon />}
				</Button>
			</div>
		</>
	);
};

export default function Header() {
	const [menuState, setMenuState] = useState(false);

	const NavMenuLink = ({ name, href }: { name: string; href: string }) => {
		return (
			<Link href={href} onClick={() => setMenuState(false)}>
				<li
					className={cn(
						buttonVariants({
							variant: "ghost",
							// variant: active ? "default" : "ghost",
						}),
						"w-full justify-start",
					)}
				>
					{name}
				</li>
			</Link>
		);
	};

	return (
		<header className="flex px-2 md:px-8 py-3 text-base items-center sticky top-0 bg-background z-40 justify-between">
			<HeaderContent menuState={menuState} setMenuState={setMenuState} />
			<Dialog modal open={menuState} onOpenChange={setMenuState}>
				<DialogContent
					className={cn(
						"h-[100dvh] w-screen !max-w-full rounded-none !px-0 !py-0",
						"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-top-1/2 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-50 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100",
					)}
					showClose={false}
				>
					<DialogTitle className="sr-only">
						Navigation dialog
					</DialogTitle>
					<div className="flex-col md:px-6">
						<div className="flex items-center justify-between px-2 py-3">
							<HeaderContent
								menuState={menuState}
								setMenuState={setMenuState}
							/>
						</div>
						{headerLinks.map((item) => {
							return (
								<NavMenuLink
									key={item.href}
									name={item.label}
									href={item.href}
								/>
							);
						})}
					</div>
				</DialogContent>
			</Dialog>
		</header>
	);
}

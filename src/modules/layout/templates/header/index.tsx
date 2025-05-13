import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Suspense } from "react";
import CartButton from "@modules/layout/components/cart-button";

export default function Header() {
	return (
		<header className="flex px-8 py-3 text-xl items-center sticky top-0 bg-background z-40">
			<div className="flex-1">
				<Link href={"/"}>
					Парус
					{/* <Image
						src="/logo.svg"
						alt="Логотип краевой ритуальной компании"
						width={180}
						height={38}
					/> */}
				</Link>
			</div>
			<nav className="flex-1 flex justify-center">
				<Link href="/store">Каталог</Link>
			</nav>
			<div className="flex-1 flex justify-end gap-2 items-center">
				<div className="px-4">+7 963 842 15 42</div>
				<Button>
					<Phone /> Позвонить
				</Button>
				<Suspense
					fallback={
						<Link
							className={buttonVariants({ variant: "outline" })}
							href="/cart"
							data-testid="nav-cart-link"
						>
							Корзина (0)
						</Link>
					}
				>
					<CartButton />
				</Suspense>
			</div>
		</header>
	);
}

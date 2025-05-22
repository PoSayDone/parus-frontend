import React, { Suspense } from "react";

import Footer from "@modules/layout/templates/footer";
import Header from "@modules/layout/templates/header";
import Link from "next/link";
import CartButton from "./components/cart-button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Layout: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
			<Footer />
			<div className="fixed bottom-8 right-4 md:bottom-8 md:right-8 z-20">
				<Suspense
					fallback={
						<Link
							className={cn(
								buttonVariants({ variant: "secondary" }),
							)}
							href="/cart"
							data-testid="nav-cart-link"
						>
							Cart (0)
						</Link>
					}
				>
					<CartButton />
				</Suspense>
			</div>
		</div>
	);
};

export default Layout;

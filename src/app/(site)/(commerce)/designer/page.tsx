import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DesignerPage() {
	return (
		<div className="w-full py-12">
			<div
				className="py-48 px-2 flex flex-col justify-center items-start"
				data-testid="empty-cart-message"
			>
				<h1 className="text-3xl">Конструктор в разработке</h1>
				<div className="text-lg mt-4 mb-6 max-w-[32rem]">
					На данный момент конструктор находится в разработке, просим
					прощения за предоставленные неудобства. Сейчас вы можете
					воспользоваться катлогом товаров и найти интересующий вас
					товар при помощи него.
				</div>
				<div className="flex gap-2">
					<Link
						href="/services"
						className={cn(buttonVariants({ variant: "default" }))}
					>
						Перейти к услугам
					</Link>
					<Link
						href="/store"
						className={cn(buttonVariants({ variant: "outline" }))}
					>
						Перейти к товарам
					</Link>
				</div>
			</div>
		</div>
	);
}

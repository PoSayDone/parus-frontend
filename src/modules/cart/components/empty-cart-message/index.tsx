import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const EmptyCartMessage = () => {
	return (
		<div
			className="py-48 px-2 flex flex-col justify-center items-start"
			data-testid="empty-cart-message"
		>
			<h1 className="text-3xl">Корзина</h1>
			<div className="text-lg mt-4 mb-6 max-w-[32rem]">
				Вы не добавили ничего в корзину. Давайте изменим это,
				используйте ссылку ниже, чтобы начать просматривать наши
				продукты.
			</div>
			<div>
				<Link href="/store" className={cn(buttonVariants("default"))}>
					Перейти к товарам
				</Link>
			</div>
		</div>
	);
};

export default EmptyCartMessage;

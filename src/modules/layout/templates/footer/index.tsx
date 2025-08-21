import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import FooterDocuments from "../../components/footer-documents";
import { Suspense } from "react";
import SkeletonFooterDocuments from "@/modules/skeletons/components/skeleton-footer-documents";

export default function Footer() {
	return (
		<footer className="px-8 py-10 md:p-20 flex flex-col justify-between border-t">
			<div className="flex flex-col md:flex-row justify-between items-start py-6 gap-6 md:mb-6">
				<div className="flex flex-col gap-2">
					<Link href={"/"} className="font-bold text-xl mb-2">
						Парус
					</Link>
					<p className="text-sm">
						г. Пермь, Советской армии 52,
						<br /> этаж 128, офис 812
					</p>
					<p className="text-sm">parus@perm.ru</p>
					<Link href="tel:+79999999999" className="text-sm">
						+79999999999
					</Link>
				</div>
				<div className="flex flex-col gap-2">
					<h6 className="font-bold text-xl mb-2">Компания</h6>
					<Link href={"/"} className="text-sm">
						О нас
					</Link>
					<Link href={"/"} className="text-sm">
						Новости
					</Link>
					<Link href={"/admin"} className="text-sm">
						Панель
					</Link>
				</div>
				<div className="flex flex-col gap-2">
					<h6 className="font-bold text-xl mb-2">Покупателям</h6>
					<ul>
						<Suspense fallback={<SkeletonFooterDocuments />}>
							<FooterDocuments />
						</Suspense>
					</ul>
				</div>
				<div className="flex-col justify-start items-start text-start flex py-8 md:py-0">
					<h2 className="text-2xl font-medium mb-2">
						Не нашли ответ на вопрос?
					</h2>
					<p className="mb-4">
						Напишите нам удобным способом
						<br /> и специалист ответит в течение 5 минут
					</p>
					<Link
						href={"tel:+79999999999"}
						className={cn(buttonVariants())}
					>
						Задать вопрос
					</Link>
				</div>
			</div>
			<p className="text-muted-foreground text-sm">
				Похоронное бюро в СПб ООО «Центр РУ». © 2025. ИНН: 7813661578,
				КПП: 780601001
			</p>
		</footer>
	);
}

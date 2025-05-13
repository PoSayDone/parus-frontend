import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
	return (
		<section id="hero" className="flex gap-4 mx-8">
			<div className="rounded-4xl p-10 bg-secondary-container flex-1 relative overflow-clip">
				<div className="flex flex-col gap-4 relative z-[1]">
					<h1>
						Сопровождаем вас
						<br /> в трудный час
					</h1>
					<p className="text-2xl font-medium">
						Всесторонняя поддержка и бережное отношение
						<br />к каждой детали похоронной церемонии
					</p>
				</div>
				<Image
					className="absolute xl:bottom-0 xl:right-0"
					src="/angel.png"
					alt="Ангел"
					width={795}
					height={662}
					priority
				/>
				<Button className="absolute bottom-10 right-10">
					Стоимость похорон
				</Button>
			</div>
			<div className="flex flex-col gap-4">
				<Button
					className="hover:bg-inverse-primary/80 transition bg-inverse-primary text-foreground text-2xl font-medium aspect-square px-8 text-center flex items-center justify-center rounded-full h-auto"
					asChild
				>
					<Link href={"/"}>
						Что делать,
						<br /> если случилась беда?
					</Link>
				</Button>
				<Button
					asChild
					className="hover:bg-inverse-primary/80 transition bg-inverse-primary text-foreground text-2xl font-medium h-[400px] py-8 text-center flex items-start justify-center rounded-4xl relative overflow-clip"
				>
					<Link href={"/"}>
						Перейти
						<br />в конструтор
						<Image
							className="absolute top-32"
							src="/tomb.png"
							alt="Логотип краевой ритуальной компании"
							width={205}
							height={370}
						/>
						<div className="w-[54] h-[54] absolute right-5 bottom-5 bg-primary text-on-primary rounded-full flex items-center justify-center">
							<ArrowRight className="size-6" />
						</div>
					</Link>
				</Button>
			</div>
		</section>
	);
}

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";

export default function Hero() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <explanation>
		<Section
			id="hero"
			className="flex flex-col md:flex-row gap-4 py-0 w-full grow-0"
		>
			<div className="rounded-4xl bg-secondary-container flex-1 relative overflow-clip flex flex-col min-h-[600px] md:min-h-auto">
				<div className="flex flex-col gap-4 relative z-[1] text-left pt-10 px-10">
					<h1 className="text-3xl lg:text-5xl font-medium">
						Сопровождаем вас
						<br /> в трудный час
					</h1>
					<p className="text-xl lg:text-2xl">
						Всесторонняя поддержка и бережное отношение
						<br />к каждой детали похоронной церемонии
					</p>
				</div>
				<div className="relative 2xl:static grow-1">
					<div className="absolute top-6 right-4 lg:right-20 -scale-x-100 xl:max-w-[600px] max-w-[500px] w-full aspect-[4/9]">
						<Image
							fill
							className="object-cover"
							src="/angel.png"
							alt="Ангел"
							priority
						/>
					</div>
				</div>
				<div className="pb-10 px-10 z-[1]">
					<Link
						href={"/prices"}
						className={buttonVariants({
							size: "lg",
							className: "w-full",
						})}
					>
						Стоимость похорон
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-1 md:flex md:flex-col gap-4 sm:grid-cols-2">
				<Link
					className={cn(
						buttonVariants(),
						"hover:bg-inverse-primary/80 transition bg-inverse-primary text-foreground text-2xl font-medium sm:aspect-square px-8 text-center flex items-center justify-center rounded-full sm:h-auto h-[150px]",
					)}
					href={"#actions"}
				>
					Что делать,
					<br /> если случилась беда?
				</Link>
				<Link
					href={"/designer"}
					className={cn(
						buttonVariants(),
						"hover:bg-inverse-primary/80 transition bg-inverse-primary text-foreground text-2xl font-medium sm:h-[400px] h-[300px] py-8 text-center flex items-start justify-center rounded-4xl relative overflow-clip",
					)}
				>
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
			</div>
		</Section>
	);
}

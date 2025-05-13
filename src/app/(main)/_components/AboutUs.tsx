import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Section from "@/components/ui/section";

export default function AboutUs() {
	return (
		<Section
			id="about-us"
			className="flex flex-row max-w-[1200px] mx-auto gap-16 items-center"
		>
			<Image
				className="mx-auto mt-4"
				src="/about.png"
				alt="Иллюстрации"
				width={505}
				height={553}
			/>
			<div className="text-left">
				<h2 className="text-5xl font-medium mb-10">
					О краевой ритуальной компании
				</h2>
				<div className="flex flex-col gap-6 leading-8">
					<p>
						Мы помогаем проводить близких с достоинством, уважением
						и заботой. Наша компания оказывает полный комплекс
						ритуальных услуг, поддерживая вас на каждом этапе – от
						оформления документов до организации прощальной
						церемонии.
					</p>
					<p>
						Работая с вниманием к традициям и пожеланиям семьи, мы
						обеспечиваем достойное прощание, помогая вам в сложный
						момент.
					</p>
				</div>
				<Button className="mt-14" asChild>
					<Link href="/about">Подробнее о нас</Link>
				</Button>
			</div>
		</Section>
	);
}

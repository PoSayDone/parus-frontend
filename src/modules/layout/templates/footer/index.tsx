import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Footer() {
	return (
		<footer className="p-8 flex justify-between">
			<div className="flex flex-col justify-between">
				<Image
					// className="dark:invert"
					src="/logo.svg"
					alt="Логотип краевой ритуальной компании"
					width={180}
					height={38}
				/>
				<p>
					Похоронное бюро в СПб ООО «Центр РУ». © 2025. ИНН:
					7813661578, КПП: 780601001
				</p>
			</div>
			<div className="flex-col justify-end items-end text-end">
				<h2 className="text-3xl font-medium mb-5">
					Не нашли ответ на вопрос?
				</h2>
				<p className="mb-7">
					Напишите нам удобным способом
					<br /> и специалист ответит в течение 5 минут
				</p>
				<Button>Задать вопрос</Button>
			</div>
		</footer>
	);
}

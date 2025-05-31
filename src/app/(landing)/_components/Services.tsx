import Card from "@/app/(landing)/_components/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Section from "@/components/ui/section";
import Image from "next/image";

export default function Services() {
	return (
		<Section
			className="!px-0"
			id="services"
			title="Доступные услуги"
			subtitle={
				<>
					<span>Полный комплекс ритуальных услуг.</span>
					<br />
					От подготовки места захоронения до установки памятников.
				</>
			}
		>
			<ScrollArea>
				<div className="flex gap-4 px-4">
					<Card title="Памятники">
						<Image
							className="mx-auto mt-16"
							src="/tomb.png"
							alt="Логотип краевой ритуальной компании"
							width={205}
							height={370}
						/>
					</Card>
					<Card title="Памятники">
						<Image
							className="mx-auto mt-16"
							src="/tomb.png"
							alt="Логотип краевой ритуальной компании"
							width={205}
							height={370}
						/>
					</Card>
					<Card title="Памятники">
						<Image
							className="mx-auto mt-16"
							src="/tomb.png"
							alt="Логотип краевой ритуальной компании"
							width={205}
							height={370}
						/>
					</Card>
					<Card title="Памятники">
						<Image
							className="mx-auto mt-16"
							src="/tomb.png"
							alt="Логотип краевой ритуальной компании"
							width={205}
							height={370}
						/>
					</Card>
					<Card title="Памятники">
						<Image
							className="mx-auto mt-16"
							src="/tomb.png"
							alt="Логотип краевой ритуальной компании"
							width={205}
							height={370}
						/>
					</Card>
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</Section>
	);
}

import Card from "@/components/ui/card";
import Section from "@/components/ui/section";
import Image from "next/image";

export default function Services() {
	return (
		<Section
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
			<div className="flex gap-4">
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
		</Section>
	);
}

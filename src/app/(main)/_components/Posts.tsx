import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import Link from "next/link";

const Post = ({
	date,
	title,
	description,
	imageUrl,
}: {
	date: string;
	title: string;
	description: string;
	imageUrl?: string;
}) => {
	return (
		<div className="flex flex-col">
			<div className="w-full aspect-video bg-secondary-container rounded-3xl" />
			<div className="text-2xl mt-4">{date}</div>
			<h3 className="text-3xl font-medium mt-2">{title}</h3>
			<p className="text-lg mt-2">{description}</p>
		</div>
	);
};

export default function Posts() {
	return (
		<Section
			id="posts"
			className="px-0 items-center"
			title="Полезные статьи"
			subtitle="Последние новости от нас."
		>
			<div className="grid columns-2 max-w-[1200px] w-full text-left justify-between items-start self-center grid-cols-[1fr_1fr] gap-4">
				<Post
					date="Сентябрь 23, 2024"
					title="Если родственник умер за границей"
					description="Герой одного очень известного романа говорил: «Человек смертен, и это было бы еще полбеды. Плохо то, что он иногда внезапно смертен»..."
					imageUrl="https://example.com/image.jpg"
				/>
				<Post
					date="Сентябрь 23, 2024"
					title="Новая статья"
					description="Описание статьи"
					imageUrl="https://example.com/image.jpg"
				/>
			</div>
			<Button asChild className="mt-4">
				<Link href="/">Все статьи</Link>
			</Button>
		</Section>
	);
}

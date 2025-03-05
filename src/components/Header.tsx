import Image from "next/image";

export default function Header() {
	return (
		<header className="flex mx-8 py-6">
			<Image
				// className="dark:invert"
				src="/logo.svg"
				alt="Логотип краевой ритуальной компании"
				width={180}
				height={38}
			/>
		</header>
	);
}

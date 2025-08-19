import Image from "next/image";
import React from "react";
import PlaceholderImage from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";

type ThumbnailProps = {
	thumbnail?: string | null;
	images?: any[] | null;
	isFeatured?: boolean;
	className?: string;
	"data-testid"?: string;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
	thumbnail,
	images,
	className,
	"data-testid": dataTestid,
}) => {
	const initialImage = thumbnail || images?.[0]?.url;

	return (
		<div
			className={cn(
				"relative w-full overflow-hidden rounded-3xl p-4 bg-card group-hover:shadow-elevation-card-hover transition-shadow ease-in-out duration-150 border",
				className,
				"aspect-[16/9] rounded-3xl",
			)}
			data-testid={dataTestid}
		>
			<ImageOrPlaceholder image={initialImage} />
		</div>
	);
};

const ImageOrPlaceholder = ({ image }: { image?: string }) => {
	return image ? (
		<Image
			src={image}
			alt="Thumbnail"
			className="absolute inset-0 object-cover object-center bg-card"
			draggable={false}
			quality={50}
			sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
			fill
		/>
	) : (
		<div className="w-full h-full absolute inset-0 flex items-center justify-center">
			<PlaceholderImage size={24} />
		</div>
	);
};

export default Thumbnail;

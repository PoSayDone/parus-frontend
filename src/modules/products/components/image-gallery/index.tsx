import Image from "next/image";
import { StoreProductImage } from "@/types/store";

type ImageGalleryProps = {
  images: StoreProductImage[] | string[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 gap-y-4">
        {images.map((image, index) => {
          // Handle both string URLs and StoreProductImage objects
          const imageUrl = typeof image === 'string' ? image : image.url;
          const imageId = typeof image === 'string' ? `image-${index}` : image.id;
          
          return (
            <div
              key={imageId}
              className="relative aspect-[4/6] w-full overflow-hidden bg-ui-bg-subtle"
              id={imageId}
            >
              {!!imageUrl && (
                <Image
                  src={imageUrl}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 rounded-[16px]"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
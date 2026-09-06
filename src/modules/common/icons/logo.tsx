import Image from "next/image";

export default function Logo({ 
  size = 32, 
  className = "" 
}: { 
  size?: number; 
  className?: string;
}) {
  // Высчитываем ширину (пропорция оригинального лого 1838/850 = ~2.16)
  const width = Math.round(size * 2.16);

  return (
    <Image
      src="/logo.svg"
      alt="Ритуальное агентство Парус"
      width={width}
      height={size}
      priority // Важно: грузим сразу, так как логотип в первом экране
      className={className}
    />
  );
}
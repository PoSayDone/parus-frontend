import {
  TypographyH1,
  TypographyH2,
  TypographySectionSubtitle,
} from "@/components/typography";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  subtitleClassName?: string; // ДОБАВИЛИ
  level?: "h1" | "h2";
};

export default function SectionHeading({
  title,
  subtitle,
  className,
  subtitleClassName,
  level = "h2", // По умолчанию h2
}: SectionHeadingProps) {
  if (!title && !subtitle) {
    return null;
  }

	const HeadingComponent = level === "h1" ? TypographyH1 : TypographyH2;
  return (
    <div
      className={cn(
        "flex flex-col items-start text-start mb-8 gap-4",
        className,
      )}
    >
	{!!title && <HeadingComponent>{title}</HeadingComponent>}
      
      {!!subtitle && (
        // Используем cn, чтобы объединить стандартный max-w-4xl и то, что мы передадим
        <TypographySectionSubtitle className={cn("max-w-4xl", subtitleClassName)}>
          {subtitle}
        </TypographySectionSubtitle>
      )}
    </div>
  );
}

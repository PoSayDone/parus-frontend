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
  level?: "h1" | "h2";
};

export default function SectionHeading({
  title,
  subtitle,
  className,
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
        <TypographySectionSubtitle className="max-w-4xl">
          {subtitle}
        </TypographySectionSubtitle>
      )}
    </div>
  );
}

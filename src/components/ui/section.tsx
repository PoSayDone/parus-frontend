import SectionHeading from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export default function Section({
  id,
  className,
  textContainerClassName,
  headingClassName,
  title,
  subtitle,
  children,
}: {
  id: string;
  className?: string;
  textContainerClassName?: string;
  headingClassName?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col text-left py-8 lg:py-12 px-4",
        className,
      )}
    >
      <SectionHeading
        title={title}
        subtitle={subtitle}
        subtitleClassName={textContainerClassName}
        className={headingClassName}
      />
      {children}
    </section>
  );
}

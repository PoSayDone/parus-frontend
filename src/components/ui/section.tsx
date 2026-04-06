import SectionHeading from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export default function Section({
  id,
  className,
  textContainerClassName,
  title,
  subtitle,
  children,
}: {
  id: string;
  className?: string;
  textContainerClassName?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col text-left sm:text-center py-8 lg:py-24 m-0 px-4 sm:px-4",
        className,
      )}
    >
      <SectionHeading
        title={title}
        subtitle={subtitle}
        // передаем стили в subtitleClassName, чтобы они попали на текст
		  subtitleClassName={textContainerClassName} 
		  // А className теперь пустой или можно передать туда стандартный className секции
		  className=""
      />
      {children}
    </section>
  );
}

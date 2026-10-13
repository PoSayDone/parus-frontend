import SectionHeading from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import Interaction from "@/modules/landing/components/interaction-server";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/ui/breadcrumbs";

type ContactSectionContent = {
  title: string;
  description: string;
};

type PageTemplateProps = {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  contactSection?: ContactSectionContent;
  rootClassName?: string;
  containerClassName?: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export default function PageTemplate({
  title,
  description,
  children,
  contactSection,
  rootClassName,
  containerClassName,
  breadcrumbs,
}: PageTemplateProps) {
  return (
    <div className={cn("min-h-[60vh]", rootClassName)}>
      <div className={cn("container mx-auto px-4 page-pad", containerClassName)}>
        {/* Если передали крошки — рисуем их, иначе просто заголовок текущей страницы */}
        <Breadcrumbs
          items={breadcrumbs || [{ label: typeof title === "string" ? title : "" }]}
        />
        <SectionHeading
          className="mb-8 lg:mb-12"
          title={title}
          subtitle={description}
          level="h1"
        />

        {/* Каждый прямой потомок — отдельный блок страницы */}
        <div className="page-blocks">
          {children}
          {contactSection ? (
            <Interaction
              bare
              title={contactSection.title}
              description={contactSection.description}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

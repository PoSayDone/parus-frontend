import SectionHeading from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import Interaction from "@/modules/landing/components/interaction";
import type { ReactNode } from "react";

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
};

export default function PageTemplate({
  title,
  description,
  children,
  contactSection,
  rootClassName,
  containerClassName,
}: PageTemplateProps) {
  return (
    <div className={cn("min-h-screen px-0", rootClassName)}>
      <div className={cn("container mx-auto px-4 py-12", containerClassName)}>
        <SectionHeading
          className="mb-8 lg:mb-24"
          title={title}
          subtitle={description}
        />

        {children}
      </div>
      {contactSection ? (
        <Interaction
          title={contactSection.title}
          description={contactSection.description}
        />
      ) : null}
    </div>
  );
}

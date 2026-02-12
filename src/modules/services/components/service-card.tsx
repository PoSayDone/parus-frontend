import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon-picker";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/admin";
import Link from "next/link";

export const ServiceCard = ({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) => {
  return (
    <Card
      key={service.id}
      className={cn(
        "group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20",
        className,
      )}
    >
      <CardHeader className="text-start">
        <div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 size-16">
          {service.icon && (
            <Icon
              name={service.icon as IconName}
              className="size-10 text-primary"
            />
          )}
        </div>
        <CardTitle className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {service.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground mb-2">
          {service.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Link
          className={buttonVariants({
            variant: "secondary",
            className: "w-full",
          })}
          href={`/services/${service.handle}`}
        >
          Подробнее
        </Link>
      </CardFooter>
    </Card>
  );
};

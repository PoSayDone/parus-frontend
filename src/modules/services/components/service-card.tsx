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
        "group transition-colors hover:border-primary/40",
        className,
      )}
    >
      <CardHeader className="text-start">
        <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 size-14">
          {service.icon && (
            <Icon
              name={service.icon as IconName}
              className="size-7 text-primary"
            />
          )}
        </div>
        <CardTitle>
          {service.title}
        </CardTitle>
        <CardDescription className="mb-2">
          {service.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Link
          className={buttonVariants({
            variant: "outline",
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

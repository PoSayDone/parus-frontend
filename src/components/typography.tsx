import { cn } from "@/lib/utils";
import type * as React from "react";

export function TypographyH1({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className={cn("text-3xl lg:text-5xl font-medium leading-none", className)}
      {...props}
    />
  );
}

export function TypographyH2({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "text-3xl lg:text-7xl -tracking-[0.05em]! font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyH3({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn(
        "text-2xl lg:text-5xl -tracking-[0.05em]! font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyH4({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h4">) {
  return (
    <h4 className={cn("font-medium text-foreground", className)} {...props} />
  );
}

export function TypographyP({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-lg leading-snug!", className)} {...props} />;
}

export function TypographySmall({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function TypographySectionSubtitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "text-lg lg:text-2xl text-muted-foreground leading-snug max-w-3xl",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyPreline({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return <span className={cn("whitespace-pre-line", className)} {...props} />;
}

export function TypographySpan({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return <span className={cn(className)} {...props} />;
}

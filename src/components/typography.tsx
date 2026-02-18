import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";

export function TypographyH1({
  asChild = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h1"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "h1";

  return (
    <Comp
      className={cn("text-3xl lg:text-5xl font-medium leading-none", className)}
      {...props}
    />
  );
}

export function TypographyH2({
  asChild = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h2"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "h2";

  return (
    <Comp
      className={cn(
        "text-3xl lg:text-7xl -tracking-[0.05em]! font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyH3({
  asChild = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h3"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "h3";

  return (
    <Comp
      className={cn(
        "text-2xl lg:text-5xl -tracking-[0.05em]! font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyH4({
  asChild = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h4"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "h4";

  return (
    <Comp className={cn("font-medium text-foreground", className)} {...props} />
  );
}

export function TypographyP({
  asChild = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "p";

  return <Comp className={cn("text-lg leading-snug!", className)} {...props} />;
}

export function TypographySmall({
  asChild = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function TypographySectionSubtitle({
  asChild = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "text-lg lg:text-2xl text-muted-foreground leading-snug max-w-3xl",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyPreline({
  asChild = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return <Comp className={cn("whitespace-pre-line", className)} {...props} />;
}

export function TypographySpan({
  asChild = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return <Comp className={cn(className)} {...props} />;
}

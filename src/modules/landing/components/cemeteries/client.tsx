"use client";

import { TypographySmall, TypographySpan } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { CemeteryLocation } from "@/types/landing";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import CemeteriesMap from "../cemeteries-map";

export default function CemeteriesClient({
  cemeteries,
}: {
  cemeteries: CemeteryLocation[];
}) {
  const [activeId, setActiveId] = useState<string | null>(
    cemeteries[0]?.id || null,
  );
  const hasInteracted = useRef(false);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const locationsWithCoords = useMemo(
    () => cemeteries.filter((cemetery) => cemetery.coords),
    [cemeteries],
  );

  useEffect(() => {
    if (!activeId || !hasInteracted.current) return;
    const node = itemRefs.current[activeId];
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeId]);

  return (
    <Card className="text-left flex flex-col p-0 overflow-x-clip grow-0 h-full gap-0 overflow-clip">
      <CardHeader className="flex justify-between items-center gap-3 px-0 py-4 [.border-b]:pb-1 border-b">
        {cemeteries.length === 0 ? (
          <TypographySmall className="text-muted-foreground">
            Информация готовится.
          </TypographySmall>
        ) : (
          <ScrollArea className="min-h-0 min-w-0 h-full grow pb-3">
            <ScrollBar orientation="horizontal" />
            <ul className="flex flex-row px-4">
              {cemeteries.map((item) => (
                <li
                  key={item.id}
                  ref={(node) => {
                    itemRefs.current[item.id] = node;
                  }}
                  className={cn(
                    "rounded-xl px-3 py-3 transition-colors leading-none min-w-75",
                    activeId === item.id && "bg-primary text-on-primary",
                  )}
                  onMouseEnter={() => {
                    hasInteracted.current = true;
                    setActiveId(item.id);
                  }}
                >
                  {item.handle ? (
                    <Link
                      href={`/addresses/${item.handle}`}
                      className="hover:underline h-fit leading-none!"
                      onClick={() => {
                        hasInteracted.current = true;
                        setActiveId(item.id);
                      }}
                    >
                      <TypographySpan className="font-medium text-base">
                        {item.name}
                      </TypographySpan>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        hasInteracted.current = true;
                        setActiveId(item.id);
                      }}
                      className="text-left leading-none"
                    >
                      <TypographySpan className="font-medium text-base">
                        {item.name}
                      </TypographySpan>
                    </button>
                  )}
                  <TypographySmall
                    className={cn(
                      "text-muted-foreground",
                      activeId === item.id && "text-on-primary/70",
                    )}
                  >
                    {item.address || "—"}
                  </TypographySmall>
                  {item.phone?.length ? (
                    <TypographySmall
                      className={cn(
                        "text-muted-foreground",
                        "text-on-primary/70",
                      )}
                    >
                      Телефон: {item.phone.join(", ")}
                    </TypographySmall>
                  ) : null}
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardHeader>
      <CardContent className="h-[50dvh] lg:h-[70dvh] p-0 m-0 relative">
        <CemeteriesMap
          locations={locationsWithCoords}
          activeId={activeId}
          onSelect={(id) => {
            hasInteracted.current = true;
            setActiveId(id);
          }}
        />
        <Link
          href="/addresses"
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "absolute top-4 right-4",
          })}
        >
          Смотреть все адреса
        </Link>
      </CardContent>
    </Card>
  );
}

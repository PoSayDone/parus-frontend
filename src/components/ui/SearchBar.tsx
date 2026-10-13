"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function SearchBar({
  defaultValue = "",
  autoFocus = false,
}: {
  defaultValue?: string;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState<string>(defaultValue);
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} role="search" className="flex gap-2">
      <div className="relative grow min-w-0">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Услуга, кладбище, товар…"
          aria-label="Поиск по сайту"
          autoFocus={autoFocus}
          className="pl-13 text-base md:text-base"
        />
      </div>
      <Button type="submit" className="h-[54px]">
        Найти
      </Button>
    </form>
  );
}

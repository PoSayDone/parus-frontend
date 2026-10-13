"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { headerLinks } from "@/lib/constants";
import { cn, formatPhoneNumber } from "@/lib/utils";
import Logo from "@/modules/common/icons/logo";
import { MenuIcon, Phone, XIcon, Search } from "lucide-react";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
const SearchBar = dynamic(() => import("@/components/ui/SearchBar"), { ssr: false });

const HeaderContent = ({
  menuState,
  setMenuState,
  setSearchOpen,
  links,
  phone,
}: {
  menuState: boolean;
  setMenuState: Dispatch<SetStateAction<boolean>>;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
  links: { label: string; href: string }[];
  phone: string;
}) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-row items-center gap-8">
        <Link href={"/"} aria-label="Парус, на главную" className="-mt-0.5">
          <Logo size={32} />
        </Link>
        <nav className="items-center hidden lg:flex gap-6">
          {links.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "h-fit transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex justify-end gap-2 items-center">
        <Button
          className="hidden md:flex"
          size={"icon"}
          variant={"ghost"}
          title="Поиск по сайту"
          onClick={() => {
            setMenuState(false);
            setSearchOpen(true);
          }}
        >
          <Search className="size-5" />
          <span className="sr-only">Поиск</span>
        </Button>
        <a
          href={`tel:${phone}`}
          className={cn(buttonVariants({ variant: "default" }), "px-4 sm:px-6")}
        >
          <Phone />
          {formatPhoneNumber(phone)}
        </a>
        <Button
          className="lg:hidden"
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            setMenuState((prev) => !prev);
          }}
		  aria-label={menuState ? "Закрыть меню" : "Открыть меню"}
        >
          {menuState ? <XIcon /> : <MenuIcon />}
        </Button>
      </div>
    </>
  );
};

// Невидимый компонент для отслеживания смены URL (требуется для Suspense)
function NavigationTracker({
  setMenuState,
  setSearchOpen
}: {
  setMenuState: Dispatch<SetStateAction<boolean>>;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMenuState(false);
    setSearchOpen(false);
  }, [pathname, searchParams, setMenuState, setSearchOpen]);

  return null;
}

export default function Header({
  showCatalog,
  phone,
}: {
  showCatalog: boolean;
  phone: string;
}) {
  const [menuState, setMenuState] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  

  const links = showCatalog
    ? headerLinks
    : headerLinks.filter((item) => item.href !== "/store");

  const NavMenuLink = ({
    name,
    href,
    className,
  }: {
    name: string;
    href: string;
    className?: string;
  }) => {
    return (
      <li>
        <Link
          href={href}
          onClick={() => setMenuState(false)}
          prefetch={false}
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "w-full justify-start rounded-none",
            className,
          )}
        >
          {name}
        </Link>
      </li>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 text-base">
      
      {/* Безопасное отслеживание URL, которое не сломает сборку Next.js */}
      <Suspense fallback={null}>
        <NavigationTracker setMenuState={setMenuState} setSearchOpen={setSearchOpen} />
      </Suspense>

      <HeaderContent
        menuState={menuState}
        setMenuState={setMenuState}
        setSearchOpen={setSearchOpen}
        links={links}
        phone={phone}
      />
      </div>
      <Dialog modal open={menuState} onOpenChange={setMenuState}>
        <DialogContent
          className={cn(
            "h-dvh w-screen !max-w-full rounded-none border-none !px-0 !py-0",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-top-1/2 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-50 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100",
          )}
          showClose={false}
        >
          <DialogTitle className="sr-only">Меню</DialogTitle>
          <div className="flex-col ">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
              <HeaderContent
				menuState={menuState}
				setMenuState={setMenuState}
				setSearchOpen={setSearchOpen}
				links={links}
				phone={phone}
			  />
            </div>
            <div className="container mx-auto flex flex-col grow h-full pt-2">
              
              {/* Выводим полноценную строку поиска внутри бургер-меню */}
              <div className="px-4 pb-4 md:hidden">
                <SearchBar />
              </div>

              <ul>
                {links.map((item) => {
                  return (
                    <NavMenuLink
                      key={item.href}
                      name={item.label}
                      href={item.href}
                      className="text-xl px-4 py-4 h-fit"
                    />
                  );
                })}
              </ul>
            </div>
            <div className="h-[78px]" />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-2xl top-[15%] translate-y-0 p-6 md:p-8 gap-6">
          <DialogTitle className="text-2xl">
            Поиск по сайту
          </DialogTitle>

          <SearchBar autoFocus />

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground mr-1">
              Разделы:
            </span>
            <Link
              href="/services"
              prefetch={false}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Услуги
            </Link>
            <Link
              href="/addresses"
              prefetch={false}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Адреса и учреждения
            </Link>
            <Link
              href="/prices"
              prefetch={false}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Цены
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}

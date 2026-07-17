"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { headerLinks } from "@/lib/constants";
import { cn, formatPhoneNumber } from "@/lib/utils";
import Logo from "@/modules/common/icons/logo";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import { MenuIcon, Phone, XIcon, Search } from "lucide-react";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SearchBar from "@/components/ui/SearchBar";

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
  return (
    <>
      <div className="flex flex-row  gap-8">
        <Link href={"/"} className="text-xl ml-2 md:ml-0 -mt-0.5">
          <Logo size={32} />
        </Link>
        <nav className="items-center hidden lg:flex gap-6">
          {links.map((item) => {
            return (
              <Link key={item.href} href={item.href} className="h-fit">
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex justify-end gap-2 items-center">
	  {/* Кнопка поиска */}
        {/* Используем обычный тег <button>, чтобы shadcn не урезал размер иконки */}
        <button
          type="button"
          // Добавили hidden md:flex в самое начало
          className="hidden md:flex items-center justify-center h-10 w-10 md:h-11 md:w-11 shrink-0 text-[rgb(29,27,26)] hover:bg-gray-100 rounded-full transition-colors"
          title="Поиск по сайту"
          onClick={() => {
            setMenuState(false);
            setSearchOpen(true);
          }}
        >
          {/* Жестко задаем размеры через style, чтобы перебить любые внешние стили */}
          <Search 
            style={{ width: "28px", height: "28px" }} 
            strokeWidth={2.5} 
          />
          <span className="sr-only">Поиск</span>
        </button>
        <a
		  href={`tel:${phone}`}
		  className={cn(
			buttonVariants({ variant: "default" }),
			"flex gap-2 items-center"
		  )}
		>
		  <Phone size={18} />
		  {formatPhoneNumber(phone)}
		</a>
        <Button
          className="lg:hidden"
          size={"icon"}
          variant={"secondary"}
          onClick={() => {
            setMenuState((prev) => !prev);
          }}
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
      <Link href={href} onClick={() => setMenuState(false)}>
        <li
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "w-full justify-start items-center ",
            className,
          )}
        >
          {name}
        </li>
      </Link>
    );
  };

  return (
    <header className="flex px-2 md:px-8 py-3 text-base items-center sticky top-0 bg-background z-40 justify-between">
      
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
      <Dialog modal open={menuState} onOpenChange={setMenuState}>
        <DialogContent
          className={cn(
            "h-[100vh] w-screen !max-w-full rounded-none !px-0 !py-0",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-top-1/2 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-50 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100",
          )}
          showClose={false}
        >
          <DialogTitle className="sr-only">Navigation dialog</DialogTitle>
          <div className="flex-col ">
            <div className="flex items-center justify-between px-2 py-3 md:px-6">
              <HeaderContent
				menuState={menuState}
				setMenuState={setMenuState}
				setSearchOpen={setSearchOpen}
				links={links}
				phone={phone}
			  />
            </div>
            <div className="flex flex-col grow h-full pt-2">
              
              {/* Выводим полноценную строку поиска внутри бургер-меню */}
              <div className="px-4 pb-4 md:hidden">
                <SearchBar />
              </div>

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
            </div>
            <div className="h-[78px]" />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-3xl top-[15%] translate-y-0 p-6 md:p-10">
          <DialogTitle className="text-2xl md:text-3xl font-semibold mb-6 text-[rgb(29,27,26)]">
            Поиск по сайту
          </DialogTitle>
          
          <div className="w-full mb-8">
            <SearchBar />
          </div>

          <div className="flex flex-col gap-4 border-t border-[rgb(207,197,187)] pt-6">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
              Смотреть категории
            </p>
            <Link href="/services" className="text-[rgb(29,27,26)] hover:opacity-70 text-lg flex items-center gap-3 transition-opacity">
              <span className="text-gray-400">→</span> Услуги
            </Link>
            <Link href="/addresses" className="text-[rgb(29,27,26)] hover:opacity-70 text-lg flex items-center gap-3 transition-opacity">
              <span className="text-gray-400">→</span> Адреса и учреждения
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}

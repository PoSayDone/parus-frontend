"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { headerLinks } from "@/lib/constants";
import { cn, formatPhoneNumber } from "@/lib/utils";
import Logo from "@/modules/common/icons/logo";
import ContactModalTrigger from "@/modules/contact/components/contact-modal-trigger";
import { MenuIcon, Phone, XIcon } from "lucide-react";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useState } from "react";

const HeaderContent = ({
  menuState,
  setMenuState,
  links,
  phone,
}: {
  menuState: boolean;
  setMenuState: Dispatch<SetStateAction<boolean>>;
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
        <ContactModalTrigger>
          <Phone />
          {formatPhoneNumber(phone)}
        </ContactModalTrigger>
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

export default function Header({
  showCatalog,
  phone,
}: {
  showCatalog: boolean;
  phone: string;
}) {
  const [menuState, setMenuState] = useState(false);
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
      <HeaderContent
        menuState={menuState}
        setMenuState={setMenuState}
        links={links}
        phone={phone}
      />
      <Dialog modal open={menuState} onOpenChange={setMenuState}>
        <DialogContent
          className={cn(
            "h-[100dvh] w-screen !max-w-full rounded-none !px-0 !py-0",
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
                links={links}
                phone={phone}
              />
            </div>
            <div className="flex flex-col grow h-full">
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
    </header>
  );
}

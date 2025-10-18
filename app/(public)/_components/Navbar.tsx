"use client";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { navigationItems } from "@/constants";
import { authClient } from "@/lib/auth-client";
import { PentagonIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { UserDropdown } from "./UserDropdown";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="container flex mx-auto items-center min-h-16 px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <PentagonIcon className="size-9" />
          <span className="font-bold"> TestaLyteLMS.</span>
        </Link>
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between ">
          <div className="flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="text-xs font-medium transition-colors hover:text-primary md:text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                name={
                  session?.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session?.user.email?.split("@")[0]
                }
                image={
                  session?.user.image ??
                  `https://avatar.vercel.sh/${session?.user.email}?size=30`
                }
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Login
                </Link>
                <Link href="/login" className={buttonVariants()}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

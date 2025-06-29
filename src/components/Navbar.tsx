"use client";
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/user-profile", label: "Profile" },
    //  { href: "/sign-in", label: "Sign-in" }, 
  ];

  const pathname = usePathname();
  return (
    <header className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between p-4 bg-transparent">
        <Link href="/" className="text-xl font-bold">Alelawar</Link>
        <nav>
          <ul className="flex space-x-1.5 md:space-x-4 w-full text-sm md:text-base items-center">
            {navLinks.map((link) => {
              const isActiveLink = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${isActiveLink ? "font-bold text-white" : "text-slate-300"
                      } hover:underline transition-all duration-700 ease-in-out`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            {/* <Link href="/sign-in" className="border border-slate-600 px-3 py-1">
              Sign-in
            </Link> */}
            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton >
                <button
                  className="hover:cursor-pointer text-slate-300 border border-slate-600 px-3 py-1 hover:text-white transition-all duration-300 ease-in-out font-medium"
                >
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
          </ul>
        </nav>
      </div>
    </header>
  );
}
"use client";

import Logo from "@/assets/logos/Logo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }) {
  const pathName = usePathname();

  return (
    <main
      className={`flex-center h-screen w-full border-2 border-red-700 bg-[url('/bg_image.png')] bg-cover bg-center`}
    >
      {/* gradient-to-br from-[#e8eaeb] to-[#907a69]/30 */}
      <div className="mx-auto lg:w-1/3 2xl:w-[28%]">
        <div className="w-full bg-white border border-gradient-to-b rounded-xl border-primary">
          {children}
        </div>

        {!pathName?.includes("login") && (
          <Link
            href="/login"
            className="mt-5 text-sm flex-center-start group gap-x-2 text-foundation-brown-darker hover:text-primary"
          >
            <ArrowLeft
              size={17}
              className="transition-all duration-300 ease-in-out group-hover:-translate-x-1"
            />{" "}
            Back to login
          </Link>
        )}
      </div>
    </main>
  );
}

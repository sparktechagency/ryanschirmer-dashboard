"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({ children }) {
  const pathname = usePathname();

  return (
    <div>
      {pathname !== "/admin/settings" && (
        <Link
          href="/admin/settings"
          className="flex-center-start mb-8 w-max gap-x-2 font-medium text-gray-300"
        >
          <ArrowLeft size={16} className="mb-1" /> Settings
        </Link>
      )}
      <div className="mb-10 min-h-[100vh] !rounded-2xl p-5 shadow-2xl">
        {children}
      </div>
    </div>
  );
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/tests", label: "Bài test" },
  { href: "/records", label: "Hồ sơ bệnh án" },
  { href: "/admin", label: "Quản trị" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-blue-600"
                  : "text-gray-600"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

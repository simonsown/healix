"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/tests", label: "Bài test" },
  { href: "/records", label: "Hồ sơ bệnh án" },
  { href: "/admin", label: "Quản trị" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-teal-100 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Healix"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-teal-600">Healix</span>
        </Link>
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-teal-600",
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-teal-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-teal-500"
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

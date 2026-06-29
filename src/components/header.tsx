"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Phone, MapPin, Search, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    label: "Xét nghiệm",
    href: "/tests",
    children: [
      { label: "Test sức khỏe tổng quát", href: "/tests" },
      { label: "Trầm cảm tuổi Teen", href: "/tests/depression" },
      { label: "Tiểu đường & Cao huyết áp", href: "/tests/diabetes" },
      { label: "Nguy cơ Ung thư & Đột quỵ", href: "/tests/cancer" },
      { label: "Thừa cân & Dinh dưỡng", href: "/tests/nutrition" },
      { label: "Xét nghiệm HPV", href: "/tests/hpv" },
    ],
  },
  { label: "Phân tích AI", href: "/records" },
  { label: "Quét đơn thuốc", href: "/records" },
  { label: "Quản trị", href: "/admin" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden bg-teal-700 lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-teal-200">Tìm hiểu thêm:</span>
            <div className="flex gap-2">
              {["facebook", "tiktok", "youtube", "instagram"].map((s) => (
                <a key={s} href="#" className="text-teal-200 hover:text-white transition-colors">
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/location" className="flex items-center gap-1 text-xs text-teal-200 hover:text-white transition-colors">
              <MapPin className="h-3 w-3" /> Điểm lấy mẫu
            </Link>
            <Link href="/records" className="flex items-center gap-1 text-xs text-teal-200 hover:text-white transition-colors">
              Tra cứu kết quả
            </Link>
            <a href="tel:19001717" className="flex items-center gap-1 text-xs font-semibold text-yellow-300 hover:text-yellow-200 transition-colors">
              <Phone className="h-3 w-3" /> 1900 1717
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-teal-100 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Healix"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-teal-600">Healix</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600",
                    pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                      ? "text-teal-600"
                      : "text-gray-700"
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <a href="tel:19001717" className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block rounded-lg px-3 py-1.5 text-sm text-gray-500 hover:bg-teal-50 hover:text-teal-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

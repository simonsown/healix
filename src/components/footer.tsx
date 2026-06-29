import Image from "next/image"
import Link from "next/link"
import { Phone, Clock, MapPin, Mail, Globe, type LucideIcon } from "lucide-react"

interface FooterItem {
  label: string
  href?: string
  icon?: LucideIcon
}

const footerSections: { title: string; items: FooterItem[] }[] = [
  {
    title: "Dịch vụ",
    items: [
      { label: "Bài test sức khỏe", href: "/tests" },
      { label: "Phân tích chỉ số máu", href: "/records" },
      { label: "Quét đơn thuốc AI", href: "/records" },
      { label: "Quản trị bác sĩ", href: "/admin" },
    ],
  },
  {
    title: "Hỗ trợ",
    items: [
      { label: "Hướng dẫn sử dụng", href: "#" },
      { label: "Câu hỏi thường gặp", href: "#" },
      { label: "Chính sách bảo mật", href: "#" },
      { label: "Điều khoản sử dụng", href: "#" },
    ],
  },
  {
    title: "Liên hệ",
    items: [
      { label: "1900 1717", href: "tel:19001717", icon: Phone },
      { label: "7:00 - 20:00", icon: Clock },
      { label: "TP. Hồ Chí Minh", icon: MapPin },
      { label: "info@healix.vn", href: "mailto:info@healix.vn", icon: Mail },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-navy-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Healix"
                width={36}
                height={36}
                className="rounded-lg bg-white p-1"
              />
              <span className="text-lg font-bold text-white">Healix</span>
            </div>
            <p className="mt-3 text-sm text-teal-200">
              Trợ lý Sức khỏe AI Toàn diện - Đồng hành cùng sức khỏe của bạn mỗi ngày.
            </p>
            <div className="mt-4 flex gap-3">
              {["#1877F2", "#FF0000", "#E4405F"].map((color, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-teal-200 hover:bg-teal-500 transition-all"
                  style={{ backgroundColor: i === 0 ? "#1877F2" : i === 1 ? "#FF0000" : "#E4405F" }}
                >
                  <Globe className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 font-semibold text-teal-300">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-sm text-teal-200 hover:text-white transition-colors"
                      >
                        {item.icon && <item.icon className="h-3.5 w-3.5" />}
                        {item.label}
                      </Link>
                    ) : (
                      <span className="flex items-center gap-2 text-sm text-teal-200">
                        {item.icon && <item.icon className="h-3.5 w-3.5" />}
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-teal-500/20 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-teal-300 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Healix. Bảo lưu mọi quyền.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
              <Link href="#" className="hover:text-white transition-colors">Điều khoản</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

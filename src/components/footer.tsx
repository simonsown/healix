import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Logo />
          <p className="text-sm text-gray-500">
            &copy; 2026 Healix - Trợ lý Sức khỏe Thông minh. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  )
}

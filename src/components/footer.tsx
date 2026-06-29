import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-teal-100 bg-gradient-to-b from-white to-teal-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Healix"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-teal-600">Healix</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Trợ lý Sức khỏe AI Toàn diện - Đồng hành cùng sức khỏe của bạn mỗi ngày.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-navy-500">Dịch vụ</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/tests" className="hover:text-teal-600">Bài test sức khỏe</Link></li>
              <li><Link href="/records" className="hover:text-teal-600">Phân tích chỉ số máu</Link></li>
              <li><Link href="/records" className="hover:text-teal-600">Quét đơn thuốc AI</Link></li>
              <li><Link href="/admin" className="hover:text-teal-600">Quản trị bác sĩ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-navy-500">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-teal-500" />1900 1717</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal-500" />7:00 - 20:00</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-500" />TP. Hồ Chí Minh</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-navy-500">Kết nối</h4>
            <p className="text-sm text-gray-600">
              Theo dõi chúng tôi để nhật thông tin sức khỏe mới nhất.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-teal-100 pt-6 text-center text-sm text-gray-500">
          &copy; 2026 Healix - Trợ lý Sức khỏe Thông minh. Bảo lưu mọi quyền.
        </div>
      </div>
    </footer>
  )
}

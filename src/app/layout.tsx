import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["vietnamese"] })

export const metadata: Metadata = {
  title: "Healix - Trợ lý Sức khỏe Thông minh",
  description: "Quản lý hồ sơ sức khỏe cá nhân, làm bài test sàng lọc, lưu trữ bệnh án và nhận tư vấn dinh dưỡng từ AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} min-h-screen bg-white text-gray-900 antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

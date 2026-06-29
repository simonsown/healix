import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatBot } from "@/components/chat-bot"

const inter = Inter({ subsets: ["vietnamese", "latin"] })

export const metadata: Metadata = {
  title: "Healix - Trợ Lý Sức Khỏe AI Toàn Diện",
  description:
    "Quản lý hồ sơ sức khỏe cá nhân, làm bài test sàng lọc, quét đơn thuốc bằng AI và nhận tư vấn dinh dưỡng từ trợ lý AI thông minh.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatBot />
        </div>
      </body>
    </html>
  )
}

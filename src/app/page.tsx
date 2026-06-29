"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function HomePage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [dob, setDob] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState("")

  const calculateBMI = () => {
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h)
      setBmi(Math.round(bmiValue * 10) / 10)
      if (bmiValue < 18.5) setCategory("Thiếu cân")
      else if (bmiValue < 25) setCategory("Bình thường")
      else if (bmiValue < 30) setCategory("Thừa cân")
      else setCategory("Béo phì")
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Chăm sóc sức khỏe thông minh
          <br />
          hơn mỗi ngày
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Quản lý hồ sơ sức khỏe cá nhân, làm bài test sàng lọc, lưu trữ bệnh án và nhận tư vấn dinh dưỡng từ AI dựa trên dữ liệu y khoa chuẩn.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/tests">
            <Button size="lg">Bắt đầu ngay</Button>
          </Link>
          <Link href="/records">
            <Button variant="outline" size="lg">
              Hồ sơ bệnh án
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Nhập thông tin cá nhân</CardTitle>
            <CardDescription>
              Cung cấp thông tin cơ bản để chúng tôi tính chỉ số BMI và đưa ra đánh giá sức khỏe phù hợp nhất.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Ngày sinh</Label>
                <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Tính chỉ số BMI</CardTitle>
            <CardDescription>
              Nhập chiều cao và cân nặng để tính chỉ số khối cơ thể
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="height">Chiều cao (cm)</Label>
                <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Cân nặng (kg)</Label>
                <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
              </div>
            </div>
            <Button onClick={calculateBMI}>Tính BMI</Button>
            {bmi !== null && (
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-lg font-semibold">
                  BMI: {bmi} - {category}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="mt-20">
        <h2 className="text-center text-3xl font-bold">Tính năng nổi bật</h2>
        <p className="mt-2 text-center text-gray-600">Mọi thứ bạn cần để quản lý sức khỏe toàn diện</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bài Test Sức khỏe</CardTitle>
              <CardDescription>
                Trắc nghiệm sàng lọc trầm cảm, tiểu đường, ung thư, HPV
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Phân tích AI</CardTitle>
              <CardDescription>
                AI phân tích chỉ số máu và đơn thuốc, đưa ra lời khuyên
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hồ sơ Bệnh án</CardTitle>
              <CardDescription>
                Lưu trữ và quản lý hồ sơ sức khỏe tập trung
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tư vấn Dinh dưỡng</CardTitle>
              <CardDescription>
                Chế độ ăn uống phù hợp dựa trên dữ liệu sức khỏe
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold">Sức khỏe của bạn là ưu tiên hàng đầu</h2>
        <p className="mt-2 text-gray-600">
          Hãy làm bài test sức khỏe ngay hôm nay để phát hiện sớm nguy cơ
        </p>
        <Link href="/tests">
          <Button size="lg" className="mt-6">
            Làm bài test ngay
          </Button>
        </Link>
      </section>
    </div>
  )
}

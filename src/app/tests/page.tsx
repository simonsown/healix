import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { tests } from "@/lib/constants"

export default function TestsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Bài Test Sức khỏe</h1>
      <p className="mt-2 text-gray-600">
        Chọn bài test để đánh giá sức khỏe và phát hiện sớm nguy cơ
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tests.map((test) => (
          <Link key={test.id} href={`/tests/${test.id}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{test.title}</CardTitle>
                <CardDescription>{test.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Làm test ngay</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-yellow-50 p-6">
        <h3 className="font-semibold text-yellow-800">Lưu ý quan trọng</h3>
        <p className="mt-2 text-sm text-yellow-700">
          Các bài test chỉ mang tính chất tham khảo, không thay thế cho chẩn đoán y khoa chuyên nghiệp.
          Vui lòng tham khảo ý kiến bác sĩ để có kết luận chính xác.
        </p>
      </div>
    </div>
  )
}

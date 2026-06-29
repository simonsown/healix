import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tests } from "@/lib/constants"
import { Heart, Activity, AlertTriangle, Apple, Microscope, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Bài Test Sức khỏe - Healix",
  description: "Các bài test sức khỏe trực tuyến: trầm cảm, tiểu đường, ung thư, dinh dưỡng, HPV",
}

const icons: Record<string, React.ReactNode> = {
  depression: <Heart className="h-6 w-6" />,
  diabetes: <Activity className="h-6 w-6" />,
  cancer: <AlertTriangle className="h-6 w-6" />,
  nutrition: <Apple className="h-6 w-6" />,
  hpv: <Microscope className="h-6 w-6" />,
}

const gradients: Record<string, string> = {
  depression: "from-pink-400 to-rose-500",
  diabetes: "from-blue-400 to-cyan-500",
  cancer: "from-orange-400 to-red-500",
  nutrition: "from-green-400 to-emerald-500",
  hpv: "from-purple-400 to-violet-500",
}

export default function TestsPage() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-navy-600">Bài Test Sức khỏe</h1>
          <p className="mt-2 text-gray-500">
            Chọn bài test để đánh giá sức khỏe và phát hiện sớm nguy cơ
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {tests.map((test, i) => (
            <Link key={test.id} href={`/tests/${test.id}`} className="group">
              <Card className="h-full cursor-pointer border-0 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${gradients[test.id]}`} />
                <CardHeader>
                  <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[test.id]} text-white`}>
                    {icons[test.id]}
                  </div>
                  <CardTitle className="text-lg text-navy-600">{test.title}</CardTitle>
                  <p className="text-sm text-gray-500">{test.description}</p>
                </CardHeader>
                <CardContent>
                  <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 border-0">
                    Làm test ngay <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-amber-50 border border-amber-200 p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800">Lưu ý quan trọng</h3>
              <p className="mt-2 text-sm text-amber-700">
                Các bài test chỉ mang tính chất tham khảo, không thay thế cho chẩn đoán y khoa chuyên nghiệp.
                Vui lòng tham khảo ý kiến bác sĩ để có kết luận chính xác.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

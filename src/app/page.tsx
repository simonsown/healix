"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart, Activity, AlertTriangle, Apple, Microscope,
  Upload, FileText, Brain, ChevronRight, Shield,
  Clock, Users, Stethoscope, Sparkles, ArrowRight,
  Calendar, Phone, MapPin, CheckCircle, AlertCircle,
  Droplets, Thermometer, Weight, Wind, Bone,
  Eye, Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { tests } from "@/lib/constants"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
}

const testIcons: Record<string, React.ReactNode> = {
  depression: <Heart className="h-6 w-6" />,
  diabetes: <Activity className="h-6 w-6" />,
  cancer: <AlertTriangle className="h-6 w-6" />,
  nutrition: <Apple className="h-6 w-6" />,
  hpv: <Microscope className="h-6 w-6" />,
}

export default function HomePage() {
  const [bloodSugar, setBloodSugar] = useState("")
  const [cholesterol, setCholesterol] = useState("")
  const [triglycerides, setTriglycerides] = useState("")
  const [hdl, setHdl] = useState("")
  const [ldl, setLdl] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "Tất cả", color: "bg-blue-500" },
    { id: "mental", label: "Tâm lý", color: "bg-pink-500" },
    { id: "chronic", label: "Mãn tính", color: "bg-orange-500" },
    { id: "cancer", label: "Ung thư", color: "bg-red-500" },
    { id: "nutrition", label: "Dinh dưỡng", color: "bg-green-500" },
    { id: "hpv", label: "HPV", color: "bg-purple-500" },
  ]

  const filteredTests = activeCategory === "all"
    ? tests
    : tests.filter(t => {
      if (activeCategory === "mental") return t.id === "depression"
      if (activeCategory === "chronic") return t.id === "diabetes"
      if (activeCategory === "cancer") return t.id === "cancer"
      if (activeCategory === "nutrition") return t.id === "nutrition"
      if (activeCategory === "hpv") return t.id === "hpv"
      return true
    })

  const handleAnalyze = async () => {
    setAnalyzing(true)
    const data: Record<string, number> = {}
    if (bloodSugar) data.bloodSugar = parseFloat(bloodSugar)
    if (cholesterol) data.cholesterol = parseFloat(cholesterol)
    if (triglycerides) data.triglycerides = parseFloat(triglycerides)
    if (hdl) data.hdl = parseFloat(hdl)
    if (ldl) data.ldl = parseFloat(ldl)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      setAnalysis(result.analysis || "")
    } catch {
      setAnalysis("Có lỗi xảy ra khi phân tích.")
    }
    setAnalyzing(false)
  }

  return (
    <div className="overflow-hidden">
      {/* ===== HERO BANNER ===== */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-navy-600">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-teal-500/30 text-teal-100 border-0">
                <Sparkles className="mr-1 h-3 w-3" /> Trợ lý Sức khỏe AI
              </Badge>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                Trợ Lý Sức Khỏe AI
                <br />
                <span className="text-teal-300">Toàn Diện</span>
              </h1>
              <p className="mt-4 max-w-xl text-base text-teal-100/80">
                Quản lý hồ sơ sức khỏe, làm bài test sàng lọc trực tuyến,
                quét đơn thuốc bằng AI và nhận tư vấn dinh dưỡng thông minh.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/tests">
                  <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 shadow-lg group">
                    <Calendar className="mr-2 h-4 w-4" /> Đặt lịch test ngay
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/records">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <FileText className="mr-2 h-4 w-4" /> Tải lên phiếu chỉ định
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-teal-200">
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-teal-300" /> 5+ bài test</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-teal-300" /> AI phân tích</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-teal-300" /> Bảo mật</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="rounded-2xl bg-white/10 p-1 backdrop-blur-sm">
                <div className="rounded-xl bg-white p-6 shadow-2xl">
                  <h3 className="mb-4 text-lg font-semibold text-navy-600">
                    Đặt lịch hẹn trực tuyến
                  </h3>
                  <div className="space-y-3">
                    <Input placeholder="Họ và tên" className="border-gray-200" />
                    <Input placeholder="Số điện thoại" className="border-gray-200" />
                    <Input type="date" className="border-gray-200" />
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-md">
                      Đăng ký tư vấn <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                    <p className="text-center text-xs text-gray-400">
                      Miễn phí tư vấn - Bác sĩ liên hệ trong 24h
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="h-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600" />
      </section>

      {/* ===== CATEGORY TABS ===== */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-teal-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEST GRID (giống Diag grid) ===== */}
      <motion.section className="bg-gray-50 py-16" {...fadeUp}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-navy-600">
              Các gói tầm soát sức khỏe
            </h2>
            <p className="mt-2 text-gray-500">
              Khám phá các bài test sức khỏe trực tuyến của Healix
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {filteredTests.map((test, i) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Link href={`/tests/${test.id}`}>
                  <Card className="group h-full cursor-pointer border-0 bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${test.id === 'depression' ? 'from-pink-400 to-rose-500' : test.id === 'diabetes' ? 'from-blue-400 to-cyan-500' : test.id === 'cancer' ? 'from-orange-400 to-red-500' : test.id === 'nutrition' ? 'from-green-400 to-emerald-500' : 'from-purple-400 to-violet-500'}`} />
                    <CardContent className="p-5">
                      <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white ${
                        test.id === 'depression' ? 'bg-gradient-to-br from-pink-400 to-rose-500' : test.id === 'diabetes' ? 'bg-gradient-to-br from-blue-400 to-cyan-500' : test.id === 'cancer' ? 'bg-gradient-to-br from-orange-400 to-red-500' : test.id === 'nutrition' ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-purple-400 to-violet-500'
                      }`}>
                        {testIcons[test.id]}
                      </div>
                      <h3 className="font-semibold text-navy-600">{test.title}</h3>
                      <p className="mt-1 text-xs text-gray-500">{test.description}</p>
                      <div className="mt-4 flex items-center text-sm font-medium text-teal-600 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                        Khám phá ngay <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== AI ANALYZER HUB ===== */}
      <motion.section className="bg-white py-16" {...fadeUp}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-navy-600">
              Trung tâm Phân tích AI
            </h2>
            <p className="mt-2 text-gray-500">
              Tải lên đơn thuốc hoặc nhập chỉ số xét nghiệm để AI phân tích
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Tab 1: Blood test */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-500" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-navy-600">
                  <Droplets className="h-5 w-5 text-teal-500" /> Nhập Chỉ số Xét nghiệm
                </CardTitle>
                <CardDescription>Nhập các chỉ số xét nghiệm máu cơ bản để AI phân tích</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-500">Đường huyết (mmol/L)</Label>
                    <Input type="number" step="0.1" value={bloodSugar} onChange={(e) => setBloodSugar(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-500">Cholesterol (mmol/L)</Label>
                    <Input type="number" step="0.1" value={cholesterol} onChange={(e) => setCholesterol(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-500">Triglycerides</Label>
                    <Input type="number" step="0.1" value={triglycerides} onChange={(e) => setTriglycerides(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-500">HDL (mmol/L)</Label>
                    <Input type="number" step="0.1" value={hdl} onChange={(e) => setHdl(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-500">LDL (mmol/L)</Label>
                    <Input type="number" step="0.1" value={ldl} onChange={(e) => setLdl(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tab 2: Prescription Upload */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-500" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-navy-600">
                  <Upload className="h-5 w-5 text-teal-500" /> Tải lên Đơn thuốc
                </CardTitle>
                <CardDescription>Upload ảnh đơn thuốc, AI sẽ quét và bóc tách thông tin</CardDescription>
              </CardHeader>
              <CardContent>
                <PrescriptionUpload />
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={analyzing}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg px-8"
              >
                {analyzing ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Đang phân tích...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-5 w-5" /> Kích hoạt Trợ lý AI Phân tích
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== RESULTS PANEL ===== */}
      {analysis && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 py-16"
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-navy-600">Kết quả Phân tích</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-l-4 border-l-teal-500 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-teal-600">
                      <Shield className="h-5 w-5" /> Đánh giá y khoa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-sm text-gray-700">{analysis}</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-l-4 border-l-green-500 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-green-600">
                      <CheckCircle className="h-5 w-5" /> Nên dùng
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {["Rau xanh và trái cây tươi", "Cá hồi, cá thu giàu omega-3", "Ngũ cốc nguyên hạt", "Uống đủ 2 lít nước/ngày"].map((item, i) => (
                        <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="border-l-4 border-l-red-400 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-red-500">
                      <AlertCircle className="h-5 w-5" /> Cần tránh
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {["Đồ chiên rán, thức ăn nhanh", "Đường và đồ ngọt", "Rượu bia, thuốc lá", "Thức khuya, căng thẳng kéo dài"].map((item, i) => (
                        <motion.li key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            <p className="mt-6 text-center text-xs text-gray-400">
              Dữ liệu được đối chiếu dựa trên bộ tri thức cốt lõi nạp bởi Bác sĩ chuyên khoa Healix
            </p>
          </div>
        </motion.section>
      )}

      {/* ===== WHY HEALIX (giống Diag) ===== */}
      <motion.section className="bg-white py-16" {...fadeUp}>
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold text-navy-600">Vì sao nên chọn Healix?</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Brain, title: "AI Thông minh", desc: "Phân tích sức khỏe bằng trí tuệ nhân tạo tiên tiến", color: "from-teal-400 to-teal-500" },
              { icon: Shield, title: "Bảo mật tuyệt đối", desc: "Dữ liệu sức khỏe được mã hóa và bảo vệ an toàn", color: "from-blue-400 to-blue-500" },
              { icon: Clock, title: "Tiết kiệm thời gian", desc: "Làm test online, nhận kết quả ngay tại nhà", color: "from-green-400 to-green-500" },
              { icon: Users, title: "Chuyên gia y khoa", desc: "Đội ngũ bác sĩ giàu kinh nghiệm tư vấn", color: "from-purple-400 to-purple-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <Card className="h-full border-0 bg-gradient-to-b from-white to-gray-50 shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}
                    >
                      <item.icon className="h-8 w-8" />
                    </motion.div>
                    <h3 className="mt-4 font-semibold text-navy-600">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== DOCTOR PORTAL ===== */}
      <motion.section className="bg-gradient-to-br from-teal-50 to-white py-16" {...fadeUp}>
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-xl border border-teal-100"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">
              <Stethoscope className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-navy-600">Dành cho Chuyên gia Y khoa</h2>
            <p className="mt-2 text-gray-500">
              Nạp bộ câu hỏi & Bộ dữ liệu huấn luyện AI. Quản lý bệnh nhân và hồ sơ sức khỏe.
            </p>
            <Link href="/admin">
              <Button size="lg" className="mt-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg">
                <Stethoscope className="mr-2 h-5 w-5" /> Vào cổng Quản trị Bác sĩ
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== CTA ===== */}
      <motion.section className="bg-navy-600 py-16" {...fadeUp}>
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white"
          >
            Sức khỏe của bạn là ưu tiên hàng đầu
          </motion.h2>
          <p className="mt-3 text-lg text-teal-200">
            Hãy làm bài test sức khỏe ngay hôm nay để phát hiện sớm nguy cơ
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/tests">
              <Button size="lg" className="mt-6 bg-white text-navy-600 hover:bg-teal-50 shadow-lg">
                Làm bài test ngay <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== FLOATING ACTIONS ===== */}
      <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-2">
        <motion.a
          href="tel:19001717"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-white shadow-lg"
        >
          <Phone className="h-5 w-5" />
        </motion.a>
      </div>
    </div>
  )
}

function PrescriptionUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [ocrText, setOcrText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append("file", file)
    try {
      const res = await fetch("/api/ocr", { method: "POST", body: formData })
      const data = await res.json()
      setOcrText(data.text || "Không thể nhận dạng văn bản.")
    } catch {
      setOcrText("Lỗi khi xử lý ảnh.")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <motion.div
        whileHover={{ borderColor: "#14b8a6" }}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 transition-all hover:bg-teal-50/30"
      >
        <Upload className="h-8 w-8 text-gray-300" />
        <p className="mt-2 text-sm font-medium text-gray-600">Kéo thả hoặc click để chọn ảnh</p>
        <p className="text-xs text-gray-400">PNG, JPG, JPEG (tối đa 10MB)</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-3 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-teal-50 file:px-3 file:py-1 file:text-sm file:text-teal-600 hover:file:bg-teal-100"
        />
      </motion.div>
      {file && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-teal-600">
          {file.name}
        </motion.p>
      )}
      <div className="flex justify-center">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            variant="outline"
            className="border-teal-500 text-teal-600 hover:bg-teal-50"
          >
            {loading ? (
              <><div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" /> Đang quét...</>
            ) : (
              <><Zap className="mr-2 h-4 w-4" /> Quét đơn thuốc bằng AI</>
            )}
          </Button>
        </motion.div>
      </div>
      {ocrText && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700"
        >
          <strong className="text-teal-600">Kết quả OCR:</strong>
          <p className="mt-1 whitespace-pre-wrap">{ocrText}</p>
        </motion.div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  Activity,
  AlertTriangle,
  Apple,
  Microscope,
  Upload,
  FileText,
  Brain,
  ChevronRight,
  Shield,
  Clock,
  Users,
  Stethoscope,
  Sparkles,
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

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

const testIcons: Record<string, React.ReactNode> = {
  depression: <Heart className="h-6 w-6" />,
  diabetes: <Activity className="h-6 w-6" />,
  cancer: <AlertTriangle className="h-6 w-6" />,
  nutrition: <Apple className="h-6 w-6" />,
  hpv: <Microscope className="h-6 w-6" />,
}

const testColors: Record<string, string> = {
  depression: "from-pink-400 to-rose-500",
  diabetes: "from-blue-400 to-cyan-500",
  cancer: "from-orange-400 to-red-500",
  nutrition: "from-green-400 to-emerald-500",
  hpv: "from-purple-400 to-violet-500",
}

export default function HomePage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [dob, setDob] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [bmiCategory, setBmiCategory] = useState("")

  const [bloodSugar, setBloodSugar] = useState("")
  const [cholesterol, setCholesterol] = useState("")
  const [triglycerides, setTriglycerides] = useState("")
  const [hdl, setHdl] = useState("")
  const [ldl, setLdl] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [analyzing, setAnalyzing] = useState(false)

  const calcBMI = () => {
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (h > 0 && w > 0) {
      const v = w / (h * h)
      setBmi(Math.round(v * 10) / 10)
      if (v < 18.5) setBmiCategory("Thiếu cân")
      else if (v < 25) setBmiCategory("Bình thường")
      else if (v < 30) setBmiCategory("Thừa cân")
      else setBmiCategory("Béo phì")
    }
  }

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
      {/* SECTION 1: HERO */}
      <section className="relative bg-gradient-to-br from-teal-500 via-teal-600 to-navy-500">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="default" className="mb-4 bg-white/20 text-white backdrop-blur">
                <Sparkles className="mr-1 h-3 w-3" /> Trợ lý Sức khỏe AI
              </Badge>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                HEALIX
                <br />
                <span className="text-teal-200">Trợ Lý Sức Khỏe AI</span>
                <br />
                Toàn Diện Của Bạn
              </h1>
              <p className="mt-4 text-lg text-teal-100">
                Quản lý hồ sơ sức khỏe, làm bài test sàng lọc, quét đơn thuốc và nhận tư vấn dinh dưỡng từ AI.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/tests">
                  <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                    Khám phá ngay <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/records">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10"
                  >
                    Hồ sơ bệnh án
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg"
            >
              <h3 className="mb-4 text-lg font-semibold text-white">Nhập hồ sơ sức khỏe</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
                <Input
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
                <Input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/50 [color-scheme:dark]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Chiều cao (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                  <Input
                    type="number"
                    placeholder="Cân nặng (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                </div>
                <Button
                  onClick={calcBMI}
                  className="w-full bg-white text-teal-600 hover:bg-teal-50"
                >
                  Tính BMI
                </Button>
                {bmi !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg bg-white/20 p-3 text-center text-white"
                  >
                    <span className="text-2xl font-bold">{bmi}</span>
                    <Badge className="ml-2 bg-white/30 text-white">{bmiCategory}</Badge>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* SECTION 2: TEST GRID */}
      <motion.section className="py-20" {...fadeUp}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-500">
              Các gói tầm soát và bài test sức khỏe trực tuyến
            </h2>
            <p className="mt-2 text-gray-500">
              Đánh giá sức khỏe toàn diện với các bài test chuyên sâu
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {tests.map((test, i) => (
              <motion.div
                key={test.id}
                variants={stagger}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Link href={`/tests/${test.id}`}>
                  <Card className="group h-full cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg transition-shadow hover:shadow-xl">
                    <CardContent className="p-6">
                      <div
                        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white ${testColors[test.id]}`}
                      >
                        {testIcons[test.id]}
                      </div>
                      <h3 className="font-semibold text-navy-500">{test.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{test.description}</p>
                      <div className="mt-4 flex items-center text-sm font-medium text-teal-600 opacity-0 transition-opacity group-hover:opacity-100">
                        Làm test ngay <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: AI ANALYZER */}
      <motion.section className="bg-gradient-to-b from-white to-teal-50 py-20" {...fadeUp}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-500">
              Trung tâm Xử lý Hồ sơ & Bệnh án AI
            </h2>
            <p className="mt-2 text-gray-500">
              Tải lên đơn thuốc hoặc nhập chỉ số xét nghiệm để AI phân tích
            </p>
          </div>

          <Card className="mt-10 border-0 shadow-xl">
            <CardContent className="p-8">
              <Tabs defaultValue="blood">
                <TabsList className="mb-6">
                  <TabsTrigger value="blood">
                    <FileText className="mr-2 h-4 w-4" /> Nhập Chỉ số Xét nghiệm Máu
                  </TabsTrigger>
                  <TabsTrigger value="prescription">
                    <Upload className="mr-2 h-4 w-4" /> Tải lên Đơn thuốc / Bệnh án
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="blood">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-1">
                      <Label className="text-navy-500">Đường huyết (mmol/L)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={bloodSugar}
                        onChange={(e) => setBloodSugar(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-navy-500">Cholesterol (mmol/L)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={cholesterol}
                        onChange={(e) => setCholesterol(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-navy-500">Triglycerides (mmol/L)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={triglycerides}
                        onChange={(e) => setTriglycerides(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-navy-500">HDL (mmol/L)</Label>
                      <Input type="number" step="0.1" value={hdl} onChange={(e) => setHdl(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-navy-500">LDL (mmol/L)</Label>
                      <Input type="number" step="0.1" value={ldl} onChange={(e) => setLdl(e.target.value)} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="prescription">
                  <PrescriptionUpload />
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                >
                  {analyzing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Đang phân tích...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-5 w-5" /> Kích hoạt Trợ lý AI Phân tích
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* SECTION 4: RESULTS */}
      {analysis && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16"
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-navy-500">
                Kết quả Phân tích Chuyên sâu
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-l-4 border-l-teal-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-teal-600">
                    <Shield className="h-5 w-5" /> Đánh giá y khoa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-sm text-gray-700">{analysis}</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-green-600">
                    <Apple className="h-5 w-5" /> Nên dùng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                      Rau xanh và trái cây tươi
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                      Cá hồi, cá thu giàu omega-3
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                      Ngũ cốc nguyên hạt
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                      Uống đủ 2 lít nước/ngày
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-400">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-red-500">
                    <AlertTriangle className="h-5 w-5" /> Cần tránh
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                      Đồ chiên rán, thức ăn nhanh
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                      Đường và đồ ngọt
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                      Rượu bia, thuốc lá
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                      Thức khuya, căng thẳng kéo dài
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="mt-6 text-center text-xs text-gray-400">
              Dữ liệu được đối chiếu dựa trên bộ tri thức cốt lõi nạp bởi Bác sĩ chuyên khoa Healix
            </p>
          </div>
        </motion.section>
      )}

      {/* WHY HEALIX */}
      <motion.section className="bg-white py-20" {...fadeUp}>
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold text-navy-500">Vì sao nên chọn Healix?</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Brain, title: "AI Thông minh", desc: "Phân tích sức khỏe bằng trí tuệ nhân tạo tiên tiến" },
              { icon: Shield, title: "Bảo mật tuyệt đối", desc: "Dữ liệu sức khỏe được mã hóa và bảo vệ an toàn" },
              { icon: Clock, title: "Tiết kiệm thời gian", desc: "Làm test online, nhận kết quả ngay tại nhà" },
              { icon: Users, title: "Chuyên gia y khoa", desc: "Đội ngũ bác sĩ giàu kinh nghiệm tư vấn" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-semibold text-navy-500">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: DOCTOR / ADMIN */}
      <motion.section className="bg-gradient-to-b from-white to-teal-50 py-20" {...fadeUp}>
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">
              <Stethoscope className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-navy-500">
              Dành cho Chuyên gia Y khoa
            </h2>
            <p className="mt-2 text-gray-500">
              Nạp bộ câu hỏi & Bộ dữ liệu huấn luyện AI. Quản lý bệnh nhân và hồ sơ sức khỏe.
            </p>
            <Link href="/admin">
              <Button
                size="lg"
                className="mt-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
              >
                <Stethoscope className="mr-2 h-5 w-5" /> Vào cổng Quản trị Bác sĩ
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <motion.section className="bg-navy-500 py-20" {...fadeUp}>
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Sức khỏe của bạn là ưu tiên hàng đầu
          </h2>
          <p className="mt-3 text-lg text-teal-200">
            Hãy làm bài test sức khỏe ngay hôm nay để phát hiện sớm nguy cơ
          </p>
          <Link href="/tests">
            <Button
              size="lg"
              className="mt-6 bg-white text-navy-500 hover:bg-teal-50"
            >
              Làm bài test ngay <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.section>
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
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-teal-200 bg-teal-50/50 p-8 transition hover:border-teal-400">
        <Upload className="h-10 w-10 text-teal-400" />
        <p className="mt-2 text-sm font-medium text-teal-600">Kéo thả hoặc click để chọn ảnh</p>
        <p className="text-xs text-gray-400">PNG, JPG, JPEG (tối đa 10MB)</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-4 text-sm"
        />
      </div>
      {file && (
        <p className="text-center text-sm text-teal-600">Đã chọn: {file.name}</p>
      )}
      <div className="flex justify-center">
        <Button
          onClick={handleUpload}
          disabled={!file || loading}
          variant="outline"
          className="border-teal-500 text-teal-600 hover:bg-teal-50"
        >
          {loading ? "Đang quét..." : "Quét đơn thuốc bằng AI"}
        </Button>
      </div>
      {ocrText && (
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
          <strong>Kết quả OCR:</strong>
          <p className="mt-1 whitespace-pre-wrap">{ocrText}</p>
        </div>
      )}
    </div>
  )
}

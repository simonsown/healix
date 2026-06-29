"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplets, Upload, Brain, FileText, CheckCircle, AlertCircle, Shield, Zap } from "lucide-react"

export default function RecordsPage() {
  const [bloodSugar, setBloodSugar] = useState("")
  const [cholesterol, setCholesterol] = useState("")
  const [triglycerides, setTriglycerides] = useState("")
  const [hdl, setHdl] = useState("")
  const [ldl, setLdl] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [ocrText, setOcrText] = useState("")
  const [ocrLoading, setOcrLoading] = useState(false)

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

  const handleOcr = async () => {
    if (!file) return
    setOcrLoading(true)
    const formData = new FormData()
    formData.append("file", file)
    try {
      const res = await fetch("/api/ocr", { method: "POST", body: formData })
      const data = await res.json()
      setOcrText(data.text || "Không thể nhận dạng văn bản.")
    } catch {
      setOcrText("Lỗi khi xử lý ảnh.")
    }
    setOcrLoading(false)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-navy-600">Hồ sơ Bệnh án & Phân tích AI</h1>
          <p className="mt-2 text-gray-500">
            Nhập chỉ số xét nghiệm máu hoặc tải lên đơn thuốc để AI phân tích
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-500" />
            <CardContent className="p-6">
              <Tabs defaultValue="blood">
                <TabsList className="mb-6 bg-gray-100">
                  <TabsTrigger value="blood">
                    <Droplets className="mr-2 h-4 w-4" /> Chỉ số Xét nghiệm Máu
                  </TabsTrigger>
                  <TabsTrigger value="prescription">
                    <Upload className="mr-2 h-4 w-4" /> Tải lên Đơn thuốc
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="blood">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { id: "blood-sugar", label: "Đường huyết (mmol/L)", value: bloodSugar, set: setBloodSugar },
                      { id: "cholesterol", label: "Cholesterol (mmol/L)", value: cholesterol, set: setCholesterol },
                      { id: "triglycerides", label: "Triglycerides (mmol/L)", value: triglycerides, set: setTriglycerides },
                      { id: "hdl", label: "HDL (mmol/L)", value: hdl, set: setHdl },
                      { id: "ldl", label: "LDL (mmol/L)", value: ldl, set: setLdl },
                    ].map((field) => (
                      <div key={field.id} className="space-y-1">
                        <Label className="text-navy-600">{field.label}</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={field.value}
                          onChange={(e) => field.set(e.target.value)}
                          className="border-gray-200 focus:border-teal-500"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="prescription">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 transition-all hover:border-teal-400 hover:bg-teal-50/30">
                      <Upload className="h-10 w-10 text-gray-300" />
                      <p className="mt-2 text-sm font-medium text-gray-600">Kéo thả hoặc click để chọn ảnh</p>
                      <p className="text-xs text-gray-400">PNG, JPG, JPEG (tối đa 10MB)</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="mt-4 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-teal-50 file:px-3 file:py-1 file:text-sm file:text-teal-600 hover:file:bg-teal-100"
                      />
                    </div>
                    {file && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-teal-600">
                        {file.name}
                      </motion.p>
                    )}
                    <div className="flex justify-center">
                      <Button
                        onClick={handleOcr}
                        disabled={!file || ocrLoading}
                        variant="outline"
                        className="border-teal-500 text-teal-600 hover:bg-teal-50"
                      >
                        {ocrLoading ? (
                          <><div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" /> Đang quét...</>
                        ) : (
                          <><Zap className="mr-2 h-4 w-4" /> Quét đơn thuốc bằng AI</>
                        )}
                      </Button>
                    </div>
                    {ocrText && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                        <strong className="text-teal-600">Kết quả OCR:</strong>
                        <p className="mt-1 whitespace-pre-wrap">{ocrText}</p>
                      </motion.div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex justify-center">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg px-8"
                  >
                    {analyzing ? (
                      <><div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> Đang phân tích...</>
                    ) : (
                      <><Brain className="mr-2 h-5 w-5" /> Kích hoạt Trợ lý AI Phân tích</>
                    )}
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {analysis && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
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
                    <CheckCircle className="h-5 w-5" /> Nên dùng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {["Rau xanh và trái cây tươi", "Cá hồi, cá thu giàu omega-3", "Ngũ cốc nguyên hạt", "Uống đủ 2 lít nước/ngày"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-red-400">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-red-500">
                    <AlertCircle className="h-5 w-5" /> Cần tránh
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {["Đồ chiên rán, thức ăn nhanh", "Đường và đồ ngọt", "Rượu bia, thuốc lá", "Thức khuya, căng thẳng kéo dài"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400" /> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="mt-6 text-center text-xs text-gray-400">Dữ liệu được đối chiếu dựa trên bộ tri thức cốt lõi nạp bởi Bác sĩ chuyên khoa Healix</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

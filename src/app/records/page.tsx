"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function RecordsPage() {
  const [bloodSugar, setBloodSugar] = useState("")
  const [cholesterol, setCholesterol] = useState("")
  const [triglycerides, setTriglycerides] = useState("")
  const [hdl, setHdl] = useState("")
  const [ldl, setLdl] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setSelectedFile(e.target.files[0])
  }

  const handleAnalyze = async () => {
    setLoading(true)
    const data: Record<string, any> = {}
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
      setAnalysis(result.analysis || "Không có kết quả phân tích.")
    } catch {
      setAnalysis("Có lỗi xảy ra khi phân tích.")
    }
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">Hồ sơ Bệnh án & Phân tích AI</h1>
      <p className="mt-2 text-gray-600">
        Nhập chỉ số xét nghiệm máu, tải lên đơn thuốc và nhận phân tích từ AI
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Chỉ số xét nghiệm máu</CardTitle>
          <CardDescription>Nhập các chỉ số xét nghiệm máu cơ bản</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="blood-sugar">Đường huyết (mmol/L)</Label>
              <Input id="blood-sugar" type="number" step="0.1" value={bloodSugar} onChange={(e) => setBloodSugar(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cholesterol">Cholesterol (mmol/L)</Label>
              <Input id="cholesterol" type="number" step="0.1" value={cholesterol} onChange={(e) => setCholesterol(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="triglycerides">Triglycerides (mmol/L)</Label>
              <Input id="triglycerides" type="number" step="0.1" value={triglycerides} onChange={(e) => setTriglycerides(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hdl">HDL (mmol/L)</Label>
              <Input id="hdl" type="number" step="0.1" value={hdl} onChange={(e) => setHdl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ldl">LDL (mmol/L)</Label>
              <Input id="ldl" type="number" step="0.1" value={ldl} onChange={(e) => setLdl(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Tải lên đơn thuốc</CardTitle>
          <CardDescription>
            Upload ảnh chụp đơn thuốc hoặc bệnh án (AI OCR sẽ tự động bóc tách thông tin)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8">
            <p className="text-sm text-gray-500">
              Kéo thả hoặc click để chọn ảnh
            </p>
            <p className="mt-1 text-xs text-gray-400">
              PNG, JPG, JPEG (tối đa 10MB)
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-4"
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">
                Đã chọn: {selectedFile.name}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Button size="lg" onClick={handleAnalyze} disabled={loading}>
        {loading ? "Đang phân tích..." : "Phân tích bằng AI"}
      </Button>

      {analysis && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Kết quả phân tích</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm text-gray-700">{analysis}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

import { NextRequest, NextResponse } from "next/server"
import { createWorker } from "tesseract.js"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "Không tìm thấy file ảnh" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const worker = await createWorker("vie")
    const { data } = await worker.recognize(buffer)
    await worker.terminate()

    const text = data.text.trim() || "Không thể nhận dạng văn bản từ ảnh."

    return NextResponse.json({
      success: true,
      text,
      confidence: data.confidence,
      fileName: file.name,
      fileSize: file.size,
    })
  } catch {
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi xử lý ảnh", text: "Lỗi xử lý OCR." },
      { status: 500 }
    )
  }
}

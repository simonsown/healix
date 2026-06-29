import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "Không tìm thấy file ảnh", text: "Vui lòng chọn ảnh đơn thuốc để tải lên." },
        { status: 400 }
      )
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File không hợp lệ", text: "Vui lòng tải lên file ảnh (PNG, JPG, JPEG)." },
        { status: 400 }
      )
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File quá lớn", text: "Kích thước ảnh tối đa 10MB." },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let text = ""
    try {
      const { createWorker } = await import("tesseract.js")
      const worker = await createWorker("vie")
      const { data } = await worker.recognize(buffer)
      await worker.terminate()
      text = data.text.trim()
    } catch (ocrError) {
      text = ""
    }

    if (!text) {
      return NextResponse.json({
        success: true,
        text: "Không thể nhận dạng văn bản từ ảnh. Vui lòng thử lại với ảnh rõ nét hơn hoặc nhập chỉ số bằng tay.",
        fileName: file.name,
        fileSize: file.size,
      })
    }

    return NextResponse.json({
      success: true,
      text,
      fileName: file.name,
      fileSize: file.size,
    })
  } catch {
    return NextResponse.json(
      {
        error: "Lỗi server",
        text: "Có lỗi xảy ra khi xử lý OCR. Vui lòng thử lại sau.",
      },
      { status: 500 }
    )
  }
}

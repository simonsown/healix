import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "Không tìm thấy file ảnh" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const base64 = buffer.toString("base64")
    const text = `[OCR] Trích xuất văn bản từ ảnh: ${file.name}`

    return NextResponse.json({
      success: true,
      text,
      fileName: file.name,
      fileSize: file.size,
    })
  } catch {
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi xử lý ảnh" },
      { status: 500 }
    )
  }
}

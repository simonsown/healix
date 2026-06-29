import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bloodSugar, cholesterol, triglycerides, hdl, ldl } = body

    const issues: string[] = []
    const advice: string[] = []

    if (bloodSugar !== undefined) {
      if (bloodSugar > 6.1) {
        issues.push("Đường huyết cao, có nguy cơ tiền tiểu đường")
        advice.push("Hạn chế đường và tinh bột, tập thể dục thường xuyên")
      } else if (bloodSugar < 3.9) {
        issues.push("Đường huyết thấp")
        advice.push("Ăn đúng bữa, bổ sung carbohydrate phức hợp")
      } else {
        advice.push("Đường huyết ở mức bình thường")
      }
    }

    if (cholesterol !== undefined && cholesterol > 5.2) {
      issues.push("Cholesterol toàn phần cao")
      advice.push("Giảm chất béo bão hòa, tăng chất xơ")
    }

    if (triglycerides !== undefined && triglycerides > 2.3) {
      issues.push("Triglycerides cao")
      advice.push("Hạn chế rượu bia, đồ ngọt và tinh bột tinh chế")
    }

    if (hdl !== undefined && hdl < 1.0) {
      issues.push("HDL thấp (cholesterol tốt)")
      advice.push("Tập thể dục aerobic, bổ sung omega-3")
    }

    if (ldl !== undefined && ldl > 3.4) {
      issues.push("LDL cao (cholesterol xấu)")
      advice.push("Tránh đồ chiên rán, mỡ động vật")
    }

    const analysis = `
KẾT QUẢ PHÂN TÍCH CHỈ SỐ MÁU
${issues.length > 0 ? `\n⚠️ Các vấn đề phát hiện:\n- ${issues.join("\n- ")}` : "\n✅ Các chỉ số đều ở mức bình thường"}

${advice.length > 0 ? `\n📋 Lời khuyên:\n- ${advice.join("\n- ")}` : ""}

⚠️ Lưu ý: Đây chỉ là phân tích tự động dựa trên dữ liệu nhập vào. Vui lòng tham khảo ý kiến bác sĩ để có chẩn đoán chính xác.
    `.trim()

    return NextResponse.json({ analysis })
  } catch {
    return NextResponse.json(
      { analysis: "Có lỗi xảy ra khi phân tích dữ liệu." },
      { status: 500 }
    )
  }
}

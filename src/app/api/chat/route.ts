import { NextRequest, NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY || ""
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "Bạn là trợ lý AI chuyên về sức khỏe của Healix. Trả lời bằng tiếng Việt, ngắn gọn, chính xác. Luôn nhắc người dùng tham khảo ý kiến bác sĩ để có chẩn đoán chính xác.",
          },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    const data = await res.json()
    const reply = data.choices?.[0]?.message?.content || "Xin lỗi, tôi chưa thể trả lời."

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json(
      { reply: "Đã có lỗi xảy ra. Vui lòng thử lại." },
      { status: 500 }
    )
  }
}

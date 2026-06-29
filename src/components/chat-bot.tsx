"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Xin chào! Tôi là trợ lý AI của Healix. Tôi có thể giúp gì cho sức khỏe của bạn?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Xin lỗi, tôi chưa thể trả lời câu hỏi này." },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Đã có lỗi xảy ra. Vui lòng thử lại sau." },
      ])
    }
    setLoading(false)
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 z-50 flex w-80 flex-col rounded-2xl border border-teal-100 bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-teal-500 to-teal-600 p-3 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">Healix AI</span>
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="h-80 overflow-y-auto p-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "mb-3 flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "flex max-w-[80%] items-start gap-2 rounded-xl px-3 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  )}
                >
                  {msg.role === "assistant" && <Bot className="mt-0.5 h-4 w-4 shrink-0" />}
                  {msg.role === "user" && <User className="mt-0.5 h-4 w-4 shrink-0" />}
                  <span>{msg.content}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-500">
                  <Bot className="h-4 w-4" />
                  <span className="animate-pulse">Đang suy nghĩ...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="flex items-center gap-2 border-t border-gray-100 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Nhập câu hỏi..."
              className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-teal-500"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="rounded-lg bg-teal-500 p-2 text-white transition hover:bg-teal-600 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transition hover:scale-110 animate-pulse-soft"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </>
  )
}

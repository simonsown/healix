"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { tests } from "@/lib/constants"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function TestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const test = tests.find((t) => t.id === params.id)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  if (!test) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Không tìm thấy bài test</h1>
        <Link href="/tests">
          <Button className="mt-4">Quay lại danh sách</Button>
        </Link>
      </div>
    )
  }

  const question = test.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / test.questions.length) * 100
  const selectedAnswer = answers[question.id]
  const isLastQuestion = currentQuestion === test.questions.length - 1

  const handleAnswer = (score: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: score }))
    if (!isLastQuestion) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 300)
    }
  }

  const handleFinish = () => {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
    const maxScore = test.questions.length * 3
    const percentage = (totalScore / maxScore) * 100

    let result = ""
    if (percentage < 25) result = "Nguy cơ thấp"
    else if (percentage < 50) result = "Nguy cơ trung bình"
    else if (percentage < 75) result = "Nguy cơ cao"
    else result = "Nguy cơ rất cao"

    alert(`Kết quả: ${result}\nĐiểm: ${totalScore}/${maxScore}`)
    router.push("/tests")
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/tests" className="text-sm text-blue-600 hover:underline">
        &larr; Quay lại danh sách
      </Link>

      <h1 className="mt-4 text-2xl font-bold">{test.title}</h1>

      <Progress value={progress} className="mt-6" />
      <p className="mt-2 text-sm text-gray-500">
        {currentQuestion + 1}/{test.questions.length}
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(val) => handleAnswer(parseInt(val))}
          >
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="outline"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
        >
          Câu trước
        </Button>

        {selectedAnswer !== undefined && isLastQuestion ? (
          <Button onClick={handleFinish}>Xem kết quả</Button>
        ) : (
          <span className="text-sm text-gray-400">Chọn đáp án để tiếp tục</span>
        )}
      </div>
    </div>
  )
}

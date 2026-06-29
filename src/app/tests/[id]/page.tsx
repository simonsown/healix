"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle, BarChart3, AlertTriangle, Heart, Activity, Apple, Microscope, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { tests } from "@/lib/constants"

const icons: Record<string, React.ReactNode> = {
  depression: <Heart className="h-6 w-6" />,
  diabetes: <Activity className="h-6 w-6" />,
  cancer: <AlertTriangle className="h-6 w-6" />,
  nutrition: <Apple className="h-6 w-6" />,
  hpv: <Microscope className="h-6 w-6" />,
}

export default function TestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const test = tests.find((t) => t.id === params.id)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResult, setShowResult] = useState(false)

  const question = test?.questions[currentQuestion]
  const progress = test ? ((currentQuestion + 1) / test.questions.length) * 100 : 0
  const selectedAnswer = question ? answers[question.id] : undefined
  const isLastQuestion = test ? currentQuestion === test.questions.length - 1 : false

  const result = useMemo(() => {
    if (!test || !showResult) return null
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
    const maxScore = test.questions.length * 3
    const percentage = (totalScore / maxScore) * 100
    let label = ""
    let color = ""
    if (percentage < 25) { label = "Nguy cơ thấp"; color = "green" }
    else if (percentage < 50) { label = "Nguy cơ trung bình"; color = "yellow" }
    else if (percentage < 75) { label = "Nguy cơ cao"; color = "orange" }
    else { label = "Nguy cơ rất cao"; color = "red" }
    return { totalScore, maxScore, percentage, label, color }
  }, [test, answers, showResult])

  if (!test) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <FileText className="mx-auto h-16 w-16 text-gray-300" />
          <h1 className="mt-4 text-2xl font-bold text-navy-600">Không tìm thấy bài test</h1>
          <Link href="/tests">
            <Button className="mt-4 bg-teal-500 hover:bg-teal-600">Quay lại danh sách</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAnswer = (score: number) => {
    setAnswers((prev) => ({ ...prev, [question!.id]: score }))
  }

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handleFinish = () => {
    setShowResult(true)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }

  if (showResult && result) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="mx-auto max-w-2xl px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${
                result.color === "green" ? "from-green-400 to-green-500" :
                result.color === "yellow" ? "from-yellow-400 to-yellow-500" :
                result.color === "orange" ? "from-orange-400 to-orange-500" :
                "from-red-400 to-red-500"
              }`} />
              <CardContent className="p-8 text-center">
                <BarChart3 className="mx-auto h-16 w-16 text-teal-500" />
                <h2 className="mt-4 text-2xl font-bold text-navy-600">Kết quả bài test</h2>
                <p className="mt-1 text-gray-500">{test.title}</p>

                <div className="mt-8">
                  <div className="text-5xl font-bold text-navy-600">{result.totalScore}/{result.maxScore}</div>
                  <Badge className={`mt-3 text-base px-4 py-1 ${
                    result.color === "green" ? "bg-green-100 text-green-700" :
                    result.color === "yellow" ? "bg-yellow-100 text-yellow-700" :
                    result.color === "orange" ? "bg-orange-100 text-orange-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {result.label}
                  </Badge>
                </div>

                <div className="mt-8 rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">
                    Điểm của bạn đạt <strong>{Math.round(result.percentage)}%</strong> so với thang điểm tối đa.
                    {result.percentage < 50
                      ? " Kết quả cho thấy bạn có nguy cơ thấp. Hãy duy trì lối sống lành mạnh."
                      : " Kết quả cho thấy bạn có nguy cơ. Vui lòng tham khảo ý kiến bác sĩ để được tư vấn cụ thể."}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button onClick={handleRestart} variant="outline" className="border-teal-500 text-teal-600">
                    Làm lại
                  </Button>
                  <Button onClick={() => router.push("/tests")} className="bg-teal-500 hover:bg-teal-600">
                    Về danh sách
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-4">
        <Link href="/tests" className="inline-flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
        </Link>

        <div className="mt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
              {icons[test.id] || <FileText className="h-6 w-6" />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy-600">{test.title}</h1>
              <p className="text-sm text-gray-500">{test.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-teal-600">
              Câu {currentQuestion + 1}/{test.questions.length}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="mt-2 h-2 bg-gray-200" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-6 border-0 shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-500" />
              <CardHeader>
                <CardTitle className="text-xl text-navy-600">{question?.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {question?.options.map((option, index) => {
                  const score = question.scores[index]
                  const isSelected = selectedAnswer === score
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(score)}
                      className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                        isSelected
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                          isSelected
                            ? "border-teal-500 bg-teal-500 text-white"
                            : "border-gray-300"
                        }`}>
                          {isSelected && <CheckCircle className="h-4 w-4" />}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </motion.button>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            className="border-gray-300"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Câu trước
          </Button>

          {selectedAnswer !== undefined && (
            isLastQuestion ? (
              <Button onClick={handleFinish} className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
                Xem kết quả <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-teal-500 hover:bg-teal-600">
                Câu tiếp <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )
          )}

          {selectedAnswer === undefined && (
            <span className="text-sm text-gray-400">Chọn đáp án để tiếp tục</span>
          )}
        </div>
      </div>
    </div>
  )
}

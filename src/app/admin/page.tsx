"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { tests, adminQuestions } from "@/lib/constants"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("depression")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add")
  const [editingId, setEditingId] = useState<number | null>(null)

  const currentTest = tests.find((t) => t.id === activeTab)
  const questions = adminQuestions[activeTab] || []

  const handleAddQuestion = () => {
    setDialogMode("add")
    setDialogOpen(true)
  }

  const handleEditQuestion = (id: number) => {
    setEditingId(id)
    setDialogMode("edit")
    setDialogOpen(true)
  }

  const handleDeleteQuestion = (id: number) => {
    alert(`Xóa câu hỏi ${id}`)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Quản trị Hệ thống</h1>
      <p className="mt-2 text-gray-600">
        Dành cho Bác sĩ chuyên khoa - Quản lý bộ câu hỏi test và dữ liệu y khoa
      </p>

      <Tabs defaultValue="tests" className="mt-8">
        <TabsList>
          <TabsTrigger value="tests">Bộ câu hỏi Test</TabsTrigger>
          <TabsTrigger value="medical">Dữ liệu Y khoa</TabsTrigger>
        </TabsList>

        <TabsContent value="tests">
          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Quản lý bài test</h2>
            <Button onClick={handleAddQuestion}>Thêm câu hỏi</Button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Chọn bài test để xem và chỉnh sửa bộ câu hỏi
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tests.map((test) => (
              <Button
                key={test.id}
                variant={activeTab === test.id ? "default" : "outline"}
                onClick={() => setActiveTab(test.id)}
                size="sm"
              >
                {test.title}
              </Button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {currentTest && questions.map((q) => (
              <Card key={q.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Câu hỏi {q.id}: {q.question}
                    </CardTitle>
                    <Badge>{q.options.length} lựa chọn</Badge>
                  </div>
                  <CardDescription>
                    Thang điểm 0-{q.scores.length - 1}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditQuestion(q.id)}>
                      Sửa
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteQuestion(q.id)}>
                      Xóa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Dữ liệu Y khoa</CardTitle>
              <CardDescription>
                Quản lý dữ liệu y khoa và cơ sở tri thức
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Tính năng đang phát triển</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader>
          <DialogTitle>{dialogMode === "add" ? "Thêm câu hỏi" : "Sửa câu hỏi"}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>Nội dung câu hỏi</Label>
            <Textarea placeholder="Nhập nội dung câu hỏi..." />
          </div>
          <div className="space-y-2">
            <Label>Các lựa chọn</Label>
            <Textarea placeholder="Mỗi lựa chọn trên một dòng..." />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Lưu</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

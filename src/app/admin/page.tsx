"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { tests, adminQuestions } from "@/lib/constants"
import { Stethoscope, Plus, Pencil, Trash2, BookOpen, Database } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("depression")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add")

  const currentTest = tests.find((t) => t.id === activeTab)
  const questions = adminQuestions[activeTab] || []

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">
            <Stethoscope className="h-8 w-8" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-navy-600">Quản trị Hệ thống</h1>
          <p className="mt-2 text-gray-500">
            Dành cho Bác sĩ chuyên khoa - Quản lý bộ câu hỏi test và dữ liệu y khoa
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-10">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-500" />
            <CardContent className="p-6">
              <Tabs defaultValue="tests">
                <TabsList className="mb-6 bg-gray-100">
                  <TabsTrigger value="tests"><BookOpen className="mr-2 h-4 w-4" /> Bộ câu hỏi Test</TabsTrigger>
                  <TabsTrigger value="medical"><Database className="mr-2 h-4 w-4" /> Dữ liệu Y khoa</TabsTrigger>
                </TabsList>

                <TabsContent value="tests">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-navy-600">Quản lý bài test</h2>
                      <p className="text-sm text-gray-500">Chọn bài test để xem và chỉnh sửa bộ câu hỏi</p>
                    </div>
                    <Button onClick={() => setDialogOpen(true)} className="bg-teal-500 hover:bg-teal-600">
                      <Plus className="mr-2 h-4 w-4" /> Thêm câu hỏi
                    </Button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {tests.map((test) => (
                      <Button
                        key={test.id}
                        variant={activeTab === test.id ? "default" : "outline"}
                        onClick={() => setActiveTab(test.id)}
                        size="sm"
                        className={activeTab === test.id ? "bg-teal-500" : "border-gray-300"}
                      >
                        {test.title}
                      </Button>
                    ))}
                  </div>

                  <div className="mt-6 space-y-4">
                    {currentTest && questions.length > 0 ? questions.map((q, i) => (
                      <motion.div key={q.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                        <Card className="border border-gray-200">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base text-navy-600">
                                Câu hỏi {q.id}: {q.question}
                              </CardTitle>
                              <Badge variant="secondary">{q.options.length} lựa chọn</Badge>
                            </div>
                            <CardDescription>Thang điểm 0-{q.scores.length - 1}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="border-gray-300">
                                <Pencil className="mr-1 h-3 w-3" /> Sửa
                              </Button>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="mr-1 h-3 w-3" /> Xóa
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )) : (
                      <div className="rounded-xl bg-gray-100 p-8 text-center text-sm text-gray-500">
                        Chưa có câu hỏi nào cho bài test này
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="medical">
                  <div className="rounded-xl bg-gradient-to-br from-teal-50 to-white p-8 text-center">
                    <Database className="mx-auto h-12 w-12 text-teal-400" />
                    <h3 className="mt-4 font-semibold text-navy-600">Dữ liệu Y khoa</h3>
                    <p className="mt-1 text-sm text-gray-500">Quản lý dữ liệu y khoa và cơ sở tri thức</p>
                    <p className="mt-2 text-xs text-gray-400">Tính năng đang phát triển</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader>
          <DialogTitle className="text-navy-600">
            {dialogMode === "add" ? "Thêm câu hỏi mới" : "Sửa câu hỏi"}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label className="text-navy-600">Nội dung câu hỏi</Label>
            <Textarea placeholder="Nhập nội dung câu hỏi..." className="border-gray-200" />
          </div>
          <div className="space-y-2">
            <Label className="text-navy-600">Các lựa chọn (mỗi dòng một lựa chọn)</Label>
            <Textarea placeholder="Mỗi lựa chọn trên một dòng..." className="border-gray-200" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-gray-300">
              Hủy
            </Button>
            <Button onClick={() => setDialogOpen(false)} className="bg-teal-500 hover:bg-teal-600">
              Lưu
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

import { Question, Test } from "./types"

export const tests: Test[] = [
  {
    id: "depression",
    title: "Trầm cảm tuổi Teen",
    description: "Đánh giá mức độ trầm cảm và lo âu",
    icon: "heart",
    questions: [
      {
        id: 1,
        question: "Bạn có thường xuyên cảm thấy buồn hoặc trống rỗng không?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 2,
        question: "Bạn có mất hứng thú với những hoạt động từng yêu thích không?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 3,
        question: "Bạn có gặp khó khăn khi ngủ?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 4,
        question: "Bạn có cảm thấy mệt mỏi hoặc thiếu năng lượng?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 5,
        question: "Bạn có khó tập trung vào công việc hay học tập?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
    ],
  },
  {
    id: "diabetes",
    title: "Tiểu đường & Cao huyết áp",
    description: "Sàng lọc triệu chứng sớm tiểu đường và cao huyết áp",
    icon: "activity",
    questions: [
      {
        id: 1,
        question: "Bạn có thường xuyên khát nước và đi tiểu nhiều?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 2,
        question: "Bạn có thường bị đau đầu hoặc chóng mặt?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 3,
        question: "Bạn có bị tê hoặc ngứa ran ở tay chân?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 4,
        question: "Vết thương của bạn có lâu lành không?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 5,
        question: "Bạn có bị mờ mắt hoặc thị lực giảm?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
    ],
  },
  {
    id: "cancer",
    title: "Nguy cơ Ung thư & Đột quỵ",
    description: "Đánh giá nguy cơ ung thư và đột quỵ",
    icon: "alert-triangle",
    questions: [
      {
        id: 1,
        question: "Bạn có hút thuốc lá hoặc thường xuyên tiếp xúc với khói thuốc?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 2,
        question: "Bạn có tiền sử gia đình mắc bệnh ung thư?",
        options: ["Không", "Có 1 người", "Có 2 người", "Có 3+ người"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 3,
        question: "Bạn có thường xuyên uống rượu bia?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Hàng ngày"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 4,
        question: "Bạn có gặp vấn đề về tiêu hóa kéo dài?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 5,
        question: "Cân nặng của bạn có thay đổi bất thường?",
        options: ["Ổn định", "Giảm nhẹ", "Giảm nhiều", "Tăng/giảm thất thường"],
        scores: [0, 1, 2, 3],
      },
    ],
  },
  {
    id: "nutrition",
    title: "Thừa cân & Dinh dưỡng",
    description: "Đánh giá tình trạng thừa cân và bệnh dinh dưỡng",
    icon: "apple",
    questions: [
      {
        id: 1,
        question: "Bạn có ăn ít nhất 5 phần rau củ quả mỗi ngày?",
        options: ["Thường xuyên", "Thỉnh thoảng", "Hiếm khi", "Không bao giờ"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 2,
        question: "Bạn có thường xuyên ăn đồ ăn nhanh?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Hàng ngày"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 3,
        question: "Bạn có uống đủ 2 lít nước mỗi ngày?",
        options: ["Luôn luôn", "Thường xuyên", "Thỉnh thoảng", "Hiếm khi"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 4,
        question: "Bạn có tập thể dục ít nhất 30 phút mỗi ngày?",
        options: ["Luôn luôn", "Thường xuyên", "Thỉnh thoảng", "Hiếm khi"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 5,
        question: "Bạn có thường xuyên bị căng thẳng trong công việc?",
        options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
        scores: [0, 1, 2, 3],
      },
    ],
  },
  {
    id: "hpv",
    title: "Xét nghiệm HPV",
    description: "Kiểm tra nguy cơ nhiễm HPV",
    icon: "microscope",
    questions: [
      {
        id: 1,
        question: "Bạn đã tiêm vắc-xin HPV chưa?",
        options: ["Đã tiêm đủ", "Đã tiêm chưa đủ", "Chưa tiêm", "Không rõ"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 2,
        question: "Bạn có quan hệ tình dục không an toàn?",
        options: ["Không bao giờ", "Hiếm khi", "Thỉnh thoảng", "Thường xuyên"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 3,
        question: "Bạn có nhiều bạn tình?",
        options: ["1", "2-3", "4-5", "Trên 5"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 4,
        question: "Bạn có thường xuyên khám phụ khoa/tiết niệu định kỳ?",
        options: ["Hàng năm", "Cách năm", "Hiếm khi", "Chưa bao giờ"],
        scores: [0, 1, 2, 3],
      },
      {
        id: 5,
        question: "Bạn có nhận thấy bất kỳ bất thường nào ở vùng kín?",
        options: ["Không", "Nhẹ", "Rõ rệt", "Nghiêm trọng"],
        scores: [0, 1, 2, 3],
      },
    ],
  },
]

export const adminQuestions: Record<string, Question[]> = {
  depression: [
    {
      id: 1,
      question: "Bạn có thường xuyên cảm thấy buồn hoặc trống rỗng không?",
      options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
      scores: [0, 1, 2, 3],
    },
    {
      id: 2,
      question: "Bạn có mất hứng thú với những hoạt động từng yêu thích không?",
      options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
      scores: [0, 1, 2, 3],
    },
    {
      id: 3,
      question: "Bạn có gặp khó khăn khi ngủ?",
      options: ["Không bao giờ", "Thỉnh thoảng", "Thường xuyên", "Rất thường xuyên"],
      scores: [0, 1, 2, 3],
    },
  ],
}

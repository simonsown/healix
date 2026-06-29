export interface Question {
  id: number
  question: string
  options: string[]
  scores: number[]
}

export interface Test {
  id: string
  title: string
  description: string
  icon: string
  questions: Question[]
}

export interface HealthRecord {
  id: string
  patientName: string
  phone: string
  dob: string
  height: number
  weight: number
  bmi: number
  bloodSugar?: number
  cholesterol?: number
  triglycerides?: number
  hdl?: number
  ldl?: number
  prescriptionUrl?: string
  aiAnalysis?: string
  createdAt: string
}

-- Healix Database Schema

CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  dob DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE health_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  height DECIMAL,
  weight DECIMAL,
  bmi DECIMAL,
  blood_sugar DECIMAL,
  cholesterol DECIMAL,
  triglycerides DECIMAL,
  hdl DECIMAL,
  ldl DECIMAL,
  prescription_url TEXT,
  ai_analysis TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  test_id TEXT NOT NULL,
  answers JSONB,
  total_score INT,
  result TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

interface Option {
  content: string;
  is_correct: boolean;
}

interface Question {
  question: string;
  options: Option[];
}

export interface FormData {
  user_id: string;
  form_data: {
    type: "single" | "multiple" | "subjective" | "survey";
    title: string;
    description: string;
    question_data: Question[];
  };
}

// src/types/quiz.ts
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type QuestionType = 'multiple_choice' | 'fill_blank' | 'scenario' | 'free_text';

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: Option[];
  correctAnswer?: string;
  explanation: string;
  scenario?: string;
  maxLength?: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  courseSlug: string; // Added for URL routing
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: Question[];
  passingScore: number;
  difficulty: Difficulty;
  createdAt: string;
  updatedAt: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in seconds
  passed: boolean;
  answers: {
    questionId: string;
    isCorrect: boolean;
    timeSpent: number;
    userAnswer: string | string[];
  }[];
}

// src/data/mockQuizzes.ts
import { Quiz, Question, QuestionType, Difficulty } from '@/types/quiz';

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    courseId: '1',
    courseSlug: 'moroccan-drone-regulations',
    title: 'Moroccan Drone Regulations Quiz',
    description: 'Test your knowledge of Moroccan drone laws and regulations.',
    timeLimit: 10,
    passingScore: 70,
    difficulty: 'beginner',
    createdAt: '2023-07-01T10:00:00Z',
    updatedAt: '2023-07-01T10:00:00Z',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        text: 'What is the maximum altitude allowed for drone flights in Morocco without special authorization?',
        options: [
          { id: 'q1-a', text: '50 meters', isCorrect: false },
          { id: 'q1-b', text: '100 meters', isCorrect: true },
          { id: 'q1-c', text: '150 meters', isCorrect: false },
          { id: 'q1-d', text: '200 meters', isCorrect: false },
        ],
        explanation: 'The maximum altitude for drone flights in Morocco without special authorization is 100 meters above ground level.'
      },
      {
        id: 'q2',
        type: 'fill_blank',
        text: 'Drones weighing more than ______ grams require registration in Morocco.',
        correctAnswer: '800',
        maxLength: 4,
        explanation: 'Drones weighing more than 800 grams must be registered with the Moroccan Civil Aviation Authority (ANAC).'
      },
      {
        id: 'q3',
        type: 'scenario',
        scenario: 'You are planning to film a commercial real estate property in Casablanca using your drone. The property is located in a residential area.',
        text: 'What is the most important legal requirement you must fulfill before conducting this flight?',
        options: [
          { id: 'q3-a', text: 'Obtain property owner permission', isCorrect: false },
          { id: 'q3-b', text: 'Get authorization from ANAC', isCorrect: true },
          { id: 'q3-c', text: 'Notify local police 24 hours in advance', isCorrect: false },
          { id: 'q3-d', text: 'Purchase additional drone insurance', isCorrect: false },
        ],
        explanation: 'For commercial drone operations in urban areas, you must obtain prior authorization from ANAC (National Agency of Civil Aviation).'
      },
      {
        id: 'q4',
        type: 'free_text',
        text: 'Explain the key differences between recreational and commercial drone use in Morocco.',
        maxLength: 500,
        explanation: 'Recreational drone use is generally allowed without authorization for drones under 800g, while commercial use requires ANAC authorization, pilot certification, and may have additional insurance requirements.'
      }
    ]
  },
  // Add more quizzes for other courses as needed
];

// Helper function to get quiz by course ID
export const getQuizByCourseSlug = (slug: string): Quiz | undefined => {
  return mockQuizzes.find(quiz => quiz.courseSlug === slug);
};

// Helper function to get quiz by ID
export const getQuizById = (id: string): Quiz | undefined => {
  return mockQuizzes.find(quiz => quiz.id === id);
};

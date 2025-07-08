'use client';

import { Button } from '@/components/ui/button';
import { Quiz, Question, QuestionType } from '@/types/quiz';
import { Plus, SquarePen, Save, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { mockQuizzes } from '@/data/mockQuizzes';

interface QuizEditorProps {
  course: {
    id: string;
    slug: string;
    title: string;
  };
  initialQuiz?: Quiz;
}

export function QuizEditor({ course, initialQuiz }: QuizEditorProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(initialQuiz || null);
  const [isEditing, setIsEditing] = useState(!initialQuiz);
  const router = useRouter();

  const handleCreateQuiz = () => {
    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      courseId: course.id,
      courseSlug: course.slug,
      title: `${course.title} Quiz`,
      description: `Test your knowledge of ${course.title}`,
      timeLimit: 30,
      passingScore: 70,
      difficulty: 'beginner',
      questions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // In a real app, save to database
    mockQuizzes.push(newQuiz);
    setQuiz(newQuiz);
    setIsEditing(true);
    router.refresh();
  };

  const handleSaveQuiz = () => {
    if (!quiz) return;
    
    // In a real app, update in database
    const index = mockQuizzes.findIndex(q => q.id === quiz.id);
    if (index !== -1) {
      mockQuizzes[index] = { ...quiz, updatedAt: new Date().toISOString() };
    } else {
      mockQuizzes.push({ ...quiz, updatedAt: new Date().toISOString() });
    }
    
    setIsEditing(false);
    router.refresh();
  };

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
        <div className="text-center p-6 max-w-md">
          <h3 className="text-lg font-medium mb-2">No quiz created yet</h3>
          <p className="text-muted-foreground mb-6">
            Create a quiz to assess your students' understanding of this course.
          </p>
          <Button onClick={handleCreateQuiz}>
            <Plus className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        </div>
      </div>
    );
  }

  const handleGoBack = () => {
    router.push(`/admin/courses/${course.slug}`);
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={handleGoBack}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Course
      </Button>
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quiz Editor</h2>
        <div className="flex space-x-2">
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <SquarePen className="h-4 w-4 mr-2" />
              Edit Quiz
            </Button>
          ) : (
            <Button onClick={handleSaveQuiz}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Quiz Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                className="w-full p-2 border rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={quiz.description}
                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                className="w-full p-2 border rounded min-h-[100px]"
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Time Limit (minutes)</label>
                <input
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border rounded"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Passing Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={quiz.passingScore}
                  onChange={(e) => setQuiz({ ...quiz, passingScore: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border rounded"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <select
                  value={quiz.difficulty}
                  onChange={(e) => setQuiz({ ...quiz, difficulty: e.target.value as any })}
                  className="w-full p-2 border rounded"
                  disabled={!isEditing}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Questions</h3>
            <Button variant="outline" disabled={!isEditing}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
          
          {quiz.questions.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No questions added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {quiz.questions.map((question, index) => (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Question {index + 1}</h4>
                      <p className="text-sm text-muted-foreground">{question.text}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" disabled={!isEditing}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500" disabled={!isEditing}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// src/app/learner/courses/[id]/quiz/page.tsx
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, ArrowRight, Award } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

// Mock quiz questions
const quizQuestions = [
  {
    id: 1,
    question: 'What is the best time of day for aerial photography?',
    options: [
      'Midday',
      'Golden hour (sunrise/sunset)',
      'Night time',
      'No specific time'
    ],
    correctAnswer: 1,
    explanation: 'Golden hour provides soft, warm lighting that enhances the quality of aerial photos.'
  },
  {
    id: 2,
    question: 'Which camera setting is most important for reducing motion blur in drone photography?',
    options: [
      'Aperture',
      'ISO',
      'Shutter speed',
      'White balance'
    ],
    correctAnswer: 2,
    explanation: 'A faster shutter speed helps freeze motion and reduce blur in aerial shots.'
  },
  {
    id: 3,
    question: 'What is the rule of thirds in aerial composition?',
    options: [
      'Dividing the frame into three equal parts',
      'Using three different camera angles',
      'Taking three identical shots',
      'None of the above'
    ],
    correctAnswer: 0,
    explanation: 'The rule of thirds involves dividing the frame into a 3x3 grid and placing key elements along these lines or their intersections.'
  }
];

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quizQuestions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showCertificateButton, setShowCertificateButton] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = quizQuestions.reduce((acc, question, index) => {
        return acc + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
      }, 0);
      
      setScore(Math.round((correctAnswers / quizQuestions.length) * 100));
      setShowResults(true);
      
      // Show certificate button if passed (70% or higher)
      if (correctAnswers / quizQuestions.length >= 0.7) {
        setShowCertificateButton(true);
      }
    }
  };

  const handleSubmit = () => {
    // In a real app, you would submit the quiz answers to a server
    setShowResults(true);
    // Mark the course as completed in local storage
    if (typeof window !== 'undefined') {
      const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
      completedCourses[params.id as string] = true;
      localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
    }
  };

  const handleRequestCertificate = () => {
    alert('Certificate requested! You will receive it via email shortly.');
    // Navigate to courses page or certificate page
    router.push(`/learner/courses/${courseId}/certificate`);
  };

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              {score >= 80 ? (
                <CheckCircle className="h-10 w-10 text-green-600" />
              ) : (
                <XCircle className="h-10 w-10 text-yellow-500" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold">
              {score >= 80 ? 'Quiz Completed!' : 'Quiz Results'}
            </CardTitle>
            <CardDescription>
              {score >= 80 
                ? 'Congratulations! You earned a certificate!'
                : score >= 80 
                  ? 'You passed! Score 80% or higher to earn a certificate.'
                  : 'You need to score 80% or higher to pass.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-6">{score}%</div>
            <p className="text-muted-foreground mb-6">
              You answered {Math.round((score / 100) * quizQuestions.length)} out of {quizQuestions.length} questions correctly.
            </p>
            
            <div className="flex gap-4 justify-center mt-6">
              <Button 
                variant="outline"
                onClick={() => setShowResults(false)}
              >
                Retake Quiz
              </Button>
              {score >= 80 ? (
                <Button 
                  onClick={() => router.push(`/learner/courses/${params.id}/certificate`)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Get Certificate
                  <Award className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <div className="text-sm text-muted-foreground flex items-center">
                  <span className="mr-2">Score 80% or higher to unlock certificate</span>
                  <span className="font-medium">{80 - score}% more needed</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <BackButton className="mb-6" />
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Course Quiz: Aerial Photography</h1>
        <p className="text-muted-foreground">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={selectedAnswers[currentQuestion].toString()}
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-base font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === -1}
          >
            {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

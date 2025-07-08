'use client';

import { CheckCircle, XCircle, Clock, Award, BarChart2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Quiz, QuizResult } from '@/types/quiz';

interface QuizResultProps {
  result: QuizResult;
  quiz: Quiz;
  onReview: () => void;
  onNextModule: () => void;
  onGenerateCertificate: () => void;
  className?: string;
}

export function QuizResultCard({
  result,
  quiz,
  onReview,
  onNextModule,
  onGenerateCertificate,
  className,
}: QuizResultProps) {
  const scorePercentage = Math.round((result.score / 100) * 100);
  const isPassed = result.passed;
  const correctPercentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  const averageTimePerQuestion = Math.round(result.timeSpent / result.totalQuestions);

  return (
    <div className={cn('space-y-8', className)}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          {isPassed ? 'Congratulations! 🎉' : 'Quiz Completed'}
        </h2>
        <p className="text-muted-foreground">
          {isPassed
            ? 'You have successfully passed the quiz.'
            : 'You can review your answers and try again.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 text-center">
          <div
            className={cn(
              'w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold',
              isPassed
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
            )}
          >
            {scorePercentage}%
          </div>
          <h3 className="text-lg font-medium mb-1">
            {isPassed ? 'Passed' : 'Not Passed'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isPassed ? 'You met the passing score!' : `Minimum passing score: ${quiz.passingScore}%`}
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="text-lg font-medium">Quiz Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">
                {result.correctAnswers} of {result.totalQuestions} correct ({correctPercentage}%)
              </span>
            </div>
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm">
                {result.totalQuestions - result.correctAnswers} incorrect
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm">
                {Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s total time
              </span>
            </div>
            <div className="flex items-center">
              <BarChart2 className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-sm">
                ~{averageTimePerQuestion}s per question
              </span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-medium mb-4">
            {isPassed ? 'Next Steps' : 'Recommendations'}
          </h3>
          <ul className="space-y-3">
            {isPassed ? (
              <>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Generate your certificate to showcase your achievement
                  </span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Move on to the next module to continue learning
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Review your answers to understand your mistakes
                  </span>
                </li>
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Review the course material before retaking the quiz
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        {!isPassed && (
          <Button
            variant="outline"
            onClick={onReview}
            className="flex-1 sm:flex-none"
          >
            Review Answers
          </Button>
        )}
        
        {isPassed && (
          <Button
            variant="outline"
            onClick={onGenerateCertificate}
            className="flex-1 sm:flex-none"
          >
            Generate Certificate
          </Button>
        )}
        
        <Button
          onClick={onNextModule}
          className="flex-1 sm:flex-none"
        >
          {isPassed ? 'Next Module' : 'Try Again'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

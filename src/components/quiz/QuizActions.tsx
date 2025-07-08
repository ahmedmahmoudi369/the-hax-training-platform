'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizActionsProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  isLastQuestion: boolean;
  isSubmitting?: boolean;
  isCheckingAnswers?: boolean;
  className?: string;
}

export function QuizActions({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  isLastQuestion,
  isSubmitting = false,
  isCheckingAnswers = false,
  className,
}: QuizActionsProps) {
  return (
    <div className={cn('flex justify-between mt-8', className)}>
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestion === 0 || isSubmitting}
        className="flex items-center"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      
      {isLastQuestion ? (
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={cn(
            'bg-green-600 hover:bg-green-700 text-white',
            isSubmitting && 'opacity-70 cursor-not-allowed'
          )}
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              {isCheckingAnswers ? (
                'Check Answers'
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Quiz
                </>
              )}
            </>
          )}
        </Button>
      ) : (
        <Button onClick={onNext} disabled={isSubmitting}>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  );
}

'use client';

import { Difficulty } from '@/types/quiz';
import { Clock, Award, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizHeaderProps {
  title: string;
  moduleName: string;
  difficulty: Difficulty;
  timeLeft: number; // in seconds
  currentQuestion: number;
  totalQuestions: number;
  onDifficultyChange?: (difficulty: Difficulty) => void;
  className?: string;
}

export function QuizHeader({
  title,
  moduleName,
  difficulty,
  timeLeft,
  currentQuestion,
  totalQuestions,
  onDifficultyChange,
  className,
}: QuizHeaderProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = Math.round((currentQuestion / totalQuestions) * 100);

  const difficultyLevels: { id: Difficulty; label: string }[] = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ];

  return (
    <div className={cn('space-y-6', className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <BookOpen className="h-4 w-4 mr-1.5" />
          <span>Module: {moduleName}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Timer */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center">
          <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-3">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Time Remaining</p>
            <p className="text-lg font-semibold">{formatTime(timeLeft)}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
            <Award className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500 dark:text-gray-400">Progress</span>
              <span className="font-medium">{currentQuestion}/{totalQuestions}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Difficulty */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Difficulty</p>
          <div className="flex space-x-2">
            {difficultyLevels.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => onDifficultyChange?.(level.id)}
                disabled={!onDifficultyChange}
                className={cn(
                  'flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors',
                  difficulty === level.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
                  !onDifficultyChange && 'opacity-70 cursor-default'
                )}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

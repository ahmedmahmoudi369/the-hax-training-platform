'use client';

import { Question, QuestionType } from '@/types/quiz';
import { useState, useEffect } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  userAnswer?: string | string[];
  showFeedback?: boolean;
  onAnswer?: (answer: string | string[]) => void;
  disabled?: boolean;
}

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  userAnswer,
  showFeedback = false,
  onAnswer,
  disabled = false,
}: QuestionCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [textAnswer, setTextAnswer] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    if (userAnswer) {
      if (Array.isArray(userAnswer)) {
        setSelectedOptions(new Set(userAnswer));
      } else if (question.type === 'multiple_choice' || question.type === 'scenario') {
        setSelectedOptions(new Set([userAnswer as string]));
      } else {
        setTextAnswer(userAnswer as string);
        setCharacterCount((userAnswer as string).length);
      }
    }
  }, [userAnswer, question.type]);

  const handleOptionSelect = (optionId: string) => {
    if (disabled) return;
    
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
    onAnswer?.(Array.from(newSelected));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (question.maxLength && value.length > question.maxLength) return;
    
    setTextAnswer(value);
    setCharacterCount(value.length);
    onAnswer?.(value);
  };

  const isOptionCorrect = (optionId: string) => {
    if (!showFeedback || !question.options) return false;
    const option = question.options.find(opt => opt.id === optionId);
    return option?.isCorrect;
  };

  const isOptionIncorrect = (optionId: string) => {
    if (!showFeedback || !question.options) return false;
    const option = question.options.find(opt => opt.id === optionId);
    return selectedOptions.has(optionId) && !option?.isCorrect;
  };

  const renderQuestionType = () => {
    switch (question.type) {
      case 'multiple_choice':
      case 'scenario':
        return (
          <div className="space-y-3">
            {question.scenario && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">{question.scenario}</p>
              </div>
            )}
            {question.options?.map((option) => (
              <button
                key={option.id}
                className={cn(
                  'w-full text-left p-4 border rounded-lg transition-colors',
                  'hover:bg-gray-50 dark:hover:bg-gray-800',
                  selectedOptions.has(option.id) && 'border-primary bg-primary/5',
                  showFeedback && isOptionCorrect(option.id) && 'border-green-500 bg-green-50 dark:bg-green-900/20',
                  showFeedback && isOptionIncorrect(option.id) && 'border-red-500 bg-red-50 dark:bg-red-900/20',
                  disabled && 'opacity-70 cursor-not-allowed'
                )}
                onClick={() => handleOptionSelect(option.id)}
                disabled={disabled}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 mt-0.5">
                    {showFeedback && isOptionCorrect(option.id) && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                    {showFeedback && isOptionIncorrect(option.id) && (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <span>{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        );
      
      case 'fill_blank':
        return (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={textAnswer}
                onChange={(e) => {
                  const value = e.target.value;
                  setTextAnswer(value);
                  onAnswer?.(value);
                }}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                placeholder="Type your answer here..."
                disabled={disabled}
              />
              {question.maxLength && (
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {characterCount}/{question.maxLength} characters
                </div>
              )}
            </div>
          </div>
        );
      
      case 'free_text':
        return (
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={textAnswer}
                onChange={handleTextChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none min-h-[120px]"
                placeholder="Type your answer here..."
                disabled={disabled}
              />
              {question.maxLength && (
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {characterCount}/{question.maxLength} characters
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
            {question.type === 'scenario' && (
              <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                Scenario
              </span>
            )}
          </div>
          {question.maxLength && (
            <span className="text-sm text-gray-500">
              {characterCount}/{question.maxLength} characters
            </span>
          )}
        </div>

        <h3 className="text-lg font-medium mb-6">{question.text}</h3>
        
        {renderQuestionType()}

        {showFeedback && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Explanation</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

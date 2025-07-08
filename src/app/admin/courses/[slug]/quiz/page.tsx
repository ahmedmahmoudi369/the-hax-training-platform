'use client';

import { mockCourses } from '@/data/mockCourses';
import { getQuizByCourseSlug } from '@/data/mockQuizzes';
import { notFound } from 'next/navigation';
import { QuizEditor } from './_components/QuizEditor';

export default function AdminQuizPage({ params }: { params: { slug: string } }) {
  const course = mockCourses.find(c => c.slug === params.slug);
  
  if (!course) {
    notFound();
  }

  const quiz = getQuizByCourseSlug(params.slug);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
        <p className="text-muted-foreground">Manage quiz content and settings</p>
      </div>
      
      <QuizEditor 
        course={course} 
        initialQuiz={quiz}
      />
    </div>
  );
}

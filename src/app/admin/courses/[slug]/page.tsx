import { notFound } from 'next/navigation';
import { mockCourses } from '@/data/mockCourses';
import CourseClient from './CourseClient';

interface CoursePageProps {
  params: {
    slug: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = mockCourses.find((c) => c.slug === params.slug);
  if (!course) notFound();

  return <CourseClient course={course} />;
}

export const dynamic = 'force-dynamic';

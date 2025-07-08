// src/app/learner/courses/[id]/start/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Award, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

// Mock course data
const courseData = {
  id: 'aerial-photography',
  title: 'Aerial Photography & Videography Techniques',
  description: 'Learn professional techniques for capturing stunning aerial imagery with your drone. This course covers composition, camera settings, and post-processing techniques specific to aerial photography.',
  duration: '1 hour 5 min',
  modules: [
    'Introduction to Aerial Photography',
    'Camera Settings for Drones',
    'Composition Techniques',
    'Post-Processing Aerial Photos'
  ],
  prerequisites: [
    'Basic understanding of photography',
    'Access to a drone with camera',
    'Photo editing software (e.g., Adobe Lightroom)'
  ],
  whatYoullLearn: [
    'Master your drone camera settings',
    'Compose stunning aerial shots',
    'Shoot in different lighting conditions',
    'Edit and enhance your aerial photos',
    'Share your work effectively'
  ]
};

export default function CourseStartPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const handleStartCourse = () => {
    // Navigate to the first module
    router.push(`/learner/courses/${courseId}/module/1`);
  };

  // Check if course is completed
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
      setIsCompleted(!!completedCourses[courseId]);
    }
  }, [courseId]);

  const handleBackToCourses = () => {
    router.push('/learner/courses');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <BackButton />
        <Button 
          variant="outline" 
          onClick={handleBackToCourses}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Courses
        </Button>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
        <div className="flex items-center text-muted-foreground mb-6">
          <div className="flex items-center mr-6">
            <Clock className="h-4 w-4 mr-1" />
            <span>{courseData.duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{courseData.modules.length} modules</span>
          </div>
        </div>
        <p className="text-lg mb-8">{courseData.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>What You'll Learn</CardTitle>
            <CardDescription>Key topics covered in this course</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {courseData.modules.map((module, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{module}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prerequisites</CardTitle>
            <CardDescription>Requirements before starting</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {courseData.prerequisites.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button 
          size="lg" 
          className="px-8 py-6 text-lg w-full max-w-md"
          onClick={handleStartCourse}
        >
          {isCompleted ? 'Continue Learning' : 'Start Course'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        {isCompleted && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>You've completed this course</span>
          </div>
        )}
      </div>
    </div>
  );
}

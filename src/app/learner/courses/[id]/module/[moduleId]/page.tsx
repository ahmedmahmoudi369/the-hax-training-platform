'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import Link from 'next/link';

// Mock module data
const courseModules = {
  'aerial-photography': [
    {
      id: 1,
      title: 'Introduction to Aerial Photography',
      description: 'Learn the basics of aerial photography and drone operation.',
      duration: '12 min',
      videoUrl: 'https://www.youtube.com/embed/bunx_PkHFZo',
      completed: true
    },
    {
      id: 2,
      title: 'Camera Settings for Drones',
      description: 'Master your drone camera settings for perfect aerial shots.',
      duration: '18 min',
      videoUrl: 'https://www.youtube.com/embed/2Q19O7wrASg',
      completed: false
    },
    {
      id: 3,
      title: 'Composition Techniques',
      description: 'Learn composition rules specifically for aerial photography.',
      duration: '15 min',
      videoUrl: 'https://www.youtube.com/embed/VUg33pNa5zE',
      completed: false
    },
    {
      id: 4,
      title: 'Post-Processing Aerial Photos',
      description: 'Enhance your aerial photos with post-processing techniques.',
      duration: '20 min',
      videoUrl: 'https://www.youtube.com/embed/XzxdwxWJR2Q',
      completed: false
    }
  ],
  
  // Add more courses here with their respective modules
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const moduleId = parseInt(params.moduleId as string);
  
  // Get current course modules or default to empty array
  const modules = courseModules[courseId as keyof typeof courseModules] || [];
  const currentModule = modules.find(m => m.id === moduleId);
  const currentIndex = modules.findIndex(m => m.id === moduleId);
  const hasNext = currentIndex < modules.length - 1;
  const hasPrevious = currentIndex > 0;

  if (!currentModule) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <BackButton className="mb-6" label="Back to course" />
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Module not found</h2>
          <p className="text-muted-foreground mb-6">The requested module could not be found.</p>
          <Button onClick={() => router.push(`/learner/courses/${courseId}/start`)}>
            Back to Course
          </Button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (hasNext) {
      router.push(`/learner/courses/${courseId}/module/${moduleId + 1}`);
    } else {
      // If this is the last module, go to quiz
      router.push(`/learner/courses/${courseId}/quiz`);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      router.push(`/learner/courses/${courseId}/module/${moduleId - 1}`);
    }
  };

  const handleBackToCourses = () => {
    router.push('/learner/courses');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <BackButton label="Back to course overview" />
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{currentModule.title}</h1>
            <p className="text-muted-foreground">Module {moduleId} of {modules.length}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <Play className="h-4 w-4 mr-1" />
              {currentModule.duration}
            </span>
            {currentModule.completed && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed
              </span>
            )}
          </div>
        </div>
        
        <div className="bg-black rounded-lg aspect-video mb-6 relative">
          <iframe
            src={currentModule.videoUrl}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About This Module</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{currentModule.description}</p>
          </CardContent>
        </Card>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={!hasPrevious}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button onClick={handleNext}>
            {hasNext ? (
              <>
                Next Module
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              'Take Quiz'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

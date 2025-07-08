// src/app/learner/courses/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { BookOpen, Clock, CheckCircle, PlayCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual data fetching later
const courseModules = [
  {
    id: 'moroccan-regulations',
    title: 'Moroccan Drone Regulations & Legal Framework',
    duration: '2 hours',
    description: 'Understand the legal requirements and regulations for drone operations in Morocco.',
    completed: true,
  },
  {
    id: 'flight-training',
    title: 'Hands-on Flight Training with Industry Experts',
    duration: '8 hours',
    description: 'Practical flight training with certified instructors in controlled environments.',
    completed: false,
  },
  {
    id: 'simulator',
    title: 'Simulator Training for Safe Practice',
    duration: '4 hours',
    description: 'Master drone controls and practice in realistic simulated environments.',
    completed: false,
  },
  {
    id: 'aerial-photography',
    title: 'Aerial Photography & Videography Techniques',
    duration: '6 hours',
    description: 'Learn professional techniques for capturing stunning aerial imagery.',
    completed: false,
  },
  {
    id: 'mapping',
    title: 'Mapping & Surveying with Drones',
    duration: '5 hours',
    description: 'Use drones for accurate mapping, surveying, and 3D modeling.',
    completed: false,
  },
  {
    id: 'business',
    title: 'Business Development & Client Acquisition',
    duration: '3 hours',
    description: 'Strategies for building and growing your drone services business.',
    completed: false,
  },
  {
    id: 'safety',
    title: 'Safety Protocols & Risk Management',
    duration: '3 hours',
    description: 'Essential safety procedures and risk assessment for drone operations.',
    completed: false,
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Troubleshooting',
    duration: '4 hours',
    description: 'Learn how to maintain your equipment and troubleshoot common issues.',
    completed: false,
  },
  {
    id: 'field-exercises',
    title: 'Practical Field Exercises',
    duration: '10 hours',
    description: 'Apply your knowledge in real-world scenarios under supervision.',
    completed: false,
  },
  {
    id: 'exam-prep',
    title: 'Final Certification Exam Preparation',
    duration: '3 hours',
    description: 'Review key concepts and practice for the final certification exam.',
    completed: false,
  },
];

export default function CourseModulePage() {
  const params = useParams();
  const moduleId = params.id as string;
  
  // In a real app, you would fetch this data based on the moduleId
  const moduleData = courseModules.find(module => module.id === moduleId);

  if (!moduleData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Module not found</h2>
        <p className="mt-2 text-gray-600">The requested course module could not be found.</p>
        <Link href="/learner/courses" className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800">
          ← Back to all modules
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{moduleData.title}</h1>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {moduleData.duration}
              {moduleData.completed && (
                <span className="ml-3 inline-flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Completed
                </span>
              )}
            </div>
          </div>
          <Link
            href={`/learner/courses/${moduleId}/start`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlayCircle className="h-5 w-5 mr-2" />
            {moduleData.completed ? 'Review' : 'Start'}
          </Link>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">About This Module</h3>
          <p className="mt-2 text-gray-600">{moduleData.description}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Module Content</h3>
        <div className="space-y-4">
          {/* This would be populated with actual lesson content */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900">Introduction</h4>
            <p className="mt-1 text-sm text-gray-600">Overview of key concepts and learning objectives.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900">Learning Materials</h4>
            <p className="mt-1 text-sm text-gray-600">Study materials and reference documents.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900">Practical Exercises</h4>
            <p className="mt-1 text-sm text-gray-600">Hands-on activities to apply your knowledge.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900">Knowledge Check</h4>
            <p className="mt-1 text-sm text-gray-600">Test your understanding with a short quiz.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Link
          href="/learner/courses"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          ← Back to all modules
        </Link>
        <Link
          href={`/learner/courses/${moduleId}/start`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {moduleData.completed ? 'Review Module' : 'Start Module'}
          <PlayCircle className="h-5 w-5 ml-2" />
        </Link>
      </div>
    </div>
  );
}

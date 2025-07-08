// src/app/learner/training/page.tsx
'use client';

import { useState } from 'react';
import { Search, BookOpen, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  duration: string;
  description: string;
  completed: boolean;
  category: string;
}

export default function TrainingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data fetching later
  const modules: Module[] = [
    {
      id: 'moroccan-regulations',
      title: 'Moroccan Drone Regulations & Legal Framework',
      duration: '2 hours',
      description: 'Understand the legal requirements and regulations for drone operations in Morocco.',
      completed: true,
      category: 'Regulations'
    },
    {
      id: 'flight-training',
      title: 'Hands-on Flight Training with Industry Experts',
      duration: '8 hours',
      description: 'Practical flight training with certified instructors in controlled environments.',
      completed: false,
      category: 'Practical'
    },
    {
      id: 'simulator',
      title: 'Simulator Training for Safe Practice',
      duration: '4 hours',
      description: 'Master drone controls and practice in realistic simulated environments.',
      completed: false,
      category: 'Practical'
    },
    {
      id: 'aerial-photography',
      title: 'Aerial Photography & Videography Techniques',
      duration: '6 hours',
      description: 'Learn professional techniques for capturing stunning aerial imagery.',
      completed: false,
      category: 'Photography'
    },
    {
      id: 'mapping',
      title: 'Mapping & Surveying with Drones',
      duration: '5 hours',
      description: 'Use drones for accurate mapping, surveying, and 3D modeling.',
      completed: false,
      category: 'Technical'
    },
    {
      id: 'business',
      title: 'Business Development & Client Acquisition',
      duration: '3 hours',
      description: 'Strategies for building and growing your drone services business.',
      completed: false,
      category: 'Business'
    },
    {
      id: 'safety',
      title: 'Safety Protocols & Risk Management',
      duration: '3 hours',
      description: 'Essential safety procedures and risk assessment for drone operations.',
      completed: false,
      category: 'Safety'
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Troubleshooting',
      duration: '4 hours',
      description: 'Learn how to maintain your equipment and troubleshoot common issues.',
      completed: false,
      category: 'Technical'
    },
    {
      id: 'field-exercises',
      title: 'Practical Field Exercises',
      duration: '10 hours',
      description: 'Apply your knowledge in real-world scenarios under supervision.',
      completed: false,
      category: 'Practical'
    },
    {
      id: 'exam-prep',
      title: 'Final Certification Exam Preparation',
      duration: '3 hours',
      description: 'Review key concepts and practice for the final certification exam.',
      completed: false,
      category: 'Exam'
    }
  ];

  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate progress
  const completedCount = modules.filter(m => m.completed).length;
  const totalCount = modules.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Training Modules</h1>
        <p className="mt-1 text-sm text-gray-500">
          Complete all modules to earn your certification
        </p>
      </div>

      {/* Progress Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Your Progress</h2>
            <p className="mt-1 text-sm text-gray-600">
              {completedCount} of {totalCount} modules completed
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-64">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Overall Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredModules.map((module) => (
          <div 
            key={module.id} 
            className={`bg-white rounded-lg shadow-sm border ${
              module.completed ? 'border-green-100' : 'border-gray-100'
            } overflow-hidden hover:shadow-md transition-shadow duration-200`}
          >
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${
                      module.completed ? 'bg-green-100' : 'bg-indigo-100'
                    }`}>
                      {module.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-indigo-600" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        <Link href={`/dashboard/training/${module.id}`} className="hover:text-indigo-600">
                          {module.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {module.description}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{module.duration}</span>
                        <span className="mx-2">•</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {module.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4">
                  <Link
                    href={`/dashboard/training/${module.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {module.completed ? 'Review' : 'Start'}
                    <ChevronRight className="ml-2 -mr-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
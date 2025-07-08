// src/app/learner/courses/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, CheckCircle, ChevronRight, Filter, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  duration: string;
  description: string;
  completed: boolean;
  category: string;
  hours: number; // Added for sorting by duration
}

type SortOption = 'a-z' | 'duration-asc' | 'duration-desc';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('a-z');

  // Mock data - replace with actual data fetching later
  const modules: Module[] = [
    {
      id: 'moroccan-regulations',
      title: 'Moroccan Drone Regulations & Legal Framework',
      duration: '2 hours',
      hours: 2,
      description: 'Understand the legal requirements and regulations for drone operations in Morocco.',
      completed: true,
      category: 'Regulations'
    },
    {
      id: 'flight-training',
      title: 'Hands-on Flight Training with Industry Experts',
      duration: '8 hours',
      hours: 8,
      description: 'Practical flight training with certified instructors in controlled environments.',
      completed: false,
      category: 'Practical'
    },
    {
      id: 'simulator',
      title: 'Simulator Training for Safe Practice',
      duration: '4 hours',
      hours: 4,
      description: 'Master drone controls and practice in realistic simulated environments.',
      completed: false,
      category: 'Practical'
    },
    {
      id: 'aerial-photography',
      title: 'Aerial Photography & Videography Techniques',
      duration: '6 hours',
      hours: 6,
      description: 'Learn professional techniques for capturing stunning aerial imagery.',
      completed: false,
      category: 'Creative'
    },
    {
      id: 'mapping',
      title: 'Mapping & Surveying with Drones',
      duration: '5 hours',
      hours: 5,
      description: 'Use drones for accurate mapping, surveying, and 3D modeling.',
      completed: false,
      category: 'Professional'
    },
    {
      id: 'business',
      title: 'Business Development & Client Acquisition',
      duration: '3 hours',
      hours: 3,
      description: 'Strategies for building and growing your drone services business.',
      completed: false,
      category: 'Business'
    },
    {
      id: 'safety',
      title: 'Safety Protocols & Risk Management',
      duration: '3 hours',
      hours: 3,
      description: 'Essential safety procedures and risk assessment for drone operations.',
      completed: false,
      category: 'Safety'
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Troubleshooting',
      duration: '4 hours',
      hours: 4,
      description: 'Learn how to maintain your equipment and troubleshoot common issues.',
      completed: false,
      category: 'Technical'
    },
    {
      id: 'field-exercises',
      title: 'Practical Field Exercises',
      duration: '10 hours',
      hours: 10,
      description: 'Apply your knowledge in real-world scenarios under supervision.',
      completed: false,
      category: 'Practical'
    },
    {
      id: 'exam-prep',
      title: 'Final Certification Exam Preparation',
      duration: '3 hours',
      hours: 3,
      description: 'Review key concepts and practice for the final certification exam.',
      completed: false,
      category: 'Exam'
    }
  ];

  // Get unique categories for filter
  const categories = ['all', ...new Set(modules.map(module => module.category))];

  // Filter and sort modules
  const filteredAndSortedModules = useMemo(() => {
    let result = [...modules];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(module => 
        module.title.toLowerCase().includes(query) || 
        module.description.toLowerCase().includes(query) ||
        module.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(module => module.category === selectedCategory);
    }
    
    // Sort modules
    switch (sortBy) {
      case 'a-z':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'duration-asc':
        result.sort((a, b) => a.hours - b.hours);
        break;
      case 'duration-desc':
        result.sort((a, b) => b.hours - a.hours);
        break;
      default:
        break;
    }
    
    return result;
  }, [modules, searchQuery, selectedCategory, sortBy]);

  // Calculate progress
  const completedCount = modules.filter(m => m.completed).length;
  const totalCount = modules.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Course Modules</h1>
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

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="a-z">A to Z</option>
              <option value="duration-asc">Duration: Shortest First</option>
              <option value="duration-desc">Duration: Longest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500">
        Showing {filteredAndSortedModules.length} of {modules.length} courses
      </div>
      
      {/* Modules Grid */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredAndSortedModules.map((module) => (
            <li key={module.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${module.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {module.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link href={`/learner/courses/${module.id}`} className="hover:text-indigo-600">
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
                <div className="mt-4 sm:mt-0 sm:ml-4">
                  <Link
                    href={`/learner/courses/${module.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {module.completed ? 'Review' : 'Start'}
                    <ChevronRight className="ml-2 -mr-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
// src/app/learner/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, Flame, Camera, Book, Play, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LearnerPage() {
  const router = useRouter();
  
  // Mock data for courses in progress
  const coursesInProgress = [
    {
      id: 1,
      title: 'Introduction to Drones',
      progress: 65,
      nextLesson: 'Flight Controls',
      dueDate: '2023-08-15',
      icon: 'drone',
    },
    {
      id: 2,
      title: 'Aerial Photography',
      progress: 30,
      nextLesson: 'Composition Techniques',
      dueDate: '2023-08-20',
      icon: 'camera',
    },
  ];

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      title: 'Completed Flight Simulation',
      module: 'Basic Drone Controls',
      time: '2 hours ago',
      icon: 'flight',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Submitted Assignment',
      module: 'Aerial Photography Basics',
      time: '1 day ago',
      icon: 'camera',
      status: 'submitted'
    },
    {
      id: 3,
      title: 'Started New Module',
      module: 'Drone Regulations in Morocco',
      time: '2 days ago',
      icon: 'book',
      status: 'in-progress'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, Ahmed</h1>
        <p className="text-muted-foreground">Here's your learning progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Courses in Progress"
          value="3"
          change="+1"
          icon={BookOpen}
          trend="up"
        />
        <StatCard
          title="Hours This Week"
          value="5.5"
          change="+2.5"
          icon={Clock}
          trend="up"
        />
        <StatCard
          title="Certificates"
          value="2"
          change="0"
          icon={Award}
          trend="neutral"
        />
        <StatCard
          title="Learning Streak"
          value="7"
          change="+2"
          icon={Flame}
          trend="up"
          unit="days"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Continue Learning */}
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coursesInProgress.map((course) => (
                <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        course.icon === 'drone' ? 'bg-indigo-100' : 'bg-green-100'
                      }`}>
                        {course.icon === 'drone' ? (
                          <BookOpen className="h-5 w-5 text-indigo-600" />
                        ) : (
                          <Camera className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Next: {course.nextLesson}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Due {course.dueDate}
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => router.push(`/dashboard/training/${course.id}`)}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          course.progress > 50 ? 'bg-indigo-600' : 'bg-green-600'
                        }`} 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    activity.status === 'completed' 
                      ? 'bg-green-100' 
                      : activity.status === 'submitted'
                      ? 'bg-blue-100'
                      : 'bg-yellow-100'
                  }`}>
                    {activity.icon === 'flight' && (
                      <BookOpen className={`h-4 w-4 ${
                        activity.status === 'completed' 
                          ? 'text-green-600' 
                          : activity.status === 'submitted'
                          ? 'text-blue-600'
                          : 'text-yellow-600'
                      }`} />
                    )}
                    {activity.icon === 'camera' && (
                      <Camera className="h-4 w-4 text-blue-600" />
                    )}
                    {activity.icon === 'book' && (
                      <Book className="h-4 w-4 text-purple-600" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.module} • {activity.time}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activity.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : activity.status === 'submitted'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status === 'completed' ? 'Completed' : activity.status === 'submitted' ? 'Submitted' : 'In Progress'}
                  </span>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-2">
                View all activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4"
              onClick={() => router.push('/learner/training')}
            >
              <BookOpen className="h-6 w-6 mb-2 text-indigo-600" />
              Browse Courses
            </Button>
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4"
              onClick={() => router.push('/learner/certifications')}
            >
              <Award className="h-6 w-6 mb-2 text-green-600" />
              My Certificates
            </Button>
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4"
              onClick={() => router.push('/learner/calendar')}
            >
              <Calendar className="h-6 w-6 mb-2 text-blue-600" />
              Study Plan
            </Button>
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4"
              onClick={() => router.push('/learner/activity')}
            >
              <Clock className="h-6 w-6 mb-2 text-purple-600" />
              Learning History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Enhanced StatCard component with better type safety and styling
function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend,
  unit = ''
}: { 
  title: string; 
  value: string | number; 
  change: string;
  icon: any;
  trend: 'up' | 'down' | 'neutral';
  unit?: string;
}) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→'
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={`p-2 rounded-lg ${
            title.includes('Courses') ? 'bg-indigo-100' : 
            title.includes('Hours') ? 'bg-blue-100' :
            title.includes('Certificates') ? 'bg-green-100' : 'bg-orange-100'
          }`}>
            <Icon className={`h-4 w-4 ${
              title.includes('Courses') ? 'text-indigo-600' : 
              title.includes('Hours') ? 'text-blue-600' :
              title.includes('Certificates') ? 'text-green-600' : 'text-orange-600'
            }`} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value} {unit && <span className="text-sm font-normal text-muted-foreground">{unit}</span>}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          <span className={`${trendColors[trend]} font-medium`}>
            {trendIcons[trend]} {change}
          </span>{' '}
          from last week
        </p>
      </CardContent>
    </Card>
  );
}
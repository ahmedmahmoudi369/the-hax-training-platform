'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Download, Users, BookOpen, Award, Clock } from 'lucide-react';
import React from 'react';

// Simple chart data
const chartData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  users: [45, 60, 75, 90, 110, 130],
  courses: [30, 45, 60, 80, 95, 110],
  certificates: [25, 35, 50, 65, 80, 95],
  completion: [65, 25, 10],
  completionLabels: ['Completed', 'In Progress', 'Not Started'],
  completionColors: ['#00C49F', '#FFBB28', '#0088FE']
};

// Simple bar chart component
const SimpleBarChart: React.FC<{ 
  data: number[]; 
  labels: string[]; 
  colors: string[] 
}> = ({ data, labels, colors }) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="w-full h-full flex items-end space-x-2 p-4">
      {data.map((value, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div 
            className="w-full rounded-t-sm transition-all duration-300" 
            style={{
              height: `${(value / maxValue) * 80}%`,
              backgroundColor: colors[index % colors.length],
              minHeight: '4px'
            }}
          />
          <div className="text-xs text-muted-foreground mt-2">{labels[index]}</div>
        </div>
      ))}
    </div>
  );
};

// Simple pie chart component
const SimplePieChart: React.FC<{ 
  data: number[]; 
  labels: string[]; 
  colors: string[] 
}> = ({ data, labels, colors }) => {
  const total = data.reduce((a, b) => a + b, 0);
  const radius = 100;
  const center = 110;
  const circumference = 2 * Math.PI * radius;
  
  let startAngle = 0;
  const segments = data.map((value, index) => {
    const percentage = value / total;
    const endAngle = startAngle + percentage * 360;
    const startX = center + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = center + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = center + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = center + radius * Math.sin((endAngle * Math.PI) / 180);
    const largeArcFlag = percentage > 0.5 ? 1 : 0;
    
    const pathData = [
      `M ${center} ${center}`,
      `L ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      'Z'
    ].join(' ');
    
    const segment = {
      path: pathData,
      color: colors[index % colors.length],
      percentage: (percentage * 100).toFixed(1)
    };
    
    startAngle = endAngle;
    return segment;
  });
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="relative">
        <svg width="220" height="220" viewBox="0 0 220 220" className="mb-4">
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              stroke="#fff"
              strokeWidth="1"
            />
          ))}
          <circle cx={center} cy={center} r={radius * 0.6} fill="#fff" />
          <text
            x={center}
            y={center - 10}
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill="#333"
          >
            {total}%
          </text>
          <text
            x={center}
            y={center + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
          >
            Total
          </text>
        </svg>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-xs text-muted-foreground">
              {labels[index]}: {segment.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock data - replace with real data from your API
const monthlyData = [
  { name: 'Jan', users: 45, courses: 30, certificates: 25 },
  { name: 'Feb', users: 60, courses: 45, certificates: 35 },
  { name: 'Mar', users: 75, courses: 60, certificates: 50 },
  { name: 'Apr', users: 90, courses: 80, certificates: 65 },
  { name: 'May', users: 110, courses: 95, certificates: 80 },
  { name: 'Jun', users: 130, courses: 110, certificates: 95 },
];

const courseCompletionData = [
  { name: 'Completed', value: 65 },
  { name: 'In Progress', value: 25 },
  { name: 'Not Started', value: 10 },
];

const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

const stats = [
  { name: 'Total Users', value: '1,284', icon: Users, change: '+12%', changeType: 'positive' },
  { name: 'Active Courses', value: '42', icon: BookOpen, change: '+3', changeType: 'positive' },
  { name: 'Certificates Issued', value: '856', icon: Award, change: '+24%', changeType: 'positive' },
  { name: 'Avg. Time to Complete', value: '2.5 weeks', icon: Clock, change: '-0.5', changeType: 'negative' },
];

const ReportsPage: React.FC = () => {
  const areaChartSeries = [
    {
      name: 'Users',
      data: [45, 60, 75, 90, 110, 130]
    },
    {
      name: 'Courses',
      data: [30, 45, 60, 80, 95, 110]
    },
    {
      name: 'Certificates',
      data: [25, 35, 50, 65, 80, 95]
    }
  ];

  const pieChartSeries = [65, 25, 10];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">Track platform performance and user engagement</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 ${
                stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Growth</CardTitle>
                <CardDescription>User and course growth over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <SimpleBarChart 
                  data={chartData.users}
                  labels={chartData.months}
                  colors={['#0088FE']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Completion</CardTitle>
                <CardDescription>Overall course completion rates</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <SimplePieChart 
                  data={chartData.completion}
                  labels={chartData.completionLabels}
                  colors={chartData.completionColors}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Monthly active users and engagement</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  <Calendar className="mr-2 h-4 w-4" />
                  Last 6 months
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[400px]">
              <SimpleBarChart 
                data={chartData.courses}
                labels={chartData.months}
                colors={['#00C49F']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>Detailed user statistics and behavior</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">User Analytics</h3>
                <p className="text-muted-foreground mt-1">Detailed user reports and analytics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Course Analytics</CardTitle>
              <CardDescription>Detailed course statistics and performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Course Analytics</h3>
                <p className="text-muted-foreground mt-1">Detailed course reports and analytics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Certificate Analytics</CardTitle>
                  <CardDescription>Certificate issuance and verification stats</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Certificate Analytics</h3>
                <p className="text-muted-foreground mt-1">Detailed certificate reports and analytics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;

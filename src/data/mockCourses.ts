export interface Module {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  lessons?: Array<{
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'article' | 'quiz' | 'assignment' | 'practical';
  }>;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  instructor?: string;
  duration?: string;
  students: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt?: string;
  modules?: Module[];
  thumbnail?: string;
  prerequisites?: string[];
}

export const mockCourses: Course[] = [
  { 
    id: '1',
    slug: 'moroccan-drone-regulations',
    title: 'Moroccan Drone Regulations & Legal Framework',
    description: 'Learn about the legal requirements and regulations for drone operations in Morocco.',
    longDescription: 'This comprehensive course covers all aspects of drone regulations in Morocco, including flight restrictions, no-fly zones, licensing requirements, and legal considerations for commercial and recreational drone use. You\'ll learn about ANAC (National Agency for Civil Aviation) regulations and how to ensure compliance with local laws.',
    category: 'Regulations',
    instructor: 'Dr. Karim El Mansouri',
    duration: '4 weeks',
    students: 76,
    status: 'published',
    createdAt: '2023-05-15',
    updatedAt: '2023-06-20',
    thumbnail: '/images/courses/drone-regulations.jpg',
    prerequisites: ['Basic understanding of drone operations'],
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Drone Regulations',
        duration: '1 hour',
        lessons: [
          { id: 'l1', title: 'Overview of Moroccan Drone Laws', duration: '15 min', type: 'video' },
          { id: 'l2', title: 'ANAC Requirements and Compliance', duration: '20 min', type: 'video' },
          { id: 'l3', title: 'Reading: Key Legal Documents', duration: '25 min', type: 'article' }
        ]
      },
      {
        id: 'm2',
        title: 'Flight Restrictions and Permissions',
        duration: '1.5 hours',
        lessons: [
          { id: 'l4', title: 'No-Fly Zones in Morocco', duration: '20 min', type: 'video' },
          { id: 'l5', title: 'Obtaining Flight Permissions', duration: '30 min', type: 'video' },
          { id: 'l6', title: 'Case Studies', duration: '20 min', type: 'article' },
          { id: 'l7', title: 'Quiz: Regulations Knowledge Check', duration: '20 min', type: 'quiz' },
          { id: 'l8', title: 'Assignment: Compliance Check', duration: '20 min', type: 'assignment' },
          { id: 'l9', title: 'Practical: Flight Permissions', duration: '20 min', type: 'practical' }
        ]
      }
    ]
  },
  { 
    id: '2',
    slug: 'hands-on-flight-training',
    title: 'Hands-on Flight Training with Industry Experts',
    description: 'Master the fundamentals of drone flight with practical training from certified instructors.',
    longDescription: 'This hands-on course provides comprehensive flight training for drone enthusiasts of all levels. Learn essential flight maneuvers, safety protocols, and emergency procedures from certified instructors with years of industry experience. The course includes both theoretical knowledge and practical flight sessions to ensure you become a confident and competent drone pilot.',
    category: 'Practical',
    instructor: 'Captain Samira Benali',
    duration: '6 weeks',
    students: 112,
    status: 'published',
    createdAt: '2023-06-01',
    updatedAt: '2023-06-28',
    thumbnail: '/images/courses/flight-training.jpg',
    prerequisites: ['Basic understanding of drone controls'],
    modules: [
      {
        id: 'm3',
        title: 'Flight Fundamentals',
        duration: '2 hours',
        lessons: [
          { id: 'l10', title: 'Pre-flight Checklist and Safety', duration: '20 min', type: 'video' },
          { id: 'l11', title: 'Basic Flight Controls', duration: '30 min', type: 'video' },
          { id: 'l12', title: 'Practice Session: Hovering', duration: '40 min', type: 'practical' },
          { id: 'l13', title: 'Reading: Flight Manual', duration: '30 min', type: 'article' }
        ]
      },
      {
        id: 'm4',
        title: 'Advanced Maneuvers',
        duration: '3 hours',
        lessons: [
          { id: 'l14', title: 'Orbiting and Waypoints', duration: '25 min', type: 'video' },
          { id: 'l15', title: 'Emergency Procedures', duration: '30 min', type: 'video' },
          { id: 'l16', title: 'Practice Session: Advanced Flight', duration: '1 hour', type: 'practical' },
          { id: 'l17', title: 'Flight Assessment', duration: '1 hour', type: 'assignment' }
        ]
      }
    ]
  },
  { 
    id: '3',
    slug: 'simulator-training',
    title: 'Simulator Training for Safe Practice',
    description: 'Practice flying in a risk-free virtual environment before your actual flight training.',
    longDescription: 'This course provides a safe and controlled environment to practice drone flying using advanced simulation software. Perfect for beginners who want to build confidence before flying a real drone, or for experienced pilots looking to practice advanced maneuvers without the risk of damaging equipment.',
    category: 'Practical',
    instructor: 'Youssef Amrani',
    duration: '2 weeks',
    students: 95,
    status: 'draft',
    createdAt: '2023-06-10',
    thumbnail: '/images/courses/simulator.jpg',
    modules: [
      {
        id: 'm5',
        title: 'Simulator Basics',
        duration: '1 hour',
        lessons: [
          { id: 'l18', title: 'Introduction to Simulator Software', duration: '15 min', type: 'video' },
          { id: 'l19', title: 'Basic Controls and Calibration', duration: '20 min', type: 'video' },
          { id: 'l20', title: 'Practice: First Flight', duration: '25 min', type: 'practical' }
        ]
      }
    ]
  },
  { 
    id: '4',
    slug: 'aerial-photography',
    title: 'Aerial Photography & Videography Masterclass',
    description: 'Learn professional techniques for capturing stunning aerial images and videos.',
    longDescription: 'Elevate your photography skills with this comprehensive course on aerial imaging. Learn composition techniques, camera settings, and post-processing specifically for drone photography and videography. Whether you\'re a hobbyist or aspiring professional, this course will help you capture breathtaking aerial shots.',
    category: 'Creative',
    instructor: 'Leila Zayani',
    duration: '5 weeks',
    students: 134,
    status: 'published',
    createdAt: '2023-04-22',
    updatedAt: '2023-06-15',
    thumbnail: '/images/courses/aerial-photography.jpg',
    modules: [
      {
        id: 'm6',
        title: 'Aerial Photography Fundamentals',
        duration: '2 hours',
        lessons: [
          { id: 'l21', title: 'Camera Settings for Drones', duration: '20 min', type: 'video' },
          { id: 'l22', title: 'Composition from Above', duration: '30 min', type: 'video' },
          { id: 'l23', title: 'Golden Hour Shooting', duration: '40 min', type: 'video' },
          { id: 'l24', title: 'Assignment: Golden Hour Shoot', duration: '1 hour', type: 'assignment' }
        ]
      }
    ]
  },
  { 
    id: '5',
    slug: 'drone-mapping',
    title: 'Drone Mapping & Surveying Fundamentals',
    description: 'Master the use of drones for mapping, surveying, and 3D modeling applications.',
    longDescription: 'This technical course covers the use of drones for professional mapping and surveying applications. Learn about photogrammetry, LiDAR technology, and data processing to create accurate 2D maps and 3D models for various industries including construction, agriculture, and urban planning.',
    category: 'Technical',
    instructor: 'Dr. Ahmed Khalil',
    duration: '6 weeks',
    students: 88,
    status: 'published',
    createdAt: '2023-05-30',
    thumbnail: '/images/courses/drone-mapping.jpg',
    prerequisites: ['Basic drone piloting skills', 'Understanding of GIS concepts']
  },
  { 
    id: '6',
    slug: 'maintenance-repair',
    title: 'Drone Maintenance & Basic Repairs',
    description: 'Learn how to properly maintain your drone and perform basic troubleshooting and repairs.',
    longDescription: 'Extend the life of your drone with proper maintenance and learn how to perform common repairs. This course covers everything from routine maintenance to diagnosing and fixing common issues, helping you save money on professional repairs and minimize downtime.',
    category: 'Technical',
    instructor: 'Mehdi El Fassi',
    duration: '3 weeks',
    students: 67,
    status: 'published',
    createdAt: '2023-07-01',
    thumbnail: '/images/courses/drone-repair.jpg'
  },
  { 
    id: '7',
    slug: 'advanced-flight-techniques',
    title: 'Advanced Flight Techniques & Maneuvers',
    description: 'Take your piloting skills to the next level with advanced flight techniques and maneuvers.',
    longDescription: 'Designed for experienced drone pilots, this course covers advanced flight techniques, precision flying, and complex maneuvers. Learn how to handle challenging conditions and execute professional-grade flight patterns for various applications.',
    category: 'Practical',
    instructor: 'Captain Samira Benali',
    duration: '4 weeks',
    students: 52,
    status: 'published',
    createdAt: '2023-06-15',
    prerequisites: ['Basic drone piloting certification', '20+ hours of flight experience']
  },
  { 
    id: '8',
    slug: 'commercial-applications',
    title: 'Commercial Drone Applications',
    description: 'Explore various commercial applications of drone technology across different industries.',
    longDescription: 'Discover how drones are being used in various industries including real estate, agriculture, construction, and emergency services. Learn about the business opportunities and specific requirements for commercial drone operations in different sectors.',
    category: 'Business',
    instructor: 'Nadia El Amrani',
    duration: '3 weeks',
    students: 91,
    status: 'published',
    createdAt: '2023-05-10',
    thumbnail: '/images/courses/commercial-drones.jpg'
  },
  { 
    id: '9',
    slug: 'drone-racing',
    title: 'Introduction to FPV Drone Racing',
    description: 'Get started with FPV drone racing with this beginner-friendly course.',
    longDescription: 'Dive into the exciting world of FPV (First Person View) drone racing. Learn about the equipment, techniques, and training needed to compete in drone racing events. This course covers everything from building your first racing drone to advanced racing strategies.',
    category: 'Recreational',
    instructor: 'Omar Drissi',
    duration: '4 weeks',
    students: 43,
    status: 'draft',
    createdAt: '2023-07-05',
    thumbnail: '/images/courses/drone-racing.jpg'
  },
  { 
    id: '10',
    slug: 'night-operations',
    title: 'Night Operations & Low Light Flying',
    description: 'Learn the techniques and safety considerations for flying drones at night and in low light conditions.',
    longDescription: 'This specialized course covers the unique challenges and techniques for flying drones at night or in low-light conditions. Learn about lighting requirements, safety protocols, and specialized equipment needed for night operations, along with regulatory considerations for night flying.',
    category: 'Advanced',
    instructor: 'Captain Samira Benali',
    duration: '2 weeks',
    students: 37,
    status: 'published',
    createdAt: '2023-06-25',
    prerequisites: ['Basic drone piloting certification']
  },
  { 
    id: '11',
    slug: 'drone-entrepreneurship',
    title: 'Starting a Drone Business',
    description: 'Turn your drone skills into a successful business with this comprehensive guide.',
    longDescription: 'Transform your passion for drones into a profitable business. This course covers everything from business planning and legal requirements to marketing and client acquisition for drone service providers. Learn how to identify profitable niches and build a sustainable drone business.',
    category: 'Business',
    instructor: 'Nadia El Amrani',
    duration: '4 weeks',
    students: 79,
    status: 'published',
    createdAt: '2023-04-15',
    thumbnail: '/images/courses/drone-business.jpg'
  },
  { 
    id: '12',
    slug: 'agricultural-drones',
    title: 'Drones in Precision Agriculture',
    description: 'Learn how drones are revolutionizing modern farming practices.',
    longDescription: 'Discover how drone technology is transforming agriculture through precision farming techniques. This course covers crop monitoring, multispectral imaging, and data analysis for improved crop yields and resource management. Learn how to implement drone technology in various agricultural applications.',
    category: 'Industrial',
    instructor: 'Dr. Fatima Zahra',
    duration: '5 weeks',
    students: 61,
    status: 'published',
    createdAt: '2023-05-20',
    thumbnail: '/images/courses/agricultural-drones.jpg',
    prerequisites: ['Basic understanding of agriculture']
  }
];
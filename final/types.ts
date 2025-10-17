// All type definitions for the Synapse LMS application

export type Page = 'dashboard' | 'courses' | 'course-detail' | 'certificates' | 'discussions' | 'career-advisor' | 'admin-panel' | 'course-player';

export enum CourseLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export interface Sponsor {
  id: number;
  name: string;
  logo: React.ElementType;
}

export interface SyllabusItem {
  id: number;
  module: number;
  title: string;
  description: string;
  duration: string;
  contentType: 'video' | 'pdf' | 'quiz';
  contentUrl: string;
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorId?: string;
  sponsor?: Sponsor;
  price?: number;
  level: CourseLevel;
  duration:string;
  rating: number;
  enrollments: number;
  isFeatured?: boolean;
  thumbnailUrl: string;
  tags: string[];
  status: 'Published' | 'Draft' | 'Pending Approval';
  description: string;
  syllabus: SyllabusItem[];
}

export interface UserProgress {
    [courseId: number]: {
        completedSyllabusItems: number[];
    }
}

export interface User {
  id: string;
  name: string;
  role: 'Student' | 'Instructor' | 'Admin';
  email: string;
  avatarUrl?: string;
  xp?: number;
  streak?: {
    current: number;
    longest: number;
  };
  interests?: string[];
  enrolledCourseIds?: number[];
  progress?: UserProgress;
}

export interface Enrollment {
    courseId: number;
    progress: number;
}

export interface Certificate {
    id: string;
    courseTitle: string;
    studentName: string;
    instructorName: string;
    issueDate: string;
    qrCodeUrl: string;
    sponsor?: Sponsor;
}

export interface DiscussionRoom {
    id: string;
    name: string;
    category: string;
    description: string;
    members: number;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ChatMessage {
    id: number;
    user: { name: string; avatarUrl?: string; };
    text: string;
    timestamp: string;
    isOwn: boolean;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface CareerPathStep {
    step: number;
    title: string;
    courseId: number;
    duration: string;
}

export interface CareerPath {
    title: string;
    description: string;
    avgSalary: string;
    demand: string;
    learningPath: CareerPathStep[];
}
import React from 'react';
import { User, Course } from '../types';
import { AiSummary } from './AiSummary';
import { StreakTracker } from './StreakTracker';
import { Achievements } from './Achievements';
import { SponsorCarousel } from './SponsorCarousel';
import { MOCK_COURSES } from '../constants';
import { CourseCard } from './CourseCard';

interface StudentDashboardProps {
  user: User;
  onViewCourse: (course: Course) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onViewCourse }) => {
  const enrolledCoursesWithProgress = (user.enrolledCourseIds || [])
    .map(courseId => {
      const course = MOCK_COURSES.find(c => c.id === courseId);
      if (!course) return null;
      
      const completedItems = user.progress?.[courseId]?.completedSyllabusItems.length || 0;
      const totalItems = course.syllabus.length;
      const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
      
      return { course, progress };
    })
    .filter((item): item is { course: Course; progress: number } => item !== null);

  return (
    <div className="space-y-8">
      <div className="text-left">
        <h1 className="font-display text-4xl font-bold text-gray-800 dark:text-slate-light">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-lg text-gray-600 dark:text-slate-dark">Ready to continue your learning journey?</p>
      </div>

      <AiSummary />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StreakTracker user={user} />
        <Achievements user={user} />
        <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-lg animate-slide-in-up" style={{animationDelay: '300ms'}}>
            <h2 className="font-display text-2xl font-bold text-gray-800 dark:text-slate-light mb-4">Daily Goal</h2>
            <p className="text-slate-dark">Complete 1 lesson and review 5 flashcards. Keep up the great work!</p>
        </div>
      </div>

      <div>
          <h2 className="font-display text-3xl font-bold text-gray-800 dark:text-slate-light mb-6">Continue Learning</h2>
          {enrolledCoursesWithProgress.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCoursesWithProgress.map(({ course, progress }) => (
                    <CourseCard key={course.id} course={course} progress={progress} onClick={() => onViewCourse(course)} />
                ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-navy-800 rounded-lg">
                <p className="text-slate-dark">You are not enrolled in any courses yet.</p>
                <p className="text-slate-light mt-2">Visit the Course Catalog to start your journey!</p>
            </div>
          )}
      </div>
      
      <SponsorCarousel />

    </div>
  );
};
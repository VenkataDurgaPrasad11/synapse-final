import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Page, Course, User } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StudentDashboard } from './components/StudentDashboard';
import { InstructorDashboard } from './components/InstructorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailPage } from './components/CourseDetailPage';
import { CoursePlayer } from './components/CoursePlayer';
import { Certificates } from './components/Certificates';
import { DiscussionRooms } from './components/DiscussionRooms';
import { AiCareerAdvisor } from './components/AiCareerAdvisor';
import { AuthPage } from './components/AuthPage';
import { PaymentModal } from './components/PaymentModal';
import { MOCK_COURSES } from './constants';

const App: React.FC = () => {
  const { currentUser, setCurrentUser, loading } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [courseForPayment, setCourseForPayment] = useState<Course | null>(null);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    if (page !== 'course-detail' && page !== 'course-player') {
      setSelectedCourse(null);
    }
  };
  
  const handleViewCourse = (course: Course) => {
      setSelectedCourse(course);
      if (currentUser?.enrolledCourseIds?.includes(course.id)) {
        setCurrentPage('course-player');
      } else {
        setCurrentPage('course-detail');
      }
  }
  
  const handleEnrollInCourse = (courseId: number) => {
    if (!currentUser) return;
    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (!course) return;

    // If course is paid, open payment modal
    if (course.price !== undefined && course.price > 0) {
        setCourseForPayment(course);
        setIsPaymentModalOpen(true);
    } else {
        // Otherwise, enroll directly for free courses
        enrollUser(courseId);
    }
  }

  const handlePaymentSuccess = (courseId: number) => {
    enrollUser(courseId);
    setIsPaymentModalOpen(false);
    setCourseForPayment(null);
  }

  const enrollUser = (courseId: number) => {
    if (!currentUser) return;
     const updatedUser: User = {
        ...currentUser,
        enrolledCourseIds: [...(currentUser.enrolledCourseIds || []), courseId],
        progress: {
            ...currentUser.progress,
            [courseId]: { completedSyllabusItems: [] }
        }
    };
    setCurrentUser(updatedUser);

    const courseToView = MOCK_COURSES.find(c => c.id === courseId);
    if (courseToView) {
        setSelectedCourse(courseToView);
        setCurrentPage('course-player');
    }
  }

  const handleUpdateProgress = (courseId: number, syllabusItemId: number) => {
    if (!currentUser) return;
    const courseProgress = currentUser.progress?.[courseId]?.completedSyllabusItems || [];
    let updatedProgress;

    if (courseProgress.includes(syllabusItemId)) {
        updatedProgress = courseProgress.filter(id => id !== syllabusItemId); // Un-complete
    } else {
        updatedProgress = [...courseProgress, syllabusItemId]; // Complete
    }
    
    const updatedUser: User = {
        ...currentUser,
        progress: {
            ...currentUser.progress,
            [courseId]: { completedSyllabusItems: updatedProgress }
        }
    };
    setCurrentUser(updatedUser);
  };

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
    }

    if (!currentUser) {
      return <AuthPage />;
    }

    switch (currentPage) {
      case 'dashboard':
        if (currentUser.role === 'Student') return <StudentDashboard user={currentUser} onViewCourse={handleViewCourse} />;
        if (currentUser.role === 'Instructor') return <InstructorDashboard user={currentUser} />;
        if (currentUser.role === 'Admin') return <AdminDashboard user={currentUser} />;
        return null;
      case 'courses':
        return <CourseCatalog onCourseClick={handleViewCourse} />;
      case 'course-detail':
          return selectedCourse ? <CourseDetailPage course={selectedCourse} onBack={() => handleNavClick('courses')} onEnroll={handleEnrollInCourse} onViewCourse={handleViewCourse} /> : <CourseCatalog onCourseClick={handleViewCourse} />;
      case 'course-player':
          return selectedCourse ? <CoursePlayer course={selectedCourse} user={currentUser} onUpdateProgress={handleUpdateProgress} onBack={() => handleNavClick('dashboard')} /> : <CourseCatalog onCourseClick={handleViewCourse} />;
      case 'certificates':
        return <Certificates />;
      case 'discussions':
          return currentUser.role === 'Student' ? <DiscussionRooms user={currentUser} /> : null;
      case 'career-advisor':
        return currentUser.role === 'Student' ? <AiCareerAdvisor user={currentUser} courses={MOCK_COURSES} /> : null;
      default:
        return <StudentDashboard user={currentUser} onViewCourse={handleViewCourse} />;
    }
  };

  return (
    <div className={`min-h-screen bg-navy-900 font-sans text-slate-light transition-colors duration-300`}>
      {currentUser && (
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          onNavClick={handleNavClick} 
          currentPage={currentPage}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          user={currentUser}
        />
      )}
      <main className={`pt-24 pb-12 container mx-auto px-4 sm:px-6 lg:px-8 ${!currentUser ? 'pt-0 pb-0 px-0' : ''}`}>
        {renderContent()}
      </main>
      {currentUser && <Footer />}
      {isPaymentModalOpen && courseForPayment && (
        <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            course={courseForPayment}
            onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default App;
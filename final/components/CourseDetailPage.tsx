import React, { useState } from 'react';
import { Course, SyllabusItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { AcademicCapIcon, ClockIcon, StarIcon, CheckCircleIcon, PlayCircleIcon, DocumentTextIcon, SparklesIcon, ArrowLeftIcon } from './Icons';
import { AskAiChat } from './AskAiChat';
import { AiQuizGenerator } from './AiQuizGenerator';

interface CourseDetailPageProps {
    course: Course;
    onBack: () => void;
    onEnroll: (courseId: number) => void;
    onViewCourse: (course: Course) => void;
}

const SyllabusItemCard: React.FC<{ item: SyllabusItem, isCompleted: boolean }> = ({ item, isCompleted }) => {
    const Icon = item.contentType === 'video' ? PlayCircleIcon : DocumentTextIcon;
    return (
        <div className={`p-4 rounded-lg flex items-center justify-between ${isCompleted ? 'bg-green-500/10' : 'bg-navy-700/50'}`}>
            <div className="flex items-center gap-4">
                <Icon className="h-6 w-6 text-cyan-400" />
                <div>
                    <p className="font-semibold text-slate-light">{item.title}</p>
                    <p className="text-sm text-slate-dark">{item.description}</p>
                </div>
            </div>
            {isCompleted && <CheckCircleIcon className="h-6 w-6 text-green-400" />}
        </div>
    );
};

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, onBack, onEnroll, onViewCourse }) => {
    const [isAiChatOpen, setIsAiChatOpen] = useState(false);
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const { currentUser } = useAuth();
    
    const userProgress = currentUser?.progress?.[course.id]?.completedSyllabusItems || [];
    const isEnrolled = currentUser?.enrolledCourseIds?.includes(course.id) ?? false;

    return (
        <div className="animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-dark hover:text-cyan-400 mb-6 font-semibold">
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Courses
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6">
                        <h1 className="font-display text-4xl font-bold text-slate-light mb-2">{course.title}</h1>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-dark mb-4">
                            <span className="flex items-center gap-1.5"><AcademicCapIcon className="h-4 w-4" /> {course.instructor}</span>
                            <span className="flex items-center gap-1.5"><ClockIcon className="h-4 w-4" /> {course.duration}</span>
                            <span className="flex items-center gap-1.5"><StarIcon className="h-4 w-4 text-yellow-400" /> {course.rating} ({course.enrollments.toLocaleString()} students)</span>
                        </div>
                        <p className="text-slate-dark mb-6">{course.description}</p>
                        
                        <h2 className="font-display text-2xl font-bold text-slate-light mb-4">Syllabus</h2>
                        <div className="space-y-3">
                            {course.syllabus.map(item => <SyllabusItemCard key={item.id} item={item} isCompleted={userProgress.includes(item.id)} />)}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg">
                        <img src={course.thumbnailUrl} alt={course.title} className="rounded-t-lg w-full h-48 object-cover"/>
                        <div className="p-6">
                             {isEnrolled ? (
                                <button 
                                    onClick={() => onViewCourse(course)}
                                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300"
                                >
                                    Go to Course
                                </button>
                             ) : (
                                <button 
                                    onClick={() => onEnroll(course.id)}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300"
                                >
                                    Enroll Now {course.price ? `for $${course.price}` : '(Free)'}
                                </button>
                             )}
                        </div>
                    </div>
                    {isEnrolled && (
                        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6 space-y-4">
                            <button onClick={() => setIsAiChatOpen(true)} className="w-full flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-600 text-slate-light font-bold py-3 px-4 rounded-lg transition-colors">
                                <SparklesIcon className="h-5 w-5 text-cyan-400" />
                                Ask AI Assistant
                            </button>
                            <button onClick={() => setIsQuizOpen(true)} className="w-full flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-600 text-slate-light font-bold py-3 px-4 rounded-lg transition-colors">
                                <SparklesIcon className="h-5 w-5 text-violet-400" />
                                Take AI Practice Quiz
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {isAiChatOpen && <AskAiChat course={course} onClose={() => setIsAiChatOpen(false)} />}
            {isQuizOpen && <AiQuizGenerator course={course} onClose={() => setIsQuizOpen(false)} />}
        </div>
    );
};
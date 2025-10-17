import React, { useState, useMemo } from 'react';
import { Course, User, SyllabusItem } from '../types';
import { ArrowLeftIcon, PlayCircleIcon, DocumentArrowDownIcon, CheckBadgeIcon } from './Icons';

interface CoursePlayerProps {
    course: Course;
    user: User;
    onUpdateProgress: (courseId: number, syllabusItemId: number) => void;
    onBack: () => void;
}

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-slate-dark">Completion</span>
            <span className="text-sm font-bold text-cyan-400">{value}%</span>
        </div>
        <div className="w-full bg-navy-700 rounded-full h-2.5">
            <div 
                className="bg-gradient-to-r from-cyan-400 to-violet-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${value}%` }}
            />
        </div>
    </div>
);

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ course, user, onUpdateProgress, onBack }) => {
    const [activeSyllabusItem, setActiveSyllabusItem] = useState<SyllabusItem>(course.syllabus[0]);

    const completedItems = useMemo(() => {
        return user.progress?.[course.id]?.completedSyllabusItems || [];
    }, [user.progress, course.id]);
    
    const progressPercentage = useMemo(() => {
        if (course.syllabus.length === 0) return 0;
        return Math.round((completedItems.length / course.syllabus.length) * 100);
    }, [completedItems, course.syllabus]);

    const isCurrentItemCompleted = completedItems.includes(activeSyllabusItem.id);

    return (
        <div className="animate-fade-in">
             <button onClick={onBack} className="flex items-center gap-2 text-slate-dark hover:text-cyan-400 mb-6 font-semibold">
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Dashboard
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3 bg-navy-800 rounded-lg shadow-lg p-6">
                    <h1 className="font-display text-3xl font-bold text-slate-light mb-1">{activeSyllabusItem.title}</h1>
                    <p className="text-slate-dark mb-6">{activeSyllabusItem.description}</p>
                    
                    <div className="aspect-video bg-navy-900 rounded-lg mb-6 flex items-center justify-center">
                       {activeSyllabusItem.contentType === 'video' ? (
                            <video key={activeSyllabusItem.id} controls autoPlay className="w-full h-full rounded-lg">
                                <source src={activeSyllabusItem.contentUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                       ) : (
                            <div className="text-center">
                                <DocumentArrowDownIcon className="h-16 w-16 mx-auto text-cyan-400 mb-4"/>
                                <h3 className="text-xl font-bold text-slate-light">Downloadable Resource</h3>
                                <a 
                                    href={activeSyllabusItem.contentUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
                                >
                                    Download PDF
                                </a>
                            </div>
                       )}
                    </div>
                    
                    <button 
                        onClick={() => onUpdateProgress(course.id, activeSyllabusItem.id)}
                        className={`w-full font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${isCurrentItemCompleted ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-navy-700 hover:bg-navy-600 text-slate-light'}`}
                    >
                        <CheckBadgeIcon className="h-5 w-5" />
                        {isCurrentItemCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </button>
                </div>
                {/* Syllabus Sidebar */}
                <div className="lg:col-span-1 bg-navy-800 rounded-lg shadow-lg p-6 self-start">
                    <h2 className="font-display text-2xl font-bold text-slate-light mb-4">{course.title}</h2>
                    <ProgressBar value={progressPercentage} />
                    <nav className="mt-6 space-y-2 max-h-[60vh] overflow-y-auto">
                        {course.syllabus.map(item => {
                            const isCompleted = completedItems.includes(item.id);
                            const isActive = item.id === activeSyllabusItem.id;
                            const Icon = item.contentType === 'video' ? PlayCircleIcon : DocumentArrowDownIcon;
                            
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSyllabusItem(item)}
                                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                                        isActive ? 'bg-cyan-500/20' : 'hover:bg-navy-700/50'
                                    }`}
                                >
                                    {isCompleted ? <CheckBadgeIcon className="h-5 w-5 text-green-400 flex-shrink-0"/> : <Icon className="h-5 w-5 text-slate-dark flex-shrink-0"/>}
                                    <span className={`text-sm font-medium ${isActive ? 'text-cyan-400' : 'text-slate-light'}`}>{item.title}</span>
                                </button>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
};
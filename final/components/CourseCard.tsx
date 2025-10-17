import React from 'react';
import { Course } from '../types';
import { ClockIcon, UserGroupIcon, StarIcon, AcademicCapIcon } from './Icons';

interface CourseCardProps {
  course: Course;
  progress?: number;
  onClick?: () => void;
}

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-slate-dark dark:text-slate-light">Progress</span>
            <span className="text-sm font-medium text-cyan-400">{progress}%</span>
        </div>
        <div className="w-full bg-navy-700 rounded-full h-2.5">
            <div 
                className="bg-gradient-to-r from-cyan-400 to-violet-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    </div>
);


export const CourseCard: React.FC<CourseCardProps> = ({ course, progress, onClick }) => {
  const { title, instructor, sponsor, price, level, duration, rating, enrollments, thumbnailUrl, tags } = course;

  return (
    <div 
      className="bg-white dark:bg-navy-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 dark:hover:shadow-cyan-400/20 transform hover:-translate-y-1 transition-all duration-300 ease-in-out group cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative">
        <img className="w-full h-48 object-cover" src={thumbnailUrl} alt={title} />
        {sponsor && (
          <div className="absolute top-2 right-2 bg-navy-900/80 p-2 rounded-lg flex items-center space-x-2">
            <sponsor.logo className="h-6 w-auto" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent"></div>
        <h3 className="absolute bottom-2 left-4 font-display text-xl font-bold text-white">{title}</h3>
      </div>
      
      <div className="p-5 space-y-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between text-sm text-slate-dark dark:text-slate-dark">
          <div className="flex items-center">
            <AcademicCapIcon className="h-4 w-4 mr-1.5 text-violet-400"/> {instructor}
          </div>
          <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${price !== undefined ? 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300' : 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300'}`}>
            {price !== undefined ? `$${price}` : 'Free'}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
                <span key={tag} className="text-xs font-medium bg-navy-700 text-slate-light px-2 py-1 rounded-full">{tag}</span>
            ))}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-dark dark:text-slate">
            <span className="flex items-center"><ClockIcon className="h-4 w-4 mr-1 text-cyan-400"/> {duration}</span>
            <span className="flex items-center"><UserGroupIcon className="h-4 w-4 mr-1 text-cyan-400"/> {enrollments.toLocaleString()}</span>
            <span className="flex items-center"><StarIcon className="h-4 w-4 mr-1 text-yellow-400"/> {rating}</span>
        </div>
        
        <div className="flex-grow"></div>
        
        {progress !== undefined && <div className="mt-4"><ProgressBar progress={progress} /></div>}

        <button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300 transform group-hover:scale-105">
          {progress !== undefined ? 'Continue Learning' : 'View Course'}
        </button>
      </div>
    </div>
  );
};
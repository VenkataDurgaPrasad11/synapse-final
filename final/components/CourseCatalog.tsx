import React, { useState } from 'react';
import { MOCK_COURSES } from '../constants';
import { Course } from '../types';
import { CourseCard } from './CourseCard';

interface CourseCatalogProps {
    onCourseClick: (course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ onCourseClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const allTags = Array.from(new Set(MOCK_COURSES.flatMap(c => c.tags)));

    const filteredCourses = MOCK_COURSES.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag ? course.tags.includes(selectedTag) : true;
        return matchesSearch && matchesTag && course.status === 'Published';
    });

    return (
        <div className="animate-fade-in">
            <h1 className="font-display text-4xl font-bold text-gray-800 dark:text-slate-light mb-2">Course Catalog</h1>
            <p className="text-lg text-gray-600 dark:text-slate-dark mb-8">Explore our wide range of courses and find your next learning adventure.</p>
            
            <div className="mb-8 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search for courses..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-grow bg-white dark:bg-navy-800 border-2 border-navy-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                />
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${!selectedTag ? 'bg-cyan-500 text-white' : 'bg-navy-700 text-slate-light hover:bg-navy-600'}`}
                >
                    All
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedTag === tag ? 'bg-cyan-500 text-white' : 'bg-navy-700 text-slate-light hover:bg-navy-600'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} onClick={() => onCourseClick(course)} />
                ))}
            </div>
        </div>
    );
};

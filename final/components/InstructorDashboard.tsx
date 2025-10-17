import React from 'react';
import { User } from '../types';
import { MOCK_COURSES } from '../constants';

export const InstructorDashboard: React.FC<{ user: User }> = ({ user }) => {
    const instructorCourses = MOCK_COURSES.filter(c => c.instructorId === user.id);
    return (
        <div className="animate-fade-in space-y-8">
            <h1 className="font-display text-4xl font-bold text-gray-800 dark:text-slate-light">Instructor Dashboard</h1>
            <p className="text-lg text-gray-600 dark:text-slate-dark">Welcome, {user.name}. Here's an overview of your courses.</p>
            <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6">
                <h2 className="font-display text-2xl font-bold text-slate-light mb-4">My Courses</h2>
                <div className="space-y-4">
                    {instructorCourses.map(course => (
                        <div key={course.id} className="p-4 bg-navy-700 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-bold text-slate-light">{course.title}</p>
                                <p className="text-sm text-slate-dark">{course.enrollments.toLocaleString()} students | Status: {course.status}</p>
                            </div>
                            <button className="text-sm font-semibold bg-cyan-500 text-white px-4 py-2 rounded-lg">Manage Course</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

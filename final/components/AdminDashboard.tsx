import React from 'react';
import { User } from '../types';
import { MOCK_COURSES, MOCK_ALL_USERS } from '../constants';

export const AdminDashboard: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className="animate-fade-in space-y-8">
            <h1 className="font-display text-4xl font-bold text-gray-800 dark:text-slate-light">Admin Dashboard</h1>
            <p className="text-lg text-gray-600 dark:text-slate-dark">System-wide overview and management tools.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-lg">
                    <h3 className="font-bold text-xl text-slate-light">Total Users</h3>
                    <p className="font-display text-4xl font-bold text-cyan-400">{MOCK_ALL_USERS.length}</p>
                </div>
                <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-lg">
                    <h3 className="font-bold text-xl text-slate-light">Total Courses</h3>
                    <p className="font-display text-4xl font-bold text-cyan-400">{MOCK_COURSES.length}</p>
                </div>
                <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-lg">
                    <h3 className="font-bold text-xl text-slate-light">Courses for Approval</h3>
                    <p className="font-display text-4xl font-bold text-yellow-400">{MOCK_COURSES.filter(c => c.status === 'Pending Approval').length}</p>
                </div>
            </div>
        </div>
    );
};

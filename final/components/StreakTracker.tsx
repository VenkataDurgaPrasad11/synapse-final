import React from 'react';
import { User } from '../types';
import { FireIcon } from './Icons';

interface StreakTrackerProps {
    user: User;
}

export const StreakTracker: React.FC<StreakTrackerProps> = ({ user }) => {
    const current = user.streak?.current || 0;
    const longest = user.streak?.longest || 0;
    
    return (
        <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-lg animate-slide-in-up" style={{animationDelay: '100ms'}}>
            <h2 className="font-display text-2xl font-bold text-gray-800 dark:text-slate-light mb-4">Learning Streak</h2>
            <div className="flex items-center justify-center space-x-4 my-6">
                <FireIcon className="h-16 w-16 text-orange-500"/>
                <div className="text-center">
                    <p className="font-display text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 animate-glow">{current}</p>
                    <p className="text-slate-dark">Day Streak!</p>
                </div>
            </div>
            <div className="text-center text-sm text-slate-dark">
                <p>Your longest streak is <span className="font-bold text-cyan-400">{longest}</span> days. Keep the fire going!</p>
            </div>
        </div>
    );
};
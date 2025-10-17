import React from 'react';
import { User } from '../types';
import { BadgeCheckIcon, AcademicCapIcon, FireIcon } from './Icons';

interface BadgeProps {
    icon: React.ReactNode;
    name: string;
    color: string;
}

const Badge: React.FC<BadgeProps> = ({ icon, name, color }) => (
    <div className="flex flex-col items-center space-y-1 text-center">
        <div className={`p-3 rounded-full bg-navy-700/50 ${color} transition-transform hover:scale-110`}>
            {icon}
        </div>
        <p className="text-xs text-slate-dark font-medium">{name}</p>
    </div>
);

interface AchievementsProps {
    user: User;
}

export const Achievements: React.FC<AchievementsProps> = ({ user }) => {
    const nextLevelXP = 10000;
    const userXP = user.xp || 0;
    const xpProgress = (userXP / nextLevelXP) * 100;
    
    return (
        <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-lg animate-slide-in-up" style={{animationDelay: '200ms'}}>
            <h2 className="font-display text-2xl font-bold text-gray-800 dark:text-slate-light mb-4">Achievements & XP</h2>
            
            <div className="mb-4">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-slate-light">XP: {userXP.toLocaleString()} / {nextLevelXP.toLocaleString()}</span>
                </div>
                <div className="w-full bg-navy-700 rounded-full h-2.5">
                    <div 
                        className="bg-gradient-to-r from-violet-500 to-cyan-400 h-2.5 rounded-full" 
                        style={{ width: `${xpProgress}%` }}
                    ></div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Badge icon={<AcademicCapIcon className="h-6 w-6"/>} name="Course Complete" color="text-cyan-400"/>
                <Badge icon={<BadgeCheckIcon className="h-6 w-6"/>} name="Top 10% Quiz" color="text-violet-400"/>
                <Badge icon={<FireIcon className="h-6 w-6"/>} name="7-Day Streak" color="text-orange-400"/>
            </div>
        </div>
    );
};
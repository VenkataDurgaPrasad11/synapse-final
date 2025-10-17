import React, { useState } from 'react';
import { BookOpenIcon, CheckCircleIcon, ExclamationTriangleIcon, SparklesIcon, ArrowPathIcon } from './Icons';
import * as gemini from '../lib/gemini';

const SummaryItem: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
    <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full bg-navy-700 ${color}`}>{icon}</div>
        <div>
            <p className="text-sm text-slate-dark">{title}</p>
            <p className="font-bold text-slate-light">{value}</p>
        </div>
    </div>
);

export const AiSummary: React.FC = () => {
    const [insight, setInsight] = useState("You’re 70% through your weekly target! Great job on the \"Cloud Computing\" module. Try revisiting the \"Networking\" quiz to improve your score.");
    const [loading, setLoading] = useState(false);

    const handleRegenerate = async () => {
        setLoading(true);
        const newInsight = await gemini.generateText("Generate a new personalized insight for a student's daily summary.");
        setInsight(newInsight);
        setLoading(false);
    }

    return (
        <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-lg animate-slide-in-up">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <SparklesIcon className="h-8 w-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500" />
                    <h2 className="font-display text-2xl font-bold text-gray-800 dark:text-slate-light">Today's AI Summary</h2>
                </div>
                 <button onClick={handleRegenerate} disabled={loading} className="p-2 rounded-full text-slate-light hover:bg-navy-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}/>
                </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <SummaryItem icon={<BookOpenIcon className="h-5 w-5"/>} title="Courses Studied" value="3" color="text-cyan-400" />
                <SummaryItem icon={<CheckCircleIcon className="h-5 w-5"/>} title="Avg. Quiz Score" value="88%" color="text-green-400" />
                <SummaryItem icon={<ExclamationTriangleIcon className="h-5 w-5"/>} title="Missed Goals" value="1" color="text-yellow-400" />
            </div>

            <div className="bg-navy-700/50 p-4 rounded-lg">
                <p className="text-slate-light font-semibold">Personalized Insight:</p>
                {loading ? (
                    <p className="text-slate-dark italic">Generating new insight...</p>
                ) : (
                    <p className="text-slate-dark">{insight}</p>
                )}
            </div>
        </div>
    );
};
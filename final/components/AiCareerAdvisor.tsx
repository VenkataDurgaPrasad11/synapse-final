import React, { useState } from 'react';
import { User, CareerPath, Course } from '../types';
import { SparklesIcon, ArrowPathIcon } from './Icons';
import * as gemini from '../lib/gemini';

interface AiCareerAdvisorProps {
    user: User;
    courses: Course[];
}

const PathStep: React.FC<{ step: number; title: string; duration: string; course?: Course; }> = ({ step, title, duration, course }) => (
    <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-white flex-shrink-0">{step}</div>
            {step < 3 && <div className="w-0.5 grow bg-navy-600 my-2"></div>}
        </div>
        <div>
            <h4 className="font-bold text-slate-light">{course ? course.title : title}</h4>
            <p className="text-sm text-slate-dark">{course ? course.duration : duration}</p>
            {course && <p className="text-xs text-cyan-400 mt-1">Level: {course.level}</p>}
        </div>
    </div>
);

export const AiCareerAdvisor: React.FC<AiCareerAdvisorProps> = ({ user, courses }) => {
    const [goal, setGoal] = useState('');
    const [path, setPath] = useState<CareerPath | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGeneratePath = async () => {
        if (!goal.trim()) return;
        setLoading(true);
        setPath(null);
        const generatedPath = await gemini.generateCareerPath(goal, courses);
        setPath(generatedPath);
        setLoading(false);
    };

    return (
        <div className="animate-fade-in">
            <div className="text-center max-w-3xl mx-auto">
                <SparklesIcon className="h-12 w-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto mb-4" />
                <h1 className="font-display text-4xl font-bold text-gray-800 dark:text-slate-light mb-2">AI Career Advisor</h1>
                <p className="text-lg text-gray-600 dark:text-slate-dark mb-8">Get a personalized learning roadmap to achieve your professional goals.</p>
                <div className="flex items-center gap-2 bg-white dark:bg-navy-800 p-2 rounded-lg shadow-lg">
                    <input
                        type="text"
                        value={goal}
                        onChange={e => setGoal(e.target.value)}
                        placeholder="e.g., 'Become a Frontend Developer'"
                        className="flex-1 bg-transparent p-2 text-slate-light placeholder-slate-dark focus:outline-none"
                    />
                    <button onClick={handleGeneratePath} disabled={loading} className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50">
                        {loading ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : 'Generate Path'}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="text-center mt-10 text-slate-light">
                    <ArrowPathIcon className="h-10 w-10 mx-auto animate-spin mb-4" />
                    <p>Generating your personalized career path...</p>
                </div>
            )}
            
            {path && !loading && (
                <div className="mt-12 max-w-3xl mx-auto bg-white dark:bg-navy-800 rounded-lg shadow-lg p-8 animate-fade-in">
                    <h2 className="font-display text-3xl font-bold text-slate-light">{path.title}</h2>
                    <div className="flex gap-4 text-sm my-2">
                        <span className="font-semibold text-slate-dark">Avg. Salary: <span className="text-green-400">{path.avgSalary}</span></span>
                        <span className="font-semibold text-slate-dark">Demand: <span className="text-cyan-400">{path.demand}</span></span>
                    </div>
                    <p className="text-slate-dark mb-6">{path.description}</p>
                    <div className='flex flex-col'>
                        {path.learningPath.map(p => {
                            const course = courses.find(c => c.id === p.courseId);
                            return <PathStep key={p.step} step={p.step} title={p.title} duration={p.duration} course={course} />
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
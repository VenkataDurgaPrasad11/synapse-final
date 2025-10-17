import React, { useState, useEffect } from 'react';
import { Course, QuizQuestion } from '../types';
import { XMarkIcon, SparklesIcon, ArrowPathIcon } from './Icons';
import * as gemini from '../lib/gemini';

interface AiQuizGeneratorProps {
    course: Course;
    onClose: () => void;
}

type QuizState = 'idle' | 'loading' | 'active' | 'finished';

export const AiQuizGenerator: React.FC<AiQuizGeneratorProps> = ({ course, onClose }) => {
    const [quizState, setQuizState] = useState<QuizState>('idle');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);

    const generateQuiz = async () => {
        setQuizState('loading');
        const generatedQuestions = await gemini.generateQuiz(course.title);
        setQuestions(generatedQuestions);
        setScore(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setQuizState('active');
    };

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        if (answer === questions[currentQuestionIndex].correctAnswer) {
            setScore(prev => prev + 1);
        }
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer(null);
            } else {
                setQuizState('finished');
            }
        }, 1000); // Wait 1 second before next question
    };

    const getButtonClass = (option: string) => {
        if (!selectedAnswer) return "hover:bg-navy-600";
        if (option === questions[currentQuestionIndex].correctAnswer) return "bg-green-500/50";
        if (option === selectedAnswer) return "bg-red-500/50";
        return "bg-navy-700";
    }

    return (
         <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-navy-800 w-full max-w-2xl rounded-lg shadow-2xl flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-navy-700">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon className="h-6 w-6 text-violet-400" />
                        <h2 className="font-display text-xl font-bold text-slate-light">AI Practice Quiz</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-navy-700">
                        <XMarkIcon className="h-6 w-6 text-slate-light" />
                    </button>
                </header>
                <main className="p-6 min-h-[300px] flex flex-col items-center justify-center">
                    {quizState === 'idle' && (
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-slate-light mb-2">Test Your Knowledge</h3>
                            <p className="text-slate-dark mb-4">Generate a quick practice quiz for "{course.title}"</p>
                            <button onClick={generateQuiz} className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold py-2 px-6 rounded-lg">
                                Start Quiz
                            </button>
                        </div>
                    )}
                    {quizState === 'loading' && (
                        <div className="text-center text-slate-light">
                            <ArrowPathIcon className="h-10 w-10 mx-auto animate-spin mb-4" />
                            <p>Generating your quiz...</p>
                        </div>
                    )}
                    {quizState === 'active' && questions.length > 0 && (
                        <div className="w-full">
                            <p className="text-sm text-slate-dark">Question {currentQuestionIndex + 1} of {questions.length}</p>
                            <h3 className="text-lg font-semibold text-slate-light my-2">{questions[currentQuestionIndex].question}</h3>
                            <div className="space-y-3 mt-4">
                                {questions[currentQuestionIndex].options.map(option => (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswer(option)}
                                        disabled={!!selectedAnswer}
                                        className={`w-full text-left p-3 rounded-lg border-2 border-navy-700 transition-colors duration-300 ${getButtonClass(option)}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {quizState === 'finished' && (
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-slate-light mb-2">Quiz Complete!</h3>
                            <p className="text-xl text-slate-dark mb-4">Your Score</p>
                            <p className="font-display text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 my-4">
                                {score} / {questions.length}
                            </p>
                             <button onClick={generateQuiz} className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold py-2 px-6 rounded-lg">
                                Take Another Quiz
                            </button>
                        </div>
                    )}
                </main>
            </div>
         </div>
    );
};
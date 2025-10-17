import React, { useState, useRef, useEffect } from 'react';
import { Course } from '../types';
import { XMarkIcon, PaperAirplaneIcon, SparklesIcon } from './Icons';
import * as gemini from '../lib/gemini';
import { useAuth } from '../contexts/AuthContext';

interface AskAiChatProps {
    course: Course;
    onClose: () => void;
}

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

export const AskAiChat: React.FC<AskAiChatProps> = ({ course, onClose }) => {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: `Hi ${currentUser?.name.split(' ')[0]}! I'm your AI assistant for "${course.title}". How can I help you today?` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiResponseText = await gemini.generateText(`In the context of the course "${course.title}", answer the following question: ${input}`);
        
        const aiMessage: Message = { sender: 'ai', text: aiResponseText };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-navy-800 w-full max-w-2xl h-[80vh] rounded-lg shadow-2xl flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-navy-700">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon className="h-6 w-6 text-cyan-400" />
                        <h2 className="font-display text-xl font-bold text-slate-light">Ask AI: {course.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-navy-700">
                        <XMarkIcon className="h-6 w-6 text-slate-light" />
                    </button>
                </header>

                <main className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            {msg.sender === 'ai' && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-navy-700 flex items-center justify-center"><SparklesIcon className="h-5 w-5 text-cyan-400"/></div>}
                            <div className={`p-3 rounded-lg max-w-md ${msg.sender === 'user' ? 'bg-violet-500 text-white rounded-br-none' : 'bg-navy-700 text-slate-light rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-start gap-3">
                             <div className="flex-shrink-0 h-8 w-8 rounded-full bg-navy-700 flex items-center justify-center"><SparklesIcon className="h-5 w-5 text-cyan-400 animate-pulse"/></div>
                             <div className="p-3 rounded-lg max-w-md bg-navy-700 text-slate-light rounded-bl-none">
                                <p className="text-sm italic">AI is thinking...</p>
                             </div>
                         </div>
                    )}
                    <div ref={messagesEndRef} />
                </main>

                <footer className="p-4 border-t border-navy-700">
                    <div className="flex items-center space-x-2 bg-navy-900 rounded-lg p-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            placeholder="Ask a question about this course..."
                            className="flex-1 bg-transparent text-slate-light placeholder-slate-dark focus:outline-none"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading} className="p-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 transition-colors disabled:bg-gray-500">
                            <PaperAirplaneIcon className="h-5 w-5" />
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};
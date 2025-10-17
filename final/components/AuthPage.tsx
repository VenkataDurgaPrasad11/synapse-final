import React, { useState } from 'react';
import { SynapseLogo, EyeIcon, EyeSlashIcon } from './Icons';
import { auth } from '../lib/firebase';

export const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            if (isLogin) {
                // Use default password for mock login for any registered email
                await auth.signInWithEmailAndPassword(email, 'password123');
            } else {
                await auth.createUserWithEmailAndPassword(email, password);
            }
            // On success, the AuthContext will handle navigation
        } catch (err: any) {
            setError(err.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };
    
    // Quick login buttons for demo purposes
    const handleQuickLogin = async (roleEmail: string) => {
        setLoading(true);
        setError(null);
        try {
            await auth.signInWithEmailAndPassword(roleEmail);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-navy-900 p-4">
            <div className="w-full max-w-md">
                <header className="text-center mb-8 animate-fade-in">
                    <div className="flex justify-center items-center space-x-4">
                        <SynapseLogo className="h-10 w-auto text-cyan-400" />
                        <h1 className="font-display text-4xl font-extrabold text-slate-light">SYNAPSE LMS</h1>
                    </div>
                    <p className="mt-2 text-lg text-slate-dark">Learn Intelligently. Progress Professionally.</p>
                </header>
                
                <div className="bg-navy-800 p-8 rounded-lg shadow-2xl animate-slide-in-up">
                    <h2 className="font-display text-2xl font-bold text-slate-light text-center mb-6">
                        {isLogin ? 'Welcome Back' : 'Create Your Account'}
                    </h2>
                    
                    {error && <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded-md mb-4">{error}</p>}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-dark mb-1" htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-navy-700 border border-navy-600 rounded-md p-2 text-slate-light focus:ring-2 focus:ring-cyan-400 focus:outline-none"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-dark mb-1" htmlFor="password">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-navy-700 border border-navy-600 rounded-md p-2 text-slate-light focus:ring-2 focus:ring-cyan-400 focus:outline-none"/>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-dark">
                                    {showPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                                </button>
                            </div>
                        </div>
                        {!isLogin && (
                             <div>
                                <label className="block text-sm font-medium text-slate-dark mb-1" htmlFor="confirm-password">Confirm Password</label>
                                <input type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full bg-navy-700 border border-navy-600 rounded-md p-2 text-slate-light focus:ring-2 focus:ring-cyan-400 focus:outline-none"/>
                            </div>
                        )}
                        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-wait">
                           {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                        </button>
                    </form>
                    <p className="text-center text-sm text-slate-dark mt-6">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => { setIsLogin(!isLogin); setError(null); }} className="font-semibold text-cyan-400 hover:underline ml-1">
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                     <div className="text-center mt-4">
                        <p className="text-xs text-slate-dark mb-2">For Demo: Quick Login</p>
                        <div className="flex justify-center gap-2">
                             <button onClick={() => handleQuickLogin('alex@test.com')} className="text-xs bg-navy-700 px-2 py-1 rounded hover:bg-navy-600">Student</button>
                             <button onClick={() => handleQuickLogin('eva@test.com')} className="text-xs bg-navy-700 px-2 py-1 rounded hover:bg-navy-600">Instructor</button>
                             <button onClick={() => handleQuickLogin('admin@test.com')} className="text-xs bg-navy-700 px-2 py-1 rounded hover:bg-navy-600">Admin</button>
                        </div>
                    </div>
                </div>

                <footer className="text-center mt-8 text-slate-dark text-sm animate-fade-in" style={{ animationDelay: '500ms' }}>
                    &copy; {new Date().getFullYear()} SYNAPSE LMS. All rights reserved.
                </footer>
            </div>
        </div>
    );
};
import React, { useState } from 'react';
import { Course } from '../types';
import { XMarkIcon, CreditCardIcon, ArrowPathIcon } from './Icons';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: Course;
    onPaymentSuccess: (courseId: number) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, course, onPaymentSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            // In a real app, you would handle payment processing here.
            // For this demo, we'll always assume success.
            setLoading(false);
            onPaymentSuccess(course.id);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-navy-800 w-full max-w-md rounded-lg shadow-2xl flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-navy-700">
                    <div className="flex items-center space-x-2">
                        <CreditCardIcon className="h-6 w-6 text-cyan-400" />
                        <h2 className="font-display text-xl font-bold text-slate-light">Complete Your Purchase</h2>
                    </div>
                    <button onClick={onClose} disabled={loading} className="p-1 rounded-full hover:bg-navy-700">
                        <XMarkIcon className="h-6 w-6 text-slate-light" />
                    </button>
                </header>

                <main className="p-6">
                    <div className="bg-navy-700/50 p-4 rounded-lg mb-6">
                        <p className="text-slate-dark">You are purchasing:</p>
                        <h3 className="text-lg font-bold text-slate-light">{course.title}</h3>
                        <p className="font-display text-3xl font-bold text-cyan-400 mt-2">${course.price?.toFixed(2)}</p>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-dark mb-1" htmlFor="cardName">Cardholder Name</label>
                            <input type="text" id="cardName" required className="w-full bg-navy-700 border border-navy-600 rounded-md p-2 text-slate-light focus:ring-2 focus:ring-cyan-400 focus:outline-none" defaultValue="Alex Johnson"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-dark mb-1" htmlFor="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" required className="w-full bg-navy-700 border border-navy-600 rounded-md p-2 text-slate-light focus:ring-2 focus:ring-cyan-400 focus:outline-none" defaultValue="4242 4242 4242 4242"/>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-dark mb-1" htmlFor="expiry">Expiry Date</label>
                                <input type="text" id="expiry" placeholder="MM/YY" required className="w-full bg-navy-700 border border-navy-600 rounded-md p-2 text-slate-light focus:ring-2 focus:ring-cyan-400 focus:outline-none" defaultValue="12/25"/>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-dark mb-1" htmlFor="cvc">CVC</label>
                                <input type="text" id="cvc" placeholder="123" required className="w-full bg-navy-700 border border-navy-600 rounded-md p-2 text-slate-light focus:ring-2 focus:ring-cyan-400 focus:outline-none" defaultValue="123"/>
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button type="submit" disabled={loading} className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 flex items-center justify-center">
                            {loading ? (
                                <>
                                    <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                                    Processing...
                                </>
                            ) : `Pay $${course.price?.toFixed(2)}`}
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
};

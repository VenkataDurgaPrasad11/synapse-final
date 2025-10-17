import React from 'react';
import { MOCK_CERTIFICATES } from '../constants';
import { Certificate } from '../types';

const CertificateCard: React.FC<{ certificate: Certificate }> = ({ certificate }) => {
    return (
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
                <img src={certificate.qrCodeUrl} alt="Certificate QR Code" className="h-24 w-24 rounded-md" />
            </div>
            <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-xl font-bold text-slate-light">{certificate.courseTitle}</h3>
                <p className="text-sm text-slate-dark">Issued to: <span className="font-semibold text-slate-light">{certificate.studentName}</span></p>
                <p className="text-sm text-slate-dark">Instructor: <span className="font-semibold text-slate-light">{certificate.instructorName}</span></p>
                <p className="text-xs text-slate-dark mt-1">Issued on: {certificate.issueDate}</p>
                 {certificate.sponsor && (
                    <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                        <span className="text-xs text-slate-dark">Sponsored by:</span>
                        <certificate.sponsor.logo className="h-6 w-auto" />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <button className="text-sm font-semibold bg-cyan-500 text-white px-4 py-2 rounded-lg w-full">View</button>
                <button className="text-sm font-semibold bg-navy-700 text-slate-light px-4 py-2 rounded-lg w-full">Share</button>
            </div>
        </div>
    );
};

export const Certificates: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <h1 className="font-display text-4xl font-bold text-gray-800 dark:text-slate-light mb-2">My Certificates</h1>
            <p className="text-lg text-gray-600 dark:text-slate-dark mb-8">A record of your achievements and completed courses.</p>
            <div className="space-y-6">
                {MOCK_CERTIFICATES.map(cert => <CertificateCard key={cert.id} certificate={cert} />)}
            </div>
        </div>
    );
};

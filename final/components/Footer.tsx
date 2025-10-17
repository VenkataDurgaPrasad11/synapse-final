
import React from 'react';
import { HubexusLogo, TechProjectHubLogo, TruScholarLogo } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-lg text-slate-light">SYNAPSE LMS</p>
            <p className="text-sm text-slate-dark">“Learn Intelligently. Progress Professionally.”</p>
            <p className="text-xs text-slate-dark mt-2">&copy; {new Date().getFullYear()} SYNAPSE LMS. All rights reserved.</p>
          </div>
          <div className="flex flex-col items-center md:items-end space-y-2">
            <p className="text-sm font-semibold text-slate-dark">Trusted by</p>
            <div className="flex items-center space-x-6">
              <HubexusLogo className="h-6 w-auto" />
              <TechProjectHubLogo className="h-6 w-auto" />
              <TruScholarLogo className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

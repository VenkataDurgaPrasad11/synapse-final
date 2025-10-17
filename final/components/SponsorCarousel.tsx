import React from 'react';
import { SPONSORS } from '../constants';

export const SponsorCarousel: React.FC = () => {
    const sponsors = Object.values(SPONSORS);
    return (
        <div>
            <h2 className="font-display text-3xl font-bold text-gray-800 dark:text-slate-light mb-6 text-center">Sponsored Courses From Industry Leaders</h2>
            <div className="relative overflow-hidden group">
                <div className="flex animate-marquee group-hover:paused">
                    {sponsors.concat(sponsors).map((sponsor, index) => (
                         <div key={`${sponsor.id}-${index}`} className="flex-shrink-0 w-auto flex justify-center items-center p-4 mx-4">
                            <sponsor.logo className="h-10 w-auto text-slate-dark dark:text-slate-light transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import React, { useState, useRef, useEffect } from 'react';
import { User, Page } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { SynapseLogo, SunIcon, MoonIcon, Bars3Icon, XMarkIcon, ChevronDownIcon, ArrowRightOnRectangleIcon } from './Icons';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  onNavClick: (page: Page) => void;
  currentPage: Page;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  user: User | null;
}

const NavLink: React.FC<{ page: Page; currentPage: Page; onClick: (page: Page) => void; children: React.ReactNode }> = ({ page, currentPage, onClick, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onClick(page)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 w-full text-left md:w-auto md:text-center ${
        isActive
          ? 'bg-navy-700 text-cyan-400'
          : 'text-slate-light hover:text-cyan-400 hover:bg-navy-700'
      }`}
    >
      {children}
    </button>
  );
};

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onNavClick, currentPage, isMenuOpen, setIsMenuOpen, user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleLogout = async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        await logout();
      } catch (error) {
        console.error("Failed to log out", error);
      }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-800/80 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button onClick={() => onNavClick('dashboard')} className="flex items-center space-x-2">
              <SynapseLogo className="h-8 w-auto text-cyan-400" />
              <span className="font-display text-2xl font-bold text-slate-light">SYNAPSE</span>
            </button>
          </div>
          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              <NavLink page="dashboard" currentPage={currentPage} onClick={onNavClick}>Dashboard</NavLink>
              <NavLink page="courses" currentPage={currentPage} onClick={onNavClick}>Course Catalog</NavLink>
              {user?.role === 'Student' && (
                <>
                  <NavLink page="certificates" currentPage={currentPage} onClick={onNavClick}>Certificates</NavLink>
                  <NavLink page="discussions" currentPage={currentPage} onClick={onNavClick}>Discussions</NavLink>
                  <NavLink page="career-advisor" currentPage={currentPage} onClick={onNavClick}>Career Advisor</NavLink>
                </>
              )}
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
             <button onClick={toggleTheme} className="p-2 rounded-full text-slate-light hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-800 focus:ring-white transition-colors duration-300">
              {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 text-slate-light p-1 rounded-full hover:bg-navy-700 transition-colors duration-300">
                   <img className="h-8 w-8 rounded-full" src={user.avatarUrl} alt="User avatar" />
                   <span className="text-sm font-medium hidden lg:block">{user.name}</span>
                   <ChevronDownIcon className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                 {isDropdownOpen && (
                   <div className="absolute right-0 mt-2 w-56 origin-top-right bg-navy-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in">
                     <div className="py-1">
                        <div className="px-4 py-2 border-b border-navy-600">
                            <p className="text-sm font-semibold text-slate-light">{user.name}</p>
                            <p className="text-xs text-slate-dark truncate">{user.email}</p>
                        </div>
                        <a href="#" onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-navy-600">
                           <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                           Logout
                        </a>
                     </div>
                   </div>
                 )}
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-light hover:text-white hover:bg-navy-700 focus:outline-none">
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
       {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <NavLink page="dashboard" currentPage={currentPage} onClick={onNavClick}>Dashboard</NavLink>
             <NavLink page="courses" currentPage={currentPage} onClick={onNavClick}>Course Catalog</NavLink>
             {user?.role === 'Student' && (
                <>
                    <NavLink page="certificates" currentPage={currentPage} onClick={onNavClick}>Certificates</NavLink>
                    <NavLink page="discussions" currentPage={currentPage} onClick={onNavClick}>Discussions</NavLink>
                    <NavLink page="career-advisor" currentPage={currentPage} onClick={onNavClick}>Career Advisor</NavLink>
                </>
              )}
             <div className="border-t border-navy-700 mt-3 pt-3 flex items-center justify-between">
                {user && (
                    <div className="flex items-center space-x-2">
                        <img className="h-8 w-8 rounded-full" src={user.avatarUrl} alt="User avatar" />
                        <div>
                            <p className="text-sm font-medium text-slate-light">{user.name}</p>
                            <a href="#" onClick={handleLogout} className="text-xs text-red-400">Logout</a>
                        </div>
                    </div>
                )}
                <button onClick={toggleTheme} className="p-2 rounded-full text-slate-light hover:bg-navy-700">
                    {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                </button>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { AppView } from '../types';
import { BalanceScaleIcon, MoonIcon, SunIcon } from './Icon';

interface HeaderProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems: { id: AppView; label: string }[] = [
    { id: 'chat', label: 'Consulta IA' },
    { id: 'database', label: 'Base de Datos Jurídica' },
    { id: 'documents', label: 'Generador de Documentos' },
  ];

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-10 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center text-blue-800 dark:text-blue-400 mb-4 sm:mb-0">
          <BalanceScaleIcon className="h-8 w-8 mr-3" />
          <h1 className="text-2xl font-bold">Lex Dominicana</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <nav className="flex space-x-2 sm:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`px-3 py-2 text-sm sm:text-base font-medium rounded-md transition-colors duration-200 ${
                  activeView === item.id
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'text-gray-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-slate-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
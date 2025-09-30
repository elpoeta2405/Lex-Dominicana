
import React from 'react';
import { AppView } from '../types';
import { BalanceScaleIcon, SunIcon, MoonIcon, KeyIcon } from './Icon';

interface HeaderProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onApiKeyClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, isDarkMode, toggleDarkMode, onApiKeyClick }) => {
  const navItems: { id: AppView; label: string }[] = [
    { id: 'chat', label: 'Consulta IA' },
    { id: 'database', label: 'Base de Datos' },
    { id: 'documents', label: 'Documentos' },
  ];

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center text-blue-800 dark:text-blue-400">
          <BalanceScaleIcon className="h-8 w-8 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Lex Dominicana</h1>
        </div>
        <nav className="hidden sm:flex items-center space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 relative ${
                activeView === item.id
                  ? 'text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {item.label}
              {activeView === item.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-blue-700 dark:bg-blue-300 rounded-full"></span>
              )}
            </button>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
            <button
                onClick={onApiKeyClick}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Configurar Clave API"
            >
                <KeyIcon className="h-6 w-6" />
            </button>
            <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
            >
                {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
        </div>
      </div>
       {/* Mobile Navigation */}
      <div className="sm:hidden border-t border-gray-200 dark:border-gray-700">
        <nav className="flex justify-around p-1">
             {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-center ${
                activeView === item.id
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

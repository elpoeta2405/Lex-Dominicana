
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';
import LegalDatabase from './components/LegalDatabase';
import DocumentGenerator from './components/DocumentGenerator';
import { AppView } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('chat');

  const renderContent = () => {
    switch (activeView) {
      case 'chat':
        return <ChatInterface />;
      case 'database':
        return <LegalDatabase />;
      case 'documents':
        return <DocumentGenerator />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200 transition-colors duration-300">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
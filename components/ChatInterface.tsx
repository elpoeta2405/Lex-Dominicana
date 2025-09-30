
import React, { useState, useRef, useEffect } from 'react';
import { getLegalResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { SendIcon, UserIcon, AiIcon } from './Icon';
import Disclaimer from './Disclaimer';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponseText = await getLegalResponse(input);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
       const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Hubo un problema al contactar al asistente. Por favor, intente de nuevo.",
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl mx-auto flex flex-col h-[calc(100vh-230px)] sm:h-[calc(100vh-180px)]">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Asistente de Consulta IA</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Haga su pregunta en lenguaje natural.</p>
        </div>
      <div className="flex-grow p-6 overflow-y-auto space-y-6">
        {messages.length === 0 && (
             <div className="text-center text-gray-500 dark:text-gray-400 flex flex-col justify-center items-center h-full">
                <div className="max-w-md">
                    <p className="mb-6 text-lg">Bienvenido a Lex Dominicana. ¿En qué puedo ayudarte hoy?</p>
                    <Disclaimer />
                </div>
            </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm"><AiIcon className="h-6 w-6" /></div>}
            <div className={`max-w-xl p-4 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 dark:bg-blue-700 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
               <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.sender === 'user' && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 flex items-center justify-center shadow-sm"><UserIcon className="h-6 w-6" /></div>}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm"><AiIcon className="h-6 w-6" /></div>
            <div className="max-w-xl p-4 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
              <LoadingSpinner />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
       {messages.length > 0 && <div className="px-6 pb-4"><Disclaimer /></div>}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escriba su consulta legal aquí..."
            className="flex-grow p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition dark:text-white"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            aria-label="Send message"
          >
            <SendIcon className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
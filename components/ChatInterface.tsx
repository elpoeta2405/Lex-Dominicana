
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { SendIcon, UserIcon, AiIcon } from './Icon';
import Disclaimer from './Disclaimer';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const savedMessages = localStorage.getItem('lexDominicanaChatHistory');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages)) {
          return parsedMessages;
        }
      }
    } catch (error) {
      console.error("Failed to load chat history from localStorage:", error);
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    try {
      localStorage.setItem('lexDominicanaChatHistory', JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history to localStorage:", error);
    }
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
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/.netlify/functions/getLegalResponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentInput }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error del servidor');
      }

      const data = await res.json();
      const aiResponseText = data.response;

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText || "No se recibió una respuesta válida del asistente.",
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
       console.error("Error calling Netlify function:", error);
       const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Hubo un problema al contactar al asistente. Por favor, intente de nuevo más tarde.",
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-4xl mx-auto flex flex-col h-[calc(100vh-200px)] transition-colors duration-300">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-slate-200">Asistente de Consulta IA</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">Haga su pregunta en lenguaje natural.</p>
        </div>
      <div className="flex-grow p-6 overflow-y-auto space-y-6">
        {messages.length === 0 && (
             <div className="text-center text-gray-500 dark:text-slate-400">
                <p className="mb-4">Bienvenido a Lex Dominicana. ¿En qué puedo ayudarte hoy?</p>
                <Disclaimer />
            </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center"><AiIcon className="h-6 w-6" /></div>}
            <div className={`max-w-xl p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
               <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.sender === 'user' && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 dark:bg-slate-600 text-gray-600 dark:text-slate-300 flex items-center justify-center"><UserIcon className="h-6 w-6" /></div>}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center"><AiIcon className="h-6 w-6" /></div>
            <div className="max-w-xl p-4 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none">
              <LoadingSpinner />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
       {messages.length > 0 && <div className="p-4"><Disclaimer /></div>}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/[.5] rounded-b-xl">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escriba su consulta legal aquí..."
            className="flex-grow p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <SendIcon className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
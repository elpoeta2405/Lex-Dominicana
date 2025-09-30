
import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentApiKey: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, currentApiKey }) => {
  const [apiKey, setApiKey] = useState(currentApiKey);

  useEffect(() => {
    setApiKey(currentApiKey);
  }, [currentApiKey, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(apiKey);
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center" 
        aria-modal="true" 
        role="dialog"
        onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md m-4 transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Configurar Clave API de Google AI
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Para usar las funciones de IA, necesita una clave API de Google AI. Puede obtener una desde{' '}
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Google AI Studio
          </a>.
          Su clave se guarda localmente en su navegador y nunca se comparte.
        </p>
        <form onSubmit={handleSave}>
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Clave API
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 sm:text-sm dark:text-white"
              placeholder="Ingrese su clave API aquí"
              autoComplete="off"
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
              Guardar Clave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;


import React, { useState } from 'react';
import { SearchIcon } from './Icon';

interface MockResult {
  id: number;
  title: string;
  type: string;
  number: string;
  date: string;
  status: 'Vigente' | 'Derogada' | 'Modificada';
  snippet: string;
}

const MOCK_RESULTS: MockResult[] = [
  {
    id: 1,
    title: 'Código Civil de la República Dominicana',
    type: 'Código',
    number: 'N/A',
    date: '21 de marzo de 1844',
    status: 'Vigente',
    snippet: 'Regula las relaciones civiles entre las personas, los contratos, la propiedad y las sucesiones. Artículo 1134: Las convenciones legalmente formadas tienen fuerza de ley para aquellos que las han hecho.'
  },
  {
    id: 2,
    title: 'Ley sobre Control de Alquileres de Casas y Desahucios',
    type: 'Ley',
    number: '4314',
    date: '22 de octubre de 1955',
    status: 'Modificada',
    snippet: 'Establece las normas que rigen los contratos de alquiler de inmuebles urbanos y rurales destinados a vivienda o a otros usos...'
  },
  {
    id: 3,
    title: 'Decreto que establece el toque de queda',
    type: 'Decreto',
    number: '740-20',
    date: '20 de diciembre de 2020',
    status: 'Derogada',
    snippet: 'Se establecen nuevas medidas para el toque de queda y el distanciamiento social a nivel nacional como parte del estado de emergencia...'
  },
   {
    id: 4,
    title: 'Ley sobre Crímenes y Delitos de Alta Tecnología',
    type: 'Ley',
    number: '53-07',
    date: '23 de abril de 2007',
    status: 'Vigente',
    snippet: 'Tiene por objeto la protección integral de los sistemas que utilicen tecnologías de la información y comunicación, así como la prevención y sanción de los delitos cometidos contra éstos...'
  }
];

const LegalDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<MockResult[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
        setResults(MOCK_RESULTS);
    } else {
        const filteredResults = MOCK_RESULTS.filter(r => 
            r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            r.snippet.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-5xl mx-auto p-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-2">Base de Datos Jurídica</h2>
      <p className="text-gray-600 dark:text-slate-400 mb-6">Busque en todo el cuerpo normativo de la República Dominicana.</p>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por palabra clave, ej: 'difamación en redes sociales'"
            className="w-full p-3 pl-10 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
          />
          <SearchIcon className="h-5 w-5 text-gray-400 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex items-center justify-center"
        >
          Buscar
        </button>
      </form>
      
      <div className="space-y-4">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700/[.5] transition-shadow">
              <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-400">{result.title}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      result.status === 'Vigente' ? 'bg-green-100 text-green-800 dark:bg-green-900/[.4] dark:text-green-300' : 
                      result.status === 'Modificada' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/[.4] dark:text-yellow-300' : 'bg-red-100 text-red-800 dark:bg-red-900/[.4] dark:text-red-300'
                  }`}>
                      {result.status}
                  </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">{result.type} No. {result.number} - {result.date}</p>
              <p className="text-gray-700 dark:text-slate-300">{result.snippet}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-slate-400 py-8">Realice una búsqueda para ver los resultados.</p>
        )}
      </div>
    </div>
  );
};

export default LegalDatabase;
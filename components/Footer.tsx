
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mt-8 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Lex Dominicana. Todos los derechos reservados.
        </p>
        <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">
          Este sitio es una herramienta de consulta basada en IA y no ofrece asesoría legal directa. 
          Para casos específicos, consulte a un abogado profesional.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
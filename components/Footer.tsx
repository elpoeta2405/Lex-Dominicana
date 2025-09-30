import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 mt-8">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Lex Dominicana by Carlos Hernandez. Todos los derechos reservados.
        </p>
        <p className="text-xs mt-2">
          Este sitio es una herramienta de consulta basada en IA y no ofrece asesoría legal directa. 
          Para casos específicos, consulte a un abogado profesional.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
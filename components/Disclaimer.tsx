
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md shadow-sm dark:bg-yellow-900/[.4] dark:border-yellow-600 dark:text-yellow-300 transition-colors duration-300" role="alert">
      <p className="font-bold">Descargo de Responsabilidad</p>
      <p className="text-sm">
        Soy un asistente legal basado en IA. Mi información se basa en la legislación vigente y no constituye asesoría legal. Para casos específicos, consulte a un abogado profesional.
      </p>
    </div>
  );
};

export default Disclaimer;
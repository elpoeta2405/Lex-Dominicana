
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-sm" role="alert">
      <p className="font-bold">Descargo de Responsabilidad</p>
      <p className="text-sm">
        Soy un asistente legal basado en IA. Mi información se basa en la legislación vigente y no constituye asesoría legal. Para casos específicos, consulte a un abogado profesional.
      </p>
    </div>
  );
};

export default Disclaimer;

import React from 'react';
import BreedCard from './BreedCard';

const BreedsList = ({ breeds }) => {
  if (!breeds || breeds.length === 0) {
    return <p>Nenhuma raça encontrada. Clique em "Importar raças" para popular o banco de dados.</p>;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '16px',
      marginTop: '20px'
    }}>
      {breeds.map((breed) => (
        <BreedCard key={breed.id} breed={breed} />
      ))}
    </div>
  );
};

export default BreedsList;

import React from 'react';
import BreedCard from './BreedCard';

const BreedsList = ({ breeds, loading }) => {
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        fontSize: '16px',
        color: '#666'
      }}>
        Carregando raças...
      </div>
    );
  }

  if (!breeds || breeds.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#666'
      }}>
        <p>Nenhuma raça encontrada.</p>
        <p style={{ fontSize: '14px', marginTop: '8px' }}>
          Clique em "Importar raças" para carregar os dados da API.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        marginBottom: '16px',
        padding: '8px 16px',
        backgroundColor: '#e8f5e8',
        border: '1px solid #4caf50',
        borderRadius: '4px',
        color: '#2e7d32',
        fontSize: '14px'
      }}>
        {breeds.length} raça{breeds.length !== 1 ? 's' : ''} encontrada{breeds.length !== 1 ? 's' : ''}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {breeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
};

export default BreedsList;
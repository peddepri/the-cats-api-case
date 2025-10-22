import React from 'react';
import BreedCard from './BreedCard';

<<<<<<< HEAD
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
=======
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
>>>>>>> 1a60ddae4a0f8f2bfa426576a16e3bef5442463a
    </div>
  );
};

<<<<<<< HEAD
export default BreedsList;
=======
export default BreedsList;
>>>>>>> 1a60ddae4a0f8f2bfa426576a16e3bef5442463a

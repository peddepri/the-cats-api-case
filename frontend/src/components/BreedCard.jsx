import React from 'react';

const BreedCard = ({ breed }) => {
  // Suporta tanto 'imagens' quanto 'images' para compatibilidade
  const images = breed.imagens || breed.images || [];
  const displayImages = images.slice(0, 3);

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ marginTop: 0 }}>{breed.nome}</h3>
      
      <p><strong>Origem:</strong> {breed.origem || 'N/A'}</p>
      <p><strong>Temperamento:</strong> {breed.temperamento || 'N/A'}</p>
      
      {breed.descricao && (
        <p style={{ fontSize: '14px', color: '#555' }}>
          <strong>Descrição:</strong> {breed.descricao}
        </p>
      )}
      
      {displayImages.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <strong>Imagens:</strong>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
            {displayImages.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`${breed.nome} ${index + 1}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BreedCard;

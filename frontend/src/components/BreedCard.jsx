import React from 'react';

const BreedCard = ({ breed }) => {
<<<<<<< HEAD
=======
  // Suporta tanto 'imagens' quanto 'images' para compatibilidade
  const images = breed.imagens || breed.images || [];
  const displayImages = images.slice(0, 3);

>>>>>>> 1a60ddae4a0f8f2bfa426576a16e3bef5442463a
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
<<<<<<< HEAD
      margin: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
        {breed.nome || 'Nome não disponível'}
      </h3>
      
      {breed.descricao && (
        <p style={{ margin: '8px 0', color: '#666', fontSize: '14px' }}>
          {breed.descricao.length > 150 
            ? `${breed.descricao.substring(0, 150)}...` 
            : breed.descricao}
        </p>
      )}
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
        {breed.origem && (
          <span style={{
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            Origem: {breed.origem}
          </span>
        )}
        
        {breed.temperamento && (
          <span style={{
            backgroundColor: '#f3e5f5',
            color: '#7b1fa2',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {breed.temperamento.split(',')[0].trim()}
          </span>
        )}
      </div>
      
      {breed.imagens && breed.imagens.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {breed.imagens.slice(0, 3).map((imagem, index) => (
              <img
                key={index}
                src={imagem.url}
                alt={`${breed.nome} - imagem ${index + 1}`}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  border: '1px solid #eee'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ))}
            {breed.imagens.length > 3 && (
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: '#666',
                border: '1px solid #eee'
              }}>
                +{breed.imagens.length - 3}
              </div>
            )}
=======
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
>>>>>>> 1a60ddae4a0f8f2bfa426576a16e3bef5442463a
          </div>
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default BreedCard;
=======
export default BreedCard;
>>>>>>> 1a60ddae4a0f8f2bfa426576a16e3bef5442463a

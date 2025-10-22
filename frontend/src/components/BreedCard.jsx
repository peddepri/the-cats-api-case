import React from 'react';

const BreedCard = ({ breed }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
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
          </div>
        </div>
      )}
    </div>
  );
};

export default BreedCard;
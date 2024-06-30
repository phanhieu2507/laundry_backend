import React from 'react';

const Image = ({ src, alt, className, onClick }) => {
  const baseUrl = 'http://localhost:8000'; // Cập nhật baseUrl theo URL của máy chủ backend của bạn
  return (
    <img
      src={`${baseUrl}${src}`} 
      alt={alt || 'Image'}
      className={className}
      onClick={onClick}
    />
  );
};

export default Image;

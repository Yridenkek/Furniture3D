import React from 'react';

const Wall = ({ position, rotation, size = [1, 1], color = '#ffffff' }) => {
  return (
    <mesh position={position} rotation={rotation}>
      {/* Геометрия стены */}
      <planeGeometry args={size} />
      {/* Материал стены */}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Wall;

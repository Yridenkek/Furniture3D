import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, RepeatWrapping } from 'three';

const Floor = ({ width, length, texturePath }) => {
  const texture = useLoader(TextureLoader, texturePath);

  // Настройка повторения текстуры
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(5, 5); // Подстройте это значение для лучшего визуального результата

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      {/* Геометрия пола */}
      <planeGeometry args={[width, length]} />
      {/* Материал с текстурой */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Floor;

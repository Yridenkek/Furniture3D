import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, RepeatWrapping } from 'three';


const Wall = ({ position, rotation, size = [1, 1], texturePath}) => {

  const texture = useLoader(TextureLoader, texturePath);
  
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(22, 22); 

  return (
    <mesh position={position} rotation={rotation}>
      {/* Геометрия стены */}
      <planeGeometry args={size} />
      {/* Материал стены */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Wall;

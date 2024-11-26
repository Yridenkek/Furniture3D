import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Module = ({ position, modelPath, groupRef }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  console.log(gltf.scene);

  // Оборачиваем всю сцену модели в родительскую группу
  return (
    <group ref={groupRef} position={position}>
      <primitive object={gltf.scene} />
      
    </group>
  );
  
};

export default Module;

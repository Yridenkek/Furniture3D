import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Module = ({ position, modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const moduleRef = useRef();

  return (
    <group ref={moduleRef} position={position}>
      <primitive object={gltf.scene} />
    </group>
  );
};

export default Module;

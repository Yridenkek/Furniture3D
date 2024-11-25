import React, { useRef, useState, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Module = ({ position, modelPath, onMove, roomDimensions }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const moduleRef = useRef();
  const [dragging, setDragging] = useState(false);

  const { width = 4000, length = 3000 } = roomDimensions || {}; 

  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));

  const handlePointerDown = (event) => {
    event.stopPropagation();
    setDragging(true); 
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    setDragging(false); 
    if (onMove && moduleRef.current) {
      const newPosition = [moduleRef.current.position.x, moduleRef.current.position.y, moduleRef.current.position.z];
      onMove(newPosition); 
    }
  };

  const handlePointerMove = (event) => {
    if (!dragging) return;
    event.stopPropagation();

    const intersection = event.ray.intersectPlane(planeRef.current, new THREE.Vector3());

    if (intersection) {
      const limitedX = Math.max(-width / 2000, Math.min(width / 2000, intersection.x));
      const limitedZ = Math.max(-length / 2000, Math.min(length / 2000, intersection.z));
      moduleRef.current.position.set(limitedX, position[1], limitedZ);
    }
  };

  useEffect(() => {
    if (moduleRef.current) {
      moduleRef.current.position.set(position[0], position[1], position[2]);
    }
  }, [position]);

  return (
    <group
      ref={moduleRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <primitive object={gltf.scene} />
    </group>
  );
};

export default Module;

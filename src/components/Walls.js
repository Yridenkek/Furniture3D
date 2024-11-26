import React from 'react';
import Wall from './Wall';

const Walls = ({ roomDimensions }) => {
  const { width, length, height } = roomDimensions;

  return (
    <>
      {/* Передняя стена */}
      <Wall
        position={[0, height / 2000, -length / 2000]}
        rotation={[0, 0, 0]}
        size={[width / 1000, height / 1000]}
        texturePath="/textures/room/walls.jpg"
      />
      {/* Задняя стена */}
      <Wall
        position={[0, height / 2000, length / 2000]}
        rotation={[0, Math.PI, 0]}
        size={[width / 1000, height / 1000]}
        texturePath="/textures/room/walls.jpg"
      />
      {/* Левая стена */}
      <Wall
        position={[-width / 2000, height / 2000, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[length / 1000, height / 1000]}
        texturePath="/textures/room/walls.jpg"
      />
      {/* Правая стена */}
      <Wall
        position={[width / 2000, height / 2000, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        size={[length / 1000, height / 1000]}
        texturePath="/textures/room/walls.jpg"
      />
      {/* Потолок */}
      <Wall
        position={[0, height / 1000, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        size={[width / 1000, length / 1000]}
        texturePath="/textures/room/cealing.jpg"
      />
    </>
  );
};

export default Walls;

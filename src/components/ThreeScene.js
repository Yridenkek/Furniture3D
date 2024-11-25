import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Module from './Module';
import Wall from './Wall';
import RoomSettings from './RoomSettings';
import Floor from './Floor';
import ModuleLibrary from './ModuleLibrary';
import Materials from './Materials';
import './ThreeScene.css';

const ThreeScene = () => {
  const [roomDimensions, setRoomDimensions] = useState({
    width: 4000,
    length: 3000,
    height: 2700,
  });

  const [modules, setModules] = useState([]); // Хранение списка модулей в сцене

  const handleAddModule = (moduleData) => {
    setModules([...modules, moduleData]);
  };

  const handleMoveModule = (index, newPosition) => {
    setModules((prevModules) =>
      prevModules.map((module, i) => (i === index ? { ...module, position: newPosition } : module))
    );
  };

  const { width, length, height } = roomDimensions;

  return (
    <div className="mainscene">
      <div className="sceneContainer">
        <div className="threeScene">
          <Canvas
            camera={{
              position: [width / 2000, height / 2000, width / 2000], // Перевод в метры
              fov: 50,
            }}
          >
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} />

            <Floor
              width={width / 1000}
              length={length / 1000}
              texturePath="/textures/room/woodenfloor.jpg"
            />

            {/* Стены */}
            <Wall
              position={[0, height / 2000, -length / 2000]}
              rotation={[0, 0, 0]}
              size={[width / 1000, height / 1000]}
              texturePath="/textures/room/walls.jpg"
            />
            <Wall
              position={[0, height / 2000, length / 2000]}
              rotation={[0, Math.PI, 0]}
              size={[width / 1000, height / 1000]}
              texturePath="/textures/room/walls.jpg"
            />
            <Wall
              position={[-width / 2000, height / 2000, 0]}
              rotation={[0, Math.PI / 2, 0]}
              size={[length / 1000, height / 1000]}
              texturePath="/textures/room/walls.jpg"
            />
            <Wall
              position={[width / 2000, height / 2000, 0]}
              rotation={[0, -Math.PI / 2, 0]}
              size={[length / 1000, height / 1000]}
              texturePath="/textures/room/walls.jpg"
            />
            <Wall
              position={[0, height / 1000, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              size={[width / 1000, length / 1000]}
              texturePath="/textures/room/cealing.jpg"
            />

            {/* Модули */}
            {modules.map((module, index) => (
              <Module
                key={index}
                position={module.position}
                modelPath={module.modelPath}
                onMove={(newPosition) => handleMoveModule(index, newPosition)}
                roomDimensions={roomDimensions}
              />
            ))}
          </Canvas>
        </div>

        <RoomSettings onChange={setRoomDimensions} />
        <ModuleLibrary onAddModule={handleAddModule} />
        <Materials />
      </div>
    </div>
  );
};

export default ThreeScene;

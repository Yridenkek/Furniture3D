import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Module from './Module';
import Wall from './Wall';
import RoomSettings from './RoomSettings';
import Floor from './Floor';
import ModuleLibrary from './ModuleLibrary';
import './ThreeScene.css';

const ThreeScene = () => {
  // Состояние для размеров помещения (в миллиметрах)
  const [roomDimensions, setRoomDimensions] = useState({
    width: 4000,
    length: 3000,
    height: 2700,
  });

  const [modules, setModules] = useState([]); // Хранение списка модулей в сцене

  const handleAddModule = (moduleData) => {
    setModules([...modules, moduleData]);
  };

  const { width, length, height } = roomDimensions;

  return (
    <div class="mainscene">
      
      <div class=""><Canvas
        camera={{
          position: [width / 2000, height / 2000, width / 2000], // Перевод в метры
          fov: 50,
        }}
      >
        {/* Управление камерой */}
        <OrbitControls />

        {/* Освещение */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />

        {/* Пол с текстурой */}
        <Floor
          width={width / 1000} // перевод в метры
          length={length / 1000}
          texturePath="/textures/room/woodenfloor.jpg" // путь к файлу текстуры
        />

        {/* Стены */}
        <Wall
          position={[0, height / 2000, -length / 2000]} // Перевод в метры
          rotation={[0, 0, 0]}
          size={[width / 1000, height / 1000]}
          color="#d1d1d1"
        />
        <Wall
          position={[-width / 2000, height / 2000, 0]}
          rotation={[0, Math.PI / 2, 0]}
          size={[length / 1000, height / 1000]}
          color="#c1c1c1"
        />
        <Wall
          position={[width / 2000, height / 2000, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          size={[length / 1000, height / 1000]}
          color="#b1b1b1"
        />
        <Wall
          position={[0, height / 1000, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          size={[width / 1000, length / 1000]}
          color="#e0e0e0"
        />

        {/* Модули */}
        {modules.map((module, index) => (
          <Module key={index} position={module.position} modelPath={module.modelPath} />
        ))}
      </Canvas></div>

      {/* Панель настроек помещения */}
      <RoomSettings onChange={setRoomDimensions} />

      {/* Панель библиотеки модулей */}
      <ModuleLibrary onAddModule={handleAddModule} />
    </div>
  );
};

export default ThreeScene;

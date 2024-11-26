import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Module from './Module';
import RoomSettings from './RoomSettings';
import Floor from './Floor';
import ModuleLibrary from './ModuleLibrary';
import Materials from './Materials';
import DragManager from './DragManager'; // Импорт DragManager
import './ThreeScene.css';
import Walls from './Walls';


const ThreeScene = () => {
  const [roomDimensions, setRoomDimensions] = useState({
    width: 4000,
    length: 3000,
    height: 2700,
  });

  const [modules, setModules] = useState([]);
  const orbitControlsRef = useRef(); // Референс для OrbitControls

  const handleAddModule = (moduleData) => {
    setModules([
      ...modules,
      { ...moduleData, groupRef: React.createRef() }, // Добавляем референс для каждого модуля
    ]);
  };

  const { width, length, height } = roomDimensions;

  return (
    <div className="mainscene">
      <div className="sceneContainer">
        <div className="threeScene">
          <Canvas
                  camera={{
                    position: [width / 2000, height / 2000, width / 2000],
                    fov: 50,
                  }}
                >
                  <OrbitControls ref={orbitControlsRef} />
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 10]} />

                  <Floor width={width / 1000} length={length / 1000} texturePath="/textures/room/woodenfloor.jpg" />

                  <Walls roomDimensions={roomDimensions} />

                  {modules.map((module, index) => (
                    <Module
                      key={index}
                      position={module.position}
                      modelPath={module.modelPath}
                      groupRef={module.groupRef}
                    />
                  ))}

                  <DragManager
                    modules={modules}
                    setModules={setModules}
                    roomDimensions={roomDimensions}
                    orbitControlsRef={orbitControlsRef}
                  />
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

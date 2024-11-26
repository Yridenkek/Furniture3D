import React, { useState } from 'react';

const ModuleLibrary = ({ onAddModule }) => {
  const [selectedModule, setSelectedModule] = useState(null);

  const moduleLibrary = [
    { name: 'V600', modelPath: '/models/V2_1_600.glb' },
    { name: 'R800', modelPath: '/models/R2_800.glb'},
    { name: 'Шар', modelPath: '/models/1.glb'},

  ];

  const handleSelectModule = (module) => {
    setSelectedModule(module);
  };

  const handleAddModule = () => {
    if (selectedModule) {
      onAddModule({
        modelPath: selectedModule.modelPath,
        position: [0, 0, 0], // Стартовая позиция добавленного модуля
      });
      setSelectedModule(null); // Сброс выбранного модуля
    }
  };

  return (
    <div class="moduleMenu">
      <h3>Библиотека модулей</h3>
      <div>
        {moduleLibrary.map((module, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>
            <button onClick={() => handleSelectModule(module)}>{module.name}</button>
          </div>
        ))}
      </div>
      <button onClick={handleAddModule} disabled={!selectedModule}>
        Добавить модуль
      </button>
    </div>
  );
};

export default ModuleLibrary;
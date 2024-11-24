import React, { useState } from 'react';

const ModuleLibrary = ({ onAddModule }) => {
  const [selectedModule, setSelectedModule] = useState(null);

  const moduleLibrary = [
    { name: '600', modelPath: '/models/V2_1_600.glb' },
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
    <div style={{ padding: '10px', border: '1px solid #ccc', marginTop: '10px' }}>
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

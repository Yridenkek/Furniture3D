import React, { useState } from 'react';

const RoomSettings = ({ onChange }) => {
  // Состояние для ширины, длины и высоты в миллиметрах
  const [width, setWidth] = useState(4000); // 20000 мм = 20 м
  const [length, setLength] = useState(3000); // 20000 мм = 20 м
  const [height, setHeight] = useState(2700); // 10000 мм = 10 м

  // Обновление значений
  const handleInputChange = (e, setter, dimension) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setter(value);
      onChange({ width, length, height, [dimension]: value });
    }
  };

  return (
    <div
      
    >
      <h3>Room Settings (mm)</h3>

      {/* Ширина */}
      <div>
        <label>
          Width:
          <input
            type="number"
            min="5000"
            max="50000"
            value={width}
            onChange={(e) => handleInputChange(e, setWidth, 'width')}
            style={{ width: '80px', marginLeft: '10px', marginRight: '10px' }}
          />
          mm
        </label>
      </div>

      {/* Длина */}
      <div>
        <label>
          Length:
          <input
            type="number"
            min="5000"
            max="50000"
            value={length}
            onChange={(e) => handleInputChange(e, setLength, 'length')}
            style={{ width: '80px', marginLeft: '10px', marginRight: '10px' }}
          />
          mm
        </label>
      </div>

      {/* Высота */}
      <div>
        <label>
          Height:
          <input
            type="number"
            min="2000"
            max="20000"
            value={height}
            onChange={(e) => handleInputChange(e, setHeight, 'height')}
            style={{ width: '80px', marginLeft: '10px', marginRight: '10px' }}
          />
          mm
        </label>
      </div>
    </div>
  );
};

export default RoomSettings;

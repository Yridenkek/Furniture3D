import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

const DragManager = ({ modules, setModules, roomDimensions, orbitControlsRef }) => {
  const { camera, gl } = useThree();
  const dragControlsRef = useRef();

  useEffect(() => {
    // Собираем только группы модулей
    const draggableObjects = modules
      .map((module) => module.groupRef.current)
      .filter((group) => group !== null);

    // Создаем DragControls
    const controls = new DragControls(draggableObjects, camera, gl.domElement);

    // Устанавливаем transformGroup, чтобы перемещать только группы
    controls.transformGroup = true;

    // Выключаем OrbitControls при перетаскивании
    controls.addEventListener('dragstart', () => {
      if (orbitControlsRef.current) {
        orbitControlsRef.current.enabled = false;
      }
    });

    // Ограничиваем перемещение модуля
    controls.addEventListener('drag', (event) => {
      const object = event.object;
      const { width, length } = roomDimensions;

      // Ограничиваем движение модуля
      object.position.x = Math.max(-width / 2000, Math.min(width / 2000, object.position.x));
      object.position.z = Math.max(-length / 2000, Math.min(length / 2000, object.position.z));
      object.position.y = 0; // Модули остаются на полу
    });

    // Обновляем позицию модуля при завершении перетаскивания
    controls.addEventListener('dragend', (event) => {
      const object = event.object;
      const index = modules.findIndex((module) => module.groupRef.current === object);

      if (index !== -1) {
        const updatedModules = [...modules];
        updatedModules[index].position = [
          object.position.x,
          object.position.y,
          object.position.z,
        ];
        setModules(updatedModules);
      }

      // Включаем OrbitControls обратно
      if (orbitControlsRef.current) {
        orbitControlsRef.current.enabled = true;
      }
    });

    dragControlsRef.current = controls;

    return () => controls.dispose(); // Удаляем контроллер при размонтировании
  }, [modules, roomDimensions, camera, gl, orbitControlsRef]);

  return null;
};

export default DragManager;

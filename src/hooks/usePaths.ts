import { Level } from '@/types';
import { calculateCoordinates } from '@/utils/calculateCoordinates';
import { createPath } from '@/utils/connectors';
import { useEffect, useState, RefObject } from 'react';

const usePaths = (
  levels: Level[],
  activeLevel: number,
  containerRef: RefObject<HTMLDivElement>,
  pathClassName?: string,
  activePathClassName?: string,
  activeBackPathClassName?: string,
) => {
  const [path, setPath] = useState<JSX.Element>();

  useEffect(() => {
    const updatePaths = () => {
      if (!containerRef.current) return;
      const { offsetWidth, offsetHeight } = containerRef.current;
      const coordinates = levels.map((level) =>
          calculateCoordinates(level.position, offsetWidth, offsetHeight));

      const newPath = createPath(
        coordinates,
        activeLevel,
        {
          pathClassName,
          activePathClassName,
          activeBackPathClassName,
        }
      );

      setPath(newPath);
    };

    updatePaths();
    window.addEventListener('resize', updatePaths);

    return () => {
      window.removeEventListener('resize', updatePaths);
    };
  }, [activeLevel, containerRef, levels, pathClassName, activePathClassName, activeBackPathClassName]);

  return path;
};

export default usePaths;

import { useState, useEffect } from "react";

/**
 * @typedef {Object} MousePosition
 * @property {number} x - X Coordinate of the mouse
 * @property {number} y - Y Coordinate of the mouse.
 */

/**
 * Hook to return an object with current coordinates of mouse pointer.
 * @return {MousePosition} Object containing the coordinates of the mouse pointer.
 */
export default function useMousePosition() {
  const [coordinates, setCoordinates] = useState({});
  useEffect(() => {
    const eventHandler = (e) => {
      // Event listener to track the mouse location.
      const mousePosition = {
        x: e.clientX,
        y: e.clientY,
      };

      setCoordinates(mousePosition);
    };
    window.addEventListener("mousemove", eventHandler);
    return () => {
      window.removeEventListener("mousemove", eventHandler);
    };
  }, []);

  return coordinates;
}

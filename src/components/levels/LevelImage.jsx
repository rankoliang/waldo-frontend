import { useState, useRef, useEffect } from 'react';
import styles from './levels.module.css';

const LevelImage = ({ src, alt, handleClick, setMinScale, setTransform }) => {
  const [clickStart, setClickStart] = useState(null);
  const onDismountRef = useRef();

  useEffect(() => {
    return () => {
      const onDismount = onDismountRef.current;

      if (onDismount) {
        onDismount();
      }
    };
  }, []);

  const handleMouseDown = ({ nativeEvent }) => {
    const { clientX, clientY } = nativeEvent;
    nativeEvent.preventDefault();

    setClickStart({ clientX, clientY });
  };

  const handleMouseUp = (event) => {
    const {
      nativeEvent: { clientX, clientY },
    } = event;

    if (!clickStart) return;

    const distanceTraveled = Math.sqrt(
      (clickStart.clientX - clientX) ** 2 + (clickStart.clientY - clientY) ** 2
    );

    // Does not handle click if the mouse was used to drag
    if (distanceTraveled < 10) {
      handleClick(event);
    }

    setClickStart(null);
  };

  const updateDimensions = (component, { width, height }) => {
    component.style.setProperty('--image-width', `${width}px`);
    component.style.setProperty('--image-height', `${height}px`);
  };

  const createUpdateMinScale = (wrapper, { width, height }) => () => {
    // Fits the image so that there is no white space via the wrapper
    const minScale = Math.max(
      wrapper.clientHeight / height,
      wrapper.clientWidth / width
    );

    setMinScale(minScale);

    setTransform(0, 0, minScale, 0);

    return minScale;
  };

  const addResizeListeners = (callback) => {
    callback();

    window.addEventListener('resize', callback);

    onDismountRef.current = () => {
      window.removeEventListener('resize', callback);
    };
  };

  const handleOnLoad = ({
    target: {
      naturalHeight: height,
      naturalWidth: width,
      parentElement: { parentElement: transformWrapper },
    },
  }) => {
    setTimeout(() => {
      updateDimensions(transformWrapper, { width, height });

      const updateMinScale = createUpdateMinScale(transformWrapper, {
        width,
        height,
      });

      addResizeListeners(updateMinScale);
    }, 20);
  };

  return (
    <img
      className={styles['level-image']}
      src={src}
      alt={alt}
      onLoad={handleOnLoad}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      draggable={false}
    />
  );
};

export default LevelImage;

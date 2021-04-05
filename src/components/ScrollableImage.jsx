import { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import CharactersInterface from './CharactersInterface';
import CharacterSelectMenu from './CharacterSelectMenu';

const ScrollableImage = ({
  src,
  alt,
  children,
  setModalShow,
  handleClick,
  setError,
  ...props
}) => {
  const [minScale, setMinScale] = useState(undefined);
  const [clickStart, setClickStart] = useState(null);
  const [onDismount, setOnDismount] = useState(() => {});

  useEffect(() => onDismount, [onDismount]);

  const handleMouseDown = ({ nativeEvent: { clientX, clientY } }) => {
    setClickStart({ clientX, clientY });
  };

  const handleMouseUp = (event) => {
    const {
      nativeEvent: { clientX, clientY },
    } = event;

    const distanceTraveled = Math.sqrt(
      (clickStart.clientX - clientX) ** 2 + (clickStart.clientY - clientY) ** 2
    );

    if (distanceTraveled < 10) {
      handleClick(event);
    }

    setClickStart(null);
  };

  return (
    <TransformWrapper
      wheel={{ step: 175 }}
      options={{ minScale, centerContent: false }}
      doubleClick={{ disabled: true }}
      pan={{ paddingSize: 3 }}
    >
      {({ scale, zoomIn, zoomOut, setTransform }) => (
        <>
          <TransformComponent>
            <img
              className="level-image"
              src={src}
              alt={alt}
              onLoad={({
                target: {
                  naturalHeight: height,
                  naturalWidth: width,
                  parentElement: { parentElement: transformWrapper },
                },
              }) => {
                setTimeout(() => {
                  transformWrapper.style.setProperty(
                    '--image-width',
                    `${width}px`
                  );

                  transformWrapper.style.setProperty(
                    '--image-height',
                    `${height}px`
                  );

                  const updateMinScale = () => {
                    const mScale = Math.max(
                      transformWrapper.clientHeight / height,
                      transformWrapper.clientWidth / width
                    );

                    setMinScale(mScale);

                    setTransform(0, 0, mScale, 0);

                    return mScale;
                  };

                  updateMinScale();

                  const resizeListener = window.addEventListener(
                    'resize',
                    updateMinScale
                  );

                  setOnDismount(() => {
                    window.removeEventListener('resize', resizeListener);
                  });
                }, 20);
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              {...props}
            />
            {children}
            <CharacterSelectMenu setError={setError} scale={scale} />
          </TransformComponent>
          <CharactersInterface
            zoomIn={zoomIn}
            zoomOut={zoomOut}
            setModalShow={setModalShow}
          />
        </>
      )}
    </TransformWrapper>
  );
};

export default ScrollableImage;

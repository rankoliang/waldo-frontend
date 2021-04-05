import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import CharactersInterface from '../characters/CharactersInterface';
import CharacterSelectMenu from '../characters/CharacterSelectMenu';
import LevelImage from './LevelImage';

const TransformableImage = ({
  src,
  alt,
  children,
  setModalShow,
  handleClick,
  setError,
}) => {
  const [minScale, setMinScale] = useState(undefined);

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
            <LevelImage
              src={src}
              alt={alt}
              handleClick={handleClick}
              setMinScale={setMinScale}
              setTransform={setTransform}
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

export default TransformableImage;

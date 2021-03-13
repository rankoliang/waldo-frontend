import { useState, useRef, useEffect, useCallback } from 'react';

const useZoom = (height, width, wrapper) => {
  const [zoom, setZoom] = useState(1);

  const updateZoom = useCallback(() => {
    if (height === 0 || width === 0 || wrapper === null) return;

    const fullWidthZoom = wrapper.clientWidth / width;
    const fullHeightZoom = wrapper.clientHeight / height;
    setZoom(Math.max(fullWidthZoom, fullHeightZoom));
  }, [width, height, wrapper]);

  useEffect(updateZoom);

  useEffect(() => {
    window.addEventListener('resize', updateZoom);
  }, [updateZoom]);

  return zoom;
};

const ScrollableImage = ({ src, alt, ...props }) => {
  const wrapperEl = useRef(null);

  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const { height, width } = dimensions;
  const zoom = useZoom(height, width, wrapperEl.current);

  return (
    <div className="scrollable-wrapper" ref={wrapperEl}>
      <img
        style={{
          verticalAlign: 'bottom',
          minHeight: height,
          minWidth: width,
          zoom,
        }}
        src={src}
        alt={alt}
        onLoad={({ target }) => {
          setDimensions({
            height: target.naturalHeight,
            width: target.naturalWidth,
          });
        }}
        {...props}
      />
    </div>
  );
};

export default ScrollableImage;

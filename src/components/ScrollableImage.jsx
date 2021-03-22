import { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectZoom, zoomSet } from '../features/game/gameSlice';
import { SuccessMarkers } from './SuccessMarker';
import { FailureMarkers } from './FailureMarker';

const useZoom = (height, width, wrapper) => {
  const dispatch = useDispatch();
  const zoom = useSelector(selectZoom);

  const updateZoom = useCallback(() => {
    if (height === 0 || width === 0 || wrapper === null) return;

    const fullWidthZoom = wrapper.clientWidth / width;
    const fullHeightZoom = wrapper.clientHeight / height;

    dispatch(zoomSet(Math.max(fullWidthZoom, fullHeightZoom)));
  }, [width, height, wrapper]);

  useEffect(updateZoom);

  useEffect(() => {
    window.addEventListener('resize', updateZoom);
  }, [updateZoom]);

  return zoom;
};

const ScrollableImage = ({ src, alt, children, ...props }) => {
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
      <SuccessMarkers zoom={zoom} />
      <FailureMarkers zoom={zoom} />
      {children}
    </div>
  );
};

export default ScrollableImage;

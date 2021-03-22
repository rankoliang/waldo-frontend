import { nanoid } from '@reduxjs/toolkit';
import { ImCross } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { selectFailedSearches } from '../features/searches/searchesSlice';
import { useZoom } from '../features/game/gameHooks.js';

const FailureMarker = ({ coord: { x, y }, height = 75, width = 75 }) => {
  const zoom = useZoom();
  return (
    <ImCross
      className="marker marker-failure"
      style={{
        top: `${(y - height / 2) * zoom}px`,
        left: `${(x - width / 2) * zoom}px`,
        height: `${height * zoom}px`,
        width: `${width * zoom}px`,
      }}
    />
  );
};

export const FailureMarkers = ({ zoom }) => {
  const failures = useSelector(selectFailedSearches);

  return failures.map((coord) => (
    <FailureMarker coord={coord} key={nanoid()} zoom={zoom} />
  ));
};

export default FailureMarker;

import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { CgSearchFound } from 'react-icons/cg';
import { selectSuccessfulSearches } from '../features/searches/searchesSlice';
import { useZoom } from '../features/game/gameHooks.js';

const SuccessMarker = ({ coord: { x, y }, height = 100, width = 100 }) => {
  const zoom = useZoom();

  return (
    <CgSearchFound
      className="marker marker-success"
      style={{
        top: `${(y - height / 2) * zoom}px`,
        left: `${(x - width / 2) * zoom}px`,
        height: `${height * zoom}px`,
        width: `${width * zoom}px`,
      }}
    />
  );
};

export default SuccessMarker;

export const SuccessMarkers = ({ zoom }) => {
  const successes = useSelector(selectSuccessfulSearches);

  return successes.map((coord) => (
    <SuccessMarker coord={coord} key={nanoid()} zoom={zoom} />
  ));
};

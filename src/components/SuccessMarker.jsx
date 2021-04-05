import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { CgSearchFound } from 'react-icons/cg';
import { selectSuccessfulSearches } from '../features/searches/searchesSlice';

const SuccessMarker = ({ coord: { x, y }, height = 100, width = 100 }) => {
  return (
    <CgSearchFound
      className="marker marker-success"
      style={{
        top: `${y - height / 2}px`,
        left: `${x - width / 2}px`,
        height: `${height}px`,
        width: `${width}px`,
      }}
    />
  );
};

export default SuccessMarker;

export const SuccessMarkers = () => {
  const successes = useSelector(selectSuccessfulSearches);

  return successes.map((coord) => (
    <SuccessMarker coord={coord} key={nanoid()} />
  ));
};

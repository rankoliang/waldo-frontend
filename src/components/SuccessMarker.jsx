import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { CgSearchFound } from 'react-icons/cg';
import { selectSuccessfulSearches } from '../features/searches/searchesSlice';

const SuccessMarker = ({
  coord: { x, y },
  height = 125,
  width = 125,
  zoom,
}) => {
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

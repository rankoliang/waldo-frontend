import { nanoid } from '@reduxjs/toolkit';
import { ImCross } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { selectFailedSearches } from '../features/searches/searchesSlice';
import styles from './markers.module.css';

const FailureMarker = ({ coord: { x, y }, height = 75, width = 75 }) => {
  return (
    <ImCross
      className={`${styles.marker} ${styles['marker-failure']}`}
      style={{
        top: `${y - height / 2}px`,
        left: `${x - width / 2}px`,
        height: `${height}px`,
        width: `${width}px`,
      }}
    />
  );
};

export const FailureMarkers = () => {
  const failures = useSelector(selectFailedSearches);

  return failures.map((coord) => (
    <FailureMarker coord={coord} key={nanoid()} />
  ));
};

export default FailureMarker;

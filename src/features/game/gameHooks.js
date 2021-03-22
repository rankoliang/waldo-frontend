import { useSelector } from 'react-redux';
import { selectZoom } from './gameSlice';

export const useZoom = () => {
  return useSelector(selectZoom);
};

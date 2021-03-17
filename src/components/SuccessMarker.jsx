import { CgSearchFound } from 'react-icons/cg';

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

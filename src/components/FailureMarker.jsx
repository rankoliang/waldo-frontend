import { ImCross } from 'react-icons/im';

const FailureMarker = ({ coord: { x, y }, height = 75, width = 75, zoom }) => {
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

export default FailureMarker;

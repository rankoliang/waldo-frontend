import { useState } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import GameNavbar from './components/GameNavbar';
import waldoPicture from './images/Waldo.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <GameNavbar />
      <ScrollableImage
        src={waldoPicture}
        alt="Find Waldo!"
        zoom="0.6"
      />
    </div>
  );
}

const ScrollableImage = ({ src, alt, zoom, ...props }) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const { height, width } = dimensions;

  return (
    <div className="scrollable-wrapper">
      <img
        style={{
          minHeight: height,
          minWidth: width,
          verticalAlign: 'bottom',
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

export default App;

import 'react-bulma-components/dist/react-bulma-components.min.css';
import GameNavbar from './components/GameNavbar';
import waldoPicture from './images/Waldo.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <GameNavbar />
      <ScrollableImage
        className="waldo-picture"
        src={waldoPicture}
        alt="Find Waldo!"
      />
    </div>
  );
}

const ScrollableImage = ({ src, alt, ismap, ...props }) => {
  return (
    <div className="scrollable-wrapper">
      <img src={src} alt={alt} ismap={ismap} {...props} />
    </div>
  );
};

export default App;

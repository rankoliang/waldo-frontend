import 'react-bulma-components/dist/react-bulma-components.min.css';
import GameNavbar from './components/GameNavbar';
import ScrollableImage from './components/ScrollableImage';
import waldoPicture from './images/Waldo.jpg';
import areas from './areas/areas';
import './App.css';

function App() {
  return (
    <div className="App">
      <GameNavbar />
      <ScrollableImage
        src={waldoPicture}
        alt="Find Waldo!"
        onClick={({ nativeEvent: { offsetX, offsetY }, target }) => {
          const { zoom } = target.style;

          const x = offsetX / zoom;
          const y = offsetY / zoom;
          const coords = { x, y };
          console.log(coords);

          console.log(areas.containing(x, y));
        }}
      />
    </div>
  );
}

export default App;

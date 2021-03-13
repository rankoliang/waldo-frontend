import 'react-bulma-components/dist/react-bulma-components.min.css';
import GameNavbar from './components/GameNavbar';
import ScrollableImage from './components/ScrollableImage';
import waldoPicture from './images/Waldo.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <GameNavbar />
      <ScrollableImage src={waldoPicture} alt="Find Waldo!" />
    </div>
  );
}

export default App;

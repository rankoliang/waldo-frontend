import 'react-bulma-components/dist/react-bulma-components.min.css';
import GameNavbar from './components/GameNavbar';
import GameCanvas from './components/GameCanvas';
import './App.css';

function App() {
  return (
    <div className="App">
      <GameNavbar />
      <GameCanvas />
    </div>
  );
}

export default App;

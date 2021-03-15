import { useEffect, useState } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import GameNavbar from './components/GameNavbar';
import Level from './components/Level';
import { fetchLevels } from './helpers';
import './App.css';

function App() {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchLevels().then((levels) => {
      setLevels(levels);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <GameNavbar />
      {levels.slice(0, 1).map((level) => (
        <Level level={level} loading={loading} key={level.id} />
      ))}
    </div>
  );
}

export default App;

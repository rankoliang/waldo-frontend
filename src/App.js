import 'react-bulma-components/dist/react-bulma-components.min.css';
import SiteNavbar from './components/SiteNavbar';
import Levels from './components/Levels';
import './App.css';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import { fetchLevel } from './helpers';
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

const Routes = () => {
  return (
    <BrowserRouter>
      <SiteNavbar />
      <Switch>
        <Route exact path="/">
          <Levels />
        </Route>
        <Route exact path="/levels">
          <Levels />
        </Route>
        <Route path="/levels/:levelId">
          <Level />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const Level = () => {
  const { levelId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [level, setLevel] = useState(null);

  useEffect(() => {
    fetchLevel(levelId)
      .then(({ level }) => setLevel(level))
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (error) {
    return <p>An error has occured</p>;
  } else if (loading) {
    return <p>loading...</p>;
  } else {
    return <p>Level: {level.title}</p>;
  }
};

export default App;

import 'react-bulma-components/dist/react-bulma-components.min.css';
import Game from './components/Game';
import GameNavbar from './components/GameNavbar';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Button } from 'react-bulma-components';

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
      <GameNavbar />
      <Switch>
        <Route exact path="/">
          <Levels />
        </Route>
        <Route exact path="/levels">
          <Levels />
        </Route>
        <Route exact path="/level">
          <Game />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const Levels = () => {
  return (
    <Button renderAs={Link} to="/level">
      Game
    </Button>
  );
};

export default App;

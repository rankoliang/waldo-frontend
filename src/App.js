import 'react-bulma-components/dist/react-bulma-components.min.css';
import SiteNavbar from './components/SiteNavbar';
import Levels from './components/levels/index';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Level } from './components/levels/Level';
import Leaderboard from './components/leaderboard/index';

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
        <Route exact path="/levels/:levelId">
          <Level />
        </Route>
        <Route exact path="/levels/:levelId/leaderboard">
          <Leaderboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

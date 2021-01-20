import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import HomeScreen from "../src/Screens/HomeScreen";
import UserProfileScreen from "../src/Screens/UserProfileScreen";
import ReposScreen from "../src/Screens/ReposScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path='/profile/:login'>
            <UserProfileScreen />
          </Route>
          <Route path='/repo/'>
            <ReposScreen />
          </Route>
          <Route>
            <HomeScreen/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

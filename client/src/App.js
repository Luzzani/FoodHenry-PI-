import "./App.css";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RecipeCreate from "./components/RecipeCreate";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/createRecipe" component={RecipeCreate} />
      </Switch>
    </>
  );
}

export default App;

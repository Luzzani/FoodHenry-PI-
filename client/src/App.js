import "./App.css";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RecipeCreate from "./components/RecipeCreate";
import RecipeDetail from "./components/RecipeDetail";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/createRecipe" component={RecipeCreate} />
        <Route exact path="/detail/:id" component={RecipeDetail} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;

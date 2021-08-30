import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import ErrorPage from "./pages/error";
import Quiz from "./pages/quiz";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/quiz">
          <Quiz />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

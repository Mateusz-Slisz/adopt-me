import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { StrictMode, useState } from "react";
import { ThemeContext, Theme } from "./ThemeContext";
import ReactDOM from "react-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";

const App = () => {
  const [theme, setTheme] = useState(Theme.DarkBlue);

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      <div>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

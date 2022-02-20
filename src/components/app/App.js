import AppHeader from "../appHeader/AppHeader";
import ComicsPage from "../pages/ComicsPage";
import MainPage from "../pages/MainPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Page404 from "../pages/Page404";
import SingleComicPage from "../pages/SingleComicPage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/comics">
              <ComicsPage />
            </Route>
            <Route exact path="/comics/:comicId">
              <SingleComicPage />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;

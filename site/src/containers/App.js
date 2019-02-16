import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "swirl-layout";
import Home from "../components/Home";
import Photo from "../components/Photo";

class App extends React.Component {
  render() {
    const links = [
      { path: "/", title: "home", key: 1 },
      { path: "/photo", title: "photo", key: 2 }
    ];
    const colour = "#7aa7c1"

    return (
      <Router>
        <main>
          <Layout links={links} colour={colour}/>
          <div style={{'background':colour}}>
            <Switch>
              <Route exact path="/" colour={colour} component={Home} />
              <Route exact path="/photo" colour={colour} component={Photo} />
            </Switch>
          </div>
        </main>
      </Router>
    );
  }
}

export default App

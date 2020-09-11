import React from 'react';
import './App.css';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import PostApplication from './PostApplication/PostApplication';
import AllApplications from './AllApplications/AllApplications';
import Page404 from './Page404/Page404';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <span className="navbar-brand">Applications</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" exact={true} activeClassName='active' to='/'>Post</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact={true} activeClassName='active' to='/applications'>View All</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/" exact component={PostApplication} />
          <Route path="/applications" component={AllApplications} />
          <Route component={Page404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Partylist from './components/partyList/Partylist';
import Login from './components/Login';
import Register from './components/Register';
import isAuthenticated from './services/isauthenticated.service';


function App() {

  const loggedIn = isAuthenticated();

  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      {!loggedIn ? <Redirect to="/login" /> :
        <>
          <Route path="/partylist" component={Partylist} />
        </>}
    </Router>
  );
}

export default App;

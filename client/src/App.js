import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Partylist from './components/partyList/Partylist';
// import Login from './components/Login';
import isAuthenticated from './services/isauthenticated.service';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/header/Header';
import Menulist from './components/menuList/Menulist';

function App() {

  const loggedIn = isAuthenticated();

  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      {!loggedIn ? <Redirect to="/login" /> :
        <>
          <Header />
          <Route path="/menulist" component={Menulist} />
          <Route path="/partylist" component={Partylist} />
        </>}
    </Router>
  );
}

export default App;

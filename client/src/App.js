import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import Partylist from './components/partyList/Partylist';
// import Login from './components/Login';
import isAuthenticated from './services/isauthenticated.service';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/header/Header';
import Companylist from './components/companyList/Companylist';
import Menulist from './components/menuList/Menulist';
import Partydetail from './components/partyDetail/Partydetail';

function App() {

  const partyState = useState();

  const loggedIn = isAuthenticated();


  const location = useLocation().pathname;

  // console.log(location.pathname);

  return (


    <>
      {
        loggedIn && (location === '/' || location === '/login') ?
          <Redirect to="/companylist" /> : null
      }
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      {!loggedIn ? <Redirect to="/login" /> :
        <>
          <Header />
          <Route path="/companylist" component={Companylist} />
          <Route path="/menulist" component={Menulist} />
          <Route path="/partylist" render={(props) => (<Partylist {...props} partyState={partyState} />)} />
          <Route path="/partydetail" render={(props) => (<Partydetail {...props} partyState={partyState} />)} />
        </>}
    </>
  );
}

export default App;

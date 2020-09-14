import React, { useState } from 'react';
import './App.css';
import {
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
import Dailyreport from './components/dailyReport/Dailyreport';
import Beamstock from './components/beamStock/Beamstock';
import WorpingMeter from './components/worpingMeter/WorpingMeter';
import StockReport from './components/stockReport/StockReport';
// import Partysummary from './components/partySummary/Partysummary';

function App() {
  const partyState = useState();
  const loggedIn = isAuthenticated();
  const location = useLocation().pathname;

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
          {/* <Route path="/partysummary" render={(props) => (<Partysummary {...props} partyState={partyState} />)} /> */}
          <Route path="/partydetail" render={(props) => (<Partydetail {...props} partyState={partyState} />)} />
          <Route path="/dailyreport" component={Dailyreport} />
          <Route path="/beamstock" component={Beamstock} />
          <Route path="/warpingmeter" component={WorpingMeter} />
          <Route path="/stockreport" component={StockReport} />
        </>}
    </>
  );
}

export default App;

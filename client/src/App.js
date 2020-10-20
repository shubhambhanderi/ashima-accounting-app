import React, { useState } from 'react';
import { lazy, Suspense } from "react";
import './App.css';
import {
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import isAuthenticated from './services/isauthenticated.service';
import Companylist from './components/companyList/Companylist';
import Menulist from './components/menuList/Menulist';
const Partylist = lazy(() => import('./components/partyList/Partylist'));
// const Companylist = lazy(() => import('./components/companyList/Companylist'));
const Header = lazy(() => import('./components/header/Header'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register.js'));
// const Menulist = lazy(() => import('./components/menuList/Menulist'));
const Partydetail = lazy(() => import('./components/partyDetail/Partydetail'));
const Dailyreport = lazy(() => import('./components/dailyReport/Dailyreport'));
const Beamstock = lazy(() => import('./components/beamStock/Beamstock'));
const WorpingMeter = lazy(() => import('./components/worpingMeter/WorpingMeter'));
const StockReport = lazy(() => import('./components/stockReport/StockReport'));
const Report = lazy(() => import('./components/report/Report'));
// import Partysummary from './components/partySummary/Partysummary';

function App() {
  const partyState = useState();
  const loggedIn = isAuthenticated();
  const location = useLocation().pathname;

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          <Route path="/report" component={Report} />
        </>}
    </Suspense>
  );
}

export default App;

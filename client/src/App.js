import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Partylist from './components/partyList/Partylist';
import Login from './components/Login';
import Register from './components/Register';


function App() {

  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/partylist" component={Partylist} />
    </Router>

  );
}

export default App;

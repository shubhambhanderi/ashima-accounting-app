import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Partylist from './components/partyList/Partylist';

function App() {

  return (
    <Router>
      <Route exact path="/partylist" component={Partylist} />
    </Router>

  );
}

export default App;

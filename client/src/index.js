import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./assets/css/nucleo-icons.css";
import "./assets/css/blk-design-system-react.css";
// import "./assets/demo/demo.css";
import {
  BrowserRouter as Router, Route
} from "react-router-dom";
import Pdfgenerator from './components/pdfGenerator/Pdfgenerator';
import { PDFViewer } from '@react-pdf/renderer';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

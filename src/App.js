import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Sidebar from './Sidebar'
import Header from './Header'
import Body from './Body'
import CreateClient from './CreateClient'
import { selectCreateClientIsOpen } from './features/clientSlice'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './firebase';
import Client from './Client';


function App() {
  const createClientIsOpen = useSelector(selectCreateClientIsOpen)


  return (
    <Router>
      <div className="app">
        <Sidebar />

        <div className="app__body">
          <Header />
          <Switch>
            <Route path="/client">
              <Client />
            </Route>
            <Route path="/">
              <Client />
            </Route>
          </Switch>
        </div>

        {createClientIsOpen && <CreateClient />}
      </div>
    </Router>
  );
}

export default App;

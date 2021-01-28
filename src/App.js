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
// import CreateClient from './CreateClient'
import AddEditClient from './AddEditClient'
import { selectCreateClientIsOpen } from './features/clientSlice'
import { selectCreatePartIsOpen } from './features/partSlice'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './firebase';
import Client from './Client';
import Part from './Part';
import AddEditPart from './AddEditPart'


function App() {
  const createClientIsOpen = useSelector(selectCreateClientIsOpen)
  const createPartIsOpen = useSelector(selectCreatePartIsOpen)


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
              <Part />
            </Route>
          </Switch>
        </div>

        {createClientIsOpen && <AddEditClient />}
        {createPartIsOpen && <AddEditPart />}
      </div>
    </Router>
  );
}

export default App;

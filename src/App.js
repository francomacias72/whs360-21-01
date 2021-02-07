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
import { selectCreateWhsIsOpen } from './features/whsSlice'
import { selectCreateZoneIsOpen } from './features/zoneSlice'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './firebase';
import Client from './Client';
// import Part from './Part2';
import AddEditPart from './AddEditPart'
import WhsZone from './WhsZone';
import ClientPart from './ClientPart';
import AddEditWhs from './AddEditWhs';
import AddEditZone from './AddEditZone';
import Receipts from './Receipts';


function App() {
  const createClientIsOpen = useSelector(selectCreateClientIsOpen)
  const createPartIsOpen = useSelector(selectCreatePartIsOpen)
  const createWhsIsOpen = useSelector(selectCreateWhsIsOpen)
  const createZoneIsOpen = useSelector(selectCreateZoneIsOpen)


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
            <Route path="/clientes">
              <ClientPart />
            </Route>
            <Route path="/bodegas">
              <WhsZone />
            </Route>
            <Route path="/recibos">
              <Receipts />
            </Route>
            <Route path="/">
              <ClientPart />
            </Route>
          </Switch>
        </div>

        {createClientIsOpen && <AddEditClient />}
        {createPartIsOpen && <AddEditPart />}
        {createWhsIsOpen && <AddEditWhs />}
        {createZoneIsOpen && <AddEditZone />}
      </div>
    </Router>
  );
}

export default App;

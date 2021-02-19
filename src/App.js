import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Sidebar from './Sidebar'
import Header from './Header'
// import CreateClient from './CreateClient'
import AddEditClient from './AddEditClient'
import { selectCreateClientIsOpen, fillListClients, selectListClients } from './features/clientSlice'
import { selectCreatePartIsOpen } from './features/partSlice'
import { selectCreateWhsIsOpen } from './features/whsSlice'
import { selectCreateZoneIsOpen } from './features/zoneSlice'
import { useDispatch, useSelector } from 'react-redux'
// import firebase from 'firebase'
import { auth, db } from './firebase';
import Client from './Client';
// import Part from './Part2';
import AddEditPart from './AddEditPart'
import WhsZone from './WhsZone';
import ClientPart from './ClientPart';
import AddEditWhs from './AddEditWhs';
import AddEditZone from './AddEditZone';
import Receipts from './Receipts';
import Etiqueta from './Etiqueta';
import { login, selectUser } from './features/userSlice';
import Login from './Login'
import Dashboard from './components/Dashboard';
import ListOrders from './orders/ListOrders';
import Table from './orders/Table';
import LoadOrders from './orders/LoadOrders';
import AdminHome from './admin/AdminHome';


function App() {
  const createClientIsOpen = useSelector(selectCreateClientIsOpen)
  const createPartIsOpen = useSelector(selectCreatePartIsOpen)
  const createWhsIsOpen = useSelector(selectCreateWhsIsOpen)
  const createZoneIsOpen = useSelector(selectCreateZoneIsOpen)
  const [clients, setClients] = useState([])
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  // const createListClients = useSelector()

  useEffect(() => {
    //**************** */
    db.collection("clients")
      .orderBy('clientName', 'asc')
      .get()
      .then(snapshot =>
        dispatch(fillListClients(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
        )))
      .catch((error) => {
        console.log("Error getting clients: ", error);
      })
    auth.onAuthStateChanged(user => {
      if (user) {
        //the user is logged in
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        }))
      }
      else {
        //user is logged out
      }
    })
  }, [])

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
          <div className="app">
            <Sidebar />
            <div className="app__body">
              <Header />
              <Switch>
                <Route path="/loadorders">
                  <LoadOrders />
                </Route>
                <Route path="/orders">
                  <ListOrders />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/admin">
                  <AdminHome />
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
                <Route path="/etiqueta">
                  <Etiqueta />
                </Route>
                <Route path="/">
                  <Dashboard />
                </Route>
              </Switch>
            </div>

            {createClientIsOpen && <AddEditClient />}
            {createPartIsOpen && <AddEditPart />}
            {createWhsIsOpen && <AddEditWhs />}
            {createZoneIsOpen && <AddEditZone />}
          </div>
        )}
    </Router>
  );
}

export default App;

// ReactDOM.render(<Table />, document.getElementById('react-div'));

import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Header.css'
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from "@material-ui/icons/Notifications"
import AppsIcon from '@material-ui/icons/Apps';
import { useSelector, useDispatch } from "react-redux"
import { logout, selectUser } from './features/userSlice';
import { selectOpenClient, selectListClients, fillListClients } from './features/clientSlice'
import { db } from './firebase';
import { openCreatePart, changeToAddP, fillListParts, selectListParts } from './features/partSlice'
import { auth } from './firebase'
import { fillListWhss } from './features/whsSlice';
import { fillListZones } from './features/zoneSlice';


function Header() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const selectedClient = useSelector(selectOpenClient)
    const [clients, setClients] = useState([])
    const [parts, setParts] = useState([])
    const [warehouses, setWarehouses] = useState([])
    const [zones, setZones] = useState([])
    // const [filterP, setFilterP] = useState('')    

    useEffect(() => {
        alert('pido datos HEADER')
        db.collection('clients')
            .orderBy('clientName', 'asc')
            .onSnapshot(snapshot =>
                setClients(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
        db.collection('parts')
            .orderBy('partName', 'asc')
            .onSnapshot(snapshot =>
                setParts(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
        db.collection('warehouses')
            .orderBy('whsName', 'asc')
            .onSnapshot(snapshot =>
                setWarehouses(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
        db.collection('zones')
            .orderBy('zoneName', 'asc')
            .onSnapshot(snapshot =>
                setZones(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
    }, [])
    dispatch(fillListClients(clients))
    dispatch(fillListParts(parts))
    dispatch(fillListWhss(warehouses))
    dispatch(fillListZones(zones))

    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(logout())
        })
    }


    return (
        <div className='header'>
            <div className="headerTitle">
                <IconButton>
                    <MenuIcon className="header__iconColor" />
                </IconButton>
                <h1>Sustaita Forwarding L.L.C.</h1>
            </div>
            {/* <div className="headerSearch">
                <input type="text" placeholder="Buscar..." />
            </div> */}
            <div className="headerRight">
                <IconButton>
                    <AppsIcon className="header__iconColor" />
                </IconButton>
                <IconButton>
                    <NotificationsIcon className="header__iconColor" />
                </IconButton>
                <Avatar src={user?.photoUrl} className="header__avatar" onClick={signOut} />
            </div>
        </div>
    )
}

export default Header

import { Avatar, Checkbox, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Header.css'
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from "@material-ui/icons/Notifications"
import AppsIcon from '@material-ui/icons/Apps';
import { useSelector, useDispatch } from "react-redux"
import { logout, selectUser } from './features/userSlice';
import { selectOpenClient, selectListClients, fillListClients, selectClientMain } from './features/clientSlice'
import { db } from './firebase';
import { openCreatePart, changeToAddP, fillListParts, selectListParts } from './features/partSlice'
import { auth } from './firebase'
import { fillListWhss, selectWhs, selectWhsMain } from './features/whsSlice';
import { fillListZones, selectZone, selectZoneMain } from './features/zoneSlice';
import { fillListCarriers } from './features/carrierSlice';
import { fillListSuppliers } from './features/supplierSlice';
import { fillListUoms } from './features/uomSlice';


function Header() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    // const [filterZ, setFilterZ] = useState([])
    // const [filterP, setFilterP] = useState([])
    // const selectedClient = useSelector(selectOpenClient)
    const [clients, setClients] = useState([])
    const [parts, setParts] = useState([])
    const [warehouses, setWarehouses] = useState([])
    const [zones, setZones] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [carriers, setCarriers] = useState([])
    const [uoms, setUOMs] = useState([])


    useEffect(() => {
        // alert('pido datos HEADER')
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
        db.collection('suppliers')
            .orderBy('name', 'asc')
            .onSnapshot(snapshot =>
                setSuppliers(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
        db.collection('carriers')
            .orderBy('name', 'asc')
            .onSnapshot(snapshot =>
                setCarriers(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
        db.collection('uoms')
            .orderBy('name', 'asc')
            .onSnapshot(snapshot =>
                setUOMs(
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
    dispatch(fillListSuppliers(suppliers))
    dispatch(fillListCarriers(carriers))
    dispatch(fillListUoms(uoms))

    function bodegaChange(e) {
        // setFilterZ(e.target.value)
        selectChange(e)
        dispatch(selectWhsMain(e.target.value))
        // dispatch(selectWhs())
    }
    // function zoneChange(e) {
    //     setFilterZ(e.target.value)
    //     selectChange(e)
    //     dispatch(selectZoneMain(e.target.value))
    //     dispatch(selectZone())
    // }
    function clientChange(e) {
        // setFilterP(e.target.value)
        selectChange(e)
        dispatch(selectClientMain(e.target.value))
    }
    function selectChange(e) {
        document.getElementById(e.target.id).classList.add('borderGreen')
    }

    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(logout())
        })
    }


    return (
        <div className='header'>
            <div className="headerTitle">
                <div className="combo">
                    <div className="checkError">
                        <select id="selectBodega" name="bodega" onChange={bodegaChange}>
                            <option value="" disabled selected > Elegir Bodega</option>
                            <option value="" > All </option>
                            {warehouses.map(({ id, data: { whsName, }
                            }) => (
                                <option value={id}>{whsName.substr(0, 25)}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* <div className="combo">
                    <select id="selectZona" name="zona" onChange={selectChange}>
                        <option value="" disabled selected > Elegir Zona</option>
                        <option value="" > All </option>
                        {zones.filter(c => c.data.whsId.includes(filterZ)).map(({ id, data: { zoneName, }
                        }) => (
                            <option value={zoneName}>{zoneName.substr(0, 25)}</option>
                        ))}
                    </select>
                </div> */}
                <div className="combo">
                    <select id="selectCliente" name="cliente" onChange={clientChange}>
                        <option value="" disabled selected > Elegir Cliente</option>
                        <option value="" > All </option>
                        {clients.map(({ id, data: { clientName, }
                        }) => (
                            <option value={id}>{clientName.substr(0, 25) + "..."}</option>
                        ))}                    </select>
                </div>
                {/* <div className="combo">
                    <select id="selectParte" onChange={selectChange}
                        name="parte"
                    // ref={register({ required: true })}
                    >
                        <option value="" disabled selected > Elegir Parte</option>
                        {parts.filter(c => c.data.clientId.includes(filterP)).map(({ id, data: { partName, }
                        }) => (
                            <option value={partName}>{partName?.substr(0, 25)}</option>
                        ))}
                    </select>
                </div> */}
                <div className="combo">
                    <Checkbox
                        style={{ color: 'white' }}
                        defaultChecked
                    // value={true}
                    />
                    <p style={{ color: 'lightgrey' }}>Active</p>
                </div>
            </div>

            <div className="headerRight">
                <Avatar src={user?.photoUrl} className="header__avatar" onClick={signOut} />
            </div>
        </div >
    )
}

export default Header

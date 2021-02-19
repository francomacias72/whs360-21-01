import React from 'react'
import { useHistory } from "react-router-dom"
import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';
import { IconButton } from '@material-ui/core';
import './AdminHome.css'

function AdminHome() {
    const history = useHistory();
    const linkClients = () => {
        history.push('./clientes')
    }
    const linkWarehouses = () => {
        history.push('./bodegas')
    }
    return (
        <div className="adminHome">
            <h1>Admin Home</h1>
            <div className="adminHomeOption">
                <div className="adminOption" onClick={linkClients}>
                    <IconButton className="">
                        <div className="" >
                            <PersonIcon
                                className="optionIcon backColorGreen" />
                        </div>
                    </IconButton><p >Clientes y Partes</p>
                </div>
                <div className="adminOption" onClick={linkWarehouses}>
                    <IconButton className="">
                        <div className="" >
                            <StoreIcon
                                className="optionIcon backColorOrange" />
                        </div>
                    </IconButton><p >Bodegas y Locaciones</p>
                </div>
            </div>
        </div>
    )
}

export default AdminHome

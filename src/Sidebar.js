import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import logo from './360logo.png'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'; import SidebarOption from './SidebarOption'
import ReceiptIcon from '@material-ui/icons/Receipt';
import StoreIcon from '@material-ui/icons/Store';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { useHistory } from "react-router-dom"
import { db } from './firebase';
import { useDispatch, useSelector } from 'react-redux'
import { fillListClients } from './features/clientSlice'


function Sidebar() {
    const history = useHistory()


    return (
        <div className='sidebar'>
            <div class="sidebar__top">
                <h3 style={{ textAlign: "center" }}>Sustaita </h3>
                <h1 > Warehouse</h1>
                <img src={logo} alt="" />

            </div>
            <div className="sidebarOptions">
                <div onClick={() => history.push("/admin")}> <SidebarOption Icon={SupervisorAccountIcon} title="Admin" number={5} color={"#A53AB7"} /> </div>
                {/* <div onClick={() => history.push("/part")}><SidebarOption Icon={ViewHeadlineIcon} title="Partes" number={4} color={"#4caf50"} /></div> */}
                <div onClick={() => history.push("/bodegas")}><SidebarOption Icon={StoreIcon} title="Bodegas/Locaciones" number={2} color={"#fd7e14"} /></div>
                <SidebarOption Icon={AccountTreeIcon} title="Inventarios" number={2} color={"#6c757d"} />
                <div onClick={() => history.push("/recibos")}><SidebarOption Icon={ReceiptIcon} title="Recibos" number={25} color={"#17a2b8"} /></div>
                <div onClick={() => history.push("/orders")}><SidebarOption Icon={LocalShippingIcon} title="Orders" number={2} color={"#e83e8c"} /></div>
                <SidebarOption Icon={ImportExportIcon} title="Exportaciones" number={2} color={"#4caf50"} />
                <div onClick={() => history.push("/etiqueta")}><SidebarOption Icon={AssessmentIcon} title="Reportes" number={2} color={"#007bff"} /></div>
            </div>
        </div >
    )
}

export default Sidebar

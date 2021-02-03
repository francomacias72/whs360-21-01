import React from 'react'
import './Sidebar.css'
import logo from './360logo.png'
import PersonIcon from '@material-ui/icons/Person';
import SidebarOption from './SidebarOption'
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import ReceiptIcon from '@material-ui/icons/Receipt';
import StoreIcon from '@material-ui/icons/Store';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { useHistory } from "react-router-dom"



function Sidebar() {
    const history = useHistory()

    function alerta() {
        history.push("/client")
    }

    return (
        <div className='sidebar'>
            <div class="sidebar__top">
                <img src={logo} alt="" />
                <h1>WHS 360</h1>
            </div>
            <div className="sidebarOptions">
                <div onClick={() => history.push("/client")}> <SidebarOption Icon={PersonIcon} title="Clientes/Partes" number={5} color={"#A53AB7"} /> </div>
                {/* <div onClick={() => history.push("/part")}><SidebarOption Icon={ViewHeadlineIcon} title="Partes" number={4} color={"#4caf50"} /></div> */}
                <SidebarOption Icon={StoreIcon} title="Bodegas/Locaciones" number={2} color={"#fd7e14"} />
                <SidebarOption Icon={AccountTreeIcon} title="Inventarios" number={2} color={"#6c757d"} />
                <SidebarOption Icon={ReceiptIcon} title="Recibos" number={25} color={"#17a2b8"} />
                <SidebarOption Icon={LocalShippingIcon} title="Embarques" number={2} color={"#e83e8c"} />
                <SidebarOption Icon={ImportExportIcon} title="Exportaciones" number={2} color={"#4caf50"} />
                <SidebarOption Icon={AssessmentIcon} title="Reportes" number={2} color={"#007bff"} />
            </div>
        </div >
    )
}

export default Sidebar

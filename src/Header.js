import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'
import './Header.css'
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from "@material-ui/icons/Notifications"
import AppsIcon from '@material-ui/icons/Apps';
import { useSelector, useDispatch } from "react-redux"
import { logout, selectUser } from './features/userSlice';
import { auth } from './firebase'

function Header() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

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

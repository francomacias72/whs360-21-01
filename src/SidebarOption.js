import React from 'react'
import './SidebarOption.css'

function SidebarOption({ Icon, title, number, color }) {

    return (
        <div className={`sidebarOption  `}
            style={{
                color: 'white',
                backgroundColor: `${color}`,
            }}>
            <Icon />
            <h3>{title}</h3>
            <p>{number} </p>
        </div>
    )
}

export default SidebarOption
import React from 'react'
import './Body.css'
import Header from './Header'
import Client from './Client'

function Body() {
    return (
        <div className='body'>
            {/* <Header />   */}
            <Client header={"Clientes"} />
        </div>
    )
}

export default Body

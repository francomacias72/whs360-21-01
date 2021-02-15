import React from 'react'
import ClientList from './ClientList'
import PartList from './PartList'

function ClientPart() {
    return (
        <div className="clientPart">
            <ClientList />
            <PartList />
        </div>
    )
}

export default ClientPart

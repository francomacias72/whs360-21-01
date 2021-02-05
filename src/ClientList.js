import './ClientPart.css'
import React, { useEffect, useState } from 'react'
import './Client.css'
import ClientRow from './ClientRow'
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux'
import { openCreateClient, selectOpenClient, changeToEdit, changeToAdd } from './features/clientSlice'
import { db } from './firebase';

function ClientList() {
    const dispatch = useDispatch()
    const selectedClient = useSelector(selectOpenClient)

    const [clients, setClients] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
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
    }, [])

    function filterChange(e) {
        setFilter(e.target.value)
    }

    function addClient() {
        dispatch(openCreateClient())
        dispatch(changeToAdd())
    }


    return (
        <div className="clientes2">
            <div className="clientes2Header">
                <div className="headerSearch2"
                    style={{ display: 'flex', color: 'red !important', justifyContent: "center" }}>
                    <input
                        placeholder='Buscar Cliente...'
                        onChange={filterChange}
                    >
                    </input>
                </div>
                <div className="clientHeader2">
                    <p style={{ marginLeft: '20px' }}>Clientes</p>
                    {/* <div className="clientNameHeader"> */}
                    <p style={{ fontSize: '14px', color: 'lightblue', textTransform: "none", margin: '0' }}>
                        {selectedClient?.Name}</p>
                    {/* </div> */}

                    <IconButton className="">
                        <div className="" >
                            <AddCircleIcon onClick={addClient} className="addPartIcon" />
                        </div>
                    </IconButton>

                </div>
            </div>
            {/* <div className="clientes2List"> */}
            <div className="clientListRows2">
                {clients.filter(c => c.data.clientName.includes(filter)).map(({ id, data: { clientName, dir1, dir2, dir3, rfc, timestamp }
                }) => (
                    <ClientRow
                        Id={id}
                        key={id}
                        Name={clientName}
                        dir1={dir1}
                        dir2={dir2}
                        dir3={dir3}
                        rfc={rfc}
                        time={new Date(timestamp?.seconds * 1000).toUTCString()}
                    />
                ))}
                {/* </div> */}
            </div>
        </div>
    )
}
// import './Clientes2.css'

export default ClientList

import React, { useEffect, useState } from 'react'
import './Client.css'
import ClientRow from './ClientRow'
import PersonIcon from '@material-ui/icons/Person';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux'
import { openCreateClient, selectOpenClient } from './features/clientSlice'
import { db } from './firebase';



function Client({ header }) {
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
    // clients.filter(c => c.data.rfc.includes('E'))
    // console.log(clients.filter(c => c.data.rfc.includes('E')))

    return (
        <div className="client">
            <div className="clientList">
                <div className="clientHeader">
                    <div className="clientHeaderIcon">
                        <PersonIcon />
                    </div>
                    <p>Clientes</p>
                    <input
                        placeholder='Search Client'
                        onChange={filterChange}
                    >
                    </input>
                    <IconButton
                        onClick={() => dispatch(openCreateClient())}
                    >
                        <AddCircleIcon className="clientAddIcon" />
                    </IconButton>
                </div>
                <div className="clientListRows">
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
                </div>
            </div>
            <div className="clientDetails">
                <div className="clientDetailsHeader">
                    <div className="clientDetailsHeaderIcon">
                        <SettingsApplicationsIcon />
                    </div>
                    <p>Detalles</p>
                    <IconButton className="secondary">
                    <div className="editIcon" >
                        <EditIcon className="clientDetailsEditIcon secondary" />
                    </div>
                    </IconButton>
                </div>
                <div className="clientDetailsFields">
                    <div className="fieldRow">
                        <div className="fieldName">
                            Cliente:
                        </div>
                        <div className="fieldData">
                            <p>{selectedClient?.Name}</p>
                        </div>
                    </div>
                    <div className="fieldRow">
                        <div className="fieldName">
                            Dir 1:
                        </div>
                        <div className="fieldData">
                            <p>{selectedClient?.dir1}</p>
                        </div>
                    </div>
                    <div className="fieldRow">
                        <div className="fieldName">
                            Dir 2:
                        </div>
                        <div className="fieldData">
                            <p>{selectedClient?.dir2}</p>
                        </div>
                    </div>
                    <div className="fieldRow">
                        <div className="fieldName">
                            Dir 3:
                        </div>
                        <div className="fieldData">
                            <p>{selectedClient?.dir3}</p>
                        </div>
                    </div>
                    <div className="fieldRow">
                        <div className="fieldName">
                            R.F.C.:
                        </div>
                        <div className="fieldData">
                            <p>{selectedClient?.rfc}</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Client

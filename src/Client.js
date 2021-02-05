import React, { useEffect, useState } from 'react'
import './Client.css'
import ClientRow from './ClientRow'
import PartRow from './PartRow'
import PersonIcon from '@material-ui/icons/Person';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux'
import { openCreateClient, selectOpenClient, changeToEdit, changeToAdd } from './features/clientSlice'
import { openCreatePart, selectOpenPart, changeToEditP, changeToAddP } from './features/partSlice'
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

    const [parts, setParts] = useState([])
    const [filterP, setFilterP] = useState('')

    useEffect(() => {
        db.collection('parts')
            // .where('clientId', '==', 'djBwgyZYFee0SVAuBIfl')
            .orderBy('partName', 'asc')
            .onSnapshot(snapshot =>
                setParts(
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

    function filterChangeP(e) {
        setFilterP(e.target.value)
    }
    // clients.filter(c => c.data.rfc.includes('E'))
    // console.log(clients.filter(c => c.data.rfc.includes('E')))
    function editClient(client) {
        if (selectedClient?.Id) {
            dispatch(changeToEdit())
            dispatch(openCreateClient())
        }
    }
    function addClient() {
        dispatch(openCreateClient())
        dispatch(changeToAdd())
    }

    function addPart() {
        dispatch(openCreatePart())
        dispatch(changeToAddP())
    }

    return (
        <div className="client">

            <div className="clientMain">

                <div className="headerMain">
                    <div className="headerRow">
                        <div className="headerSearch">
                            <input
                                placeholder='Buscar Cliente...'
                                onChange={filterChange}
                            >
                            </input>
                        </div>
                    </div>
                    <div className="clientHeader">
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
                <div className="listMain">
                    <div className="clientList">

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
                </div>
            </div>

            <div className="clientSecondary">
                <div className="headerSecondary">
                    <div className="clientDetails">
                        <div className="headerRow">
                            <div className="headerSearch">
                                <input
                                    placeholder='Buscar Parte...'
                                    onChange={filterChangeP}
                                >
                                </input>
                            </div>
                        </div>
                        <div className="clientDetailsHeader">
                            <p style={{ marginLeft: '20px' }}>Partes</p>
                            {/* <div className="clientNameHeader"> */}
                            <p style={{ fontSize: '14px', color: 'lightblue', textTransform: "none", margin: '0' }}>
                                {selectedClient?.Name}</p>
                            {/* </div> */}

                            <IconButton className="">
                                <div className="" >
                                    <AddCircleIcon onClick={addPart} className="addPartIcon" />
                                </div>
                            </IconButton>
                        </div>

                    </div>

                    <div className="partListRows">
                        {parts.filter(c => c.data.partName.includes(filterP)).map(({ id, data: { partName, desc, model, nom, coo, clientId, timestamp }
                        }) => (
                            <PartRow
                                Id={id}
                                key={id}
                                Name={partName}
                                desc={desc}
                                model={model}
                                nom={nom}
                                coo={coo}
                                clientId={clientId}
                                time={new Date(timestamp?.seconds * 1000).toUTCString()}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Client

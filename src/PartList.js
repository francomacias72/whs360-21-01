import './ClientPart.css'
import React, { useEffect, useState } from 'react'
import './Client.css'
import PartRow from './PartRow'
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux'
import { selectOpenClient, } from './features/clientSlice'
import { openCreatePart, changeToAddP } from './features/partSlice'
import { db } from './firebase';

function PartList() {
    const dispatch = useDispatch()
    const selectedClient = useSelector(selectOpenClient)
    const [parts, setParts] = useState([])
    const [filterP, setFilterP] = useState('')

    useEffect(() => {
        db.collection('parts')
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

    function filterChangeP(e) {
        setFilterP(e.target.value)
    }

    function addPart() {
        dispatch(openCreatePart())
        dispatch(changeToAddP())
    }

    return (
        <div className="clientes2">
            <div className="clientes2Header">
                <div className="headerSearch2"
                    style={{ display: 'flex', color: 'red !important', justifyContent: "center" }}>
                    <input
                        placeholder='Buscar Cliente...'
                        onChange={filterChangeP}
                    >
                    </input>
                </div>
                <div className="clientHeader2">
                    <p style={{ marginLeft: '20px' }}>Partes</p>
                    <p style={{ fontSize: '14px', color: 'lightblue', textTransform: "none", margin: '0' }}>
                        {selectedClient?.Name}</p>

                    <IconButton className="">
                        <div className="" >
                            <AddCircleIcon onClick={addPart} className="addPartIcon" />
                        </div>
                    </IconButton>

                </div>
            </div>
            <div className="clientes2List">
                <div className="clientListRows2">
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
    )
}

export default PartList 

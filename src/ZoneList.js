import './ClientPart.css'
import React, { useEffect, useState } from 'react'
import './Client.css'
import ZoneRow from './ZoneRow'
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux'
import { selectOpenWhs, } from './features/whsSlice'
import { openCreateZone, changeToAddZ } from './features/zoneSlice'
import { db } from './firebase';

function ZoneList() {
    const dispatch = useDispatch()
    const selectedWhs = useSelector(selectOpenWhs)
    const [zones, setZones] = useState([])
    const [filterZ, setFilterZ] = useState('')
    console.log("Select WHS: ", selectedWhs)

    useEffect(() => {
        db.collection("zones")
            .orderBy('zoneName', 'asc')
            .get()
            .then(snapshot =>
                setZones(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ))
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [])

    function filterChangeZ(e) {
        setFilterZ(e.target.value)
    }

    function addZone() {
        dispatch(openCreateZone())
        dispatch(changeToAddZ())
    }

    return (
        <div className="clientes2">
            <div className="clientes2Header">
                <div className="headerSearch2"
                    style={{ display: 'flex', color: 'red !important', justifyContent: "center" }}>
                    <input
                        placeholder="Buscar Locación..."
                        onChange={filterChangeZ}
                    >
                    </input>
                </div>
                <div className="clientHeader2">
                    <p style={{ marginLeft: '20px' }}>Locaciones</p>
                    <p style={{ fontSize: '14px', color: 'lightblue', textTransform: "none", margin: '0' }}>
                        {selectedWhs?.Name}</p>

                    <IconButton className="">
                        <div className="" >
                            <AddCircleIcon onClick={addZone} className="addClientIcon" />
                        </div>
                    </IconButton>

                </div>
            </div>
            <div className="clientes2List">
                <div className="clientListRows2">
                    {zones.filter(c => c.data.zoneName.includes(filterZ)).map(({ id, data: { zoneName, desc, whsId, timestamp }
                    }) => (
                        <ZoneRow
                            Id={id}
                            key={id}
                            Name={zoneName}
                            desc={desc}
                            // dir2={dir2}
                            // dir3={dir3}
                            // active={active}
                            whsId={whsId}
                            time={new Date(timestamp?.seconds * 1000).toUTCString()}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ZoneList 

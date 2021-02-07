import './ClientPart.css'
import React, { useEffect, useState } from 'react'
import './Client.css'
import WhsRow from './WhsRow'
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux'
import { openCreateWhs, selectOpenWhs, changeToAddW } from './features/whsSlice'
import { db } from './firebase';

function WhsList() {
    const dispatch = useDispatch()
    const selectedWhs = useSelector(selectOpenWhs)

    const [warehouses, setWhs] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        db.collection('warehouses')
            .orderBy('whsName', 'asc')
            .onSnapshot(snapshot =>
                setWhs(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
    }, [])


    function filterChangeW(e) {
        setFilter(e.target.value)
    }

    function addWhs() {
        dispatch(openCreateWhs())
        dispatch(changeToAddW())
    }


    return (
        <div className="clientes2">
            <div className="clientes2Header">
                <div className="headerSearch2"
                    style={{ display: 'flex', color: 'red !important', justifyContent: "center" }}>
                    <input
                        placeholder='Buscar Bodega...'
                        onChange={filterChangeW}
                    >
                    </input>
                </div>
                <div className="clientHeader">
                    <p style={{ marginLeft: '20px' }}>Bodegas</p>
                    <p style={{ fontSize: '14px', color: 'lightblue', textTransform: "none", margin: '0' }}>
                        {selectedWhs?.Name}</p>

                    <IconButton className="">
                        <div className="" >
                            <AddCircleIcon
                                onClick={addWhs}
                                className="addClientIcon" />
                        </div>
                    </IconButton>

                </div>
            </div>
            <div className="clientListRows2">
                {warehouses.filter(c => c.data.whsName.includes(filter)).map(({ id, data: { whsName, dir1, dir2, dir3, active, timestamp }
                }) => (
                    <WhsRow
                        Id={id}
                        key={id}
                        Name={whsName}
                        dir1={dir1}
                        dir2={dir2}
                        dir3={dir3}
                        active={active}
                        time={new Date(timestamp?.seconds * 1000).toUTCString()}
                    />
                ))}
            </div>
        </div>
    )
}

export default WhsList

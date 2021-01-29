import React, { useEffect, useState } from 'react'
import './Part.css'
import PartRow from './PartRow'
import PersonIcon from '@material-ui/icons/Person';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux'
import { openCreatePart, selectOpenPart, changeToEdit, changeToAdd } from './features/partSlice'
import { db } from './firebase';



function Part({ header }) {
    const dispatch = useDispatch()
    const selectedPart = useSelector(selectOpenPart)

    const [parts, setParts] = useState([])
    const [filter, setFilter] = useState('')

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

    function filterChange(e) {
        setFilter(e.target.value)
    }
    // parts.filter(c => c.data.rfc.includes('E'))
    // console.log(parts.filter(c => c.data.rfc.includes('E')))
    function editPart(part) {
        if (selectedPart?.Id) {
            dispatch(changeToEdit())
            dispatch(openCreatePart())
        }
    }
    function addPart() {
        dispatch(openCreatePart())
        dispatch(changeToAdd())
    }

    return (
        <div className="part">
            <div className="partList">
                <div className="partHeader">
                    <div className="partHeaderIcon">
                        <PersonIcon />
                    </div>
                    <p>Partes</p>
                    <div className="headerSearch">
                        <input
                            placeholder='Buscar...'
                            onChange={filterChange}
                        >
                        </input>
                    </div>

                    <AddCircleIcon onClick={addPart} className="addPartIcon" />

                </div>
                <div className="partListRows">
                    {parts.filter(c => c.data.partName.includes(filter)).map(({ id, data: { partName, desc, model, nom, coo, timestamp }
                    }) => (
                        <PartRow
                            Id={id}
                            key={id}
                            Name={partName}
                            desc={desc}
                            model={model}
                            nom={nom}
                            coo={coo}
                            time={new Date(timestamp?.seconds * 1000).toUTCString()}
                        />
                    ))}
                </div>
            </div>
            <div className="partDetails">
                <div className="partDetailsHeader">
                    <div className="partDetailsHeaderIcon">
                        <SettingsApplicationsIcon />
                    </div>
                    <p>Detalles</p>
                    <IconButton className="">
                        <div className="" >
                            <EditIcon
                                className="partDetailsEditIcon"
                                onClick={() => editPart(selectedPart?.Id)}
                            // onClick={() => dispatch(changeToEdit())}
                            />
                        </div>
                    </IconButton>
                </div>
                <div className="partDetailsFields">
                    <div className="fieldRow">
                        <div className="fieldName">
                            Parte:
                        </div>
                        <div className="fieldData">
                            <p>{selectedPart?.Name}</p>
                        </div>
                    </div>
                    <div className="fieldRow">
                        <div className="fieldName">
                            Descripción:
                        </div>
                        <div className="fieldData">
                            <p>{selectedPart?.desc}</p>
                        </div>
                    </div>
                    <div className="fieldRow">
                        <div className="fieldName">
                            Modelo:
                        </div>
                        <div className="fieldData">
                            <p>{selectedPart?.model}</p>
                        </div>
                    </div>
                    <div className="fieldRow">
                        <div className="fieldName">
                            NOM:
                        </div>
                        <div className="fieldData">
                            <p>{selectedPart?.nom}</p>
                        </div>
                    </div>
                    <div className="fieldRow">
                        <div className="fieldName">
                            País de Origen:
                        </div>
                        <div className="fieldData">
                            <p>{selectedPart?.coo}</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Part

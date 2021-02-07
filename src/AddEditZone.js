import React from 'react'
import { useState } from 'react';
import './AddEditZone.css'
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { closeCreateZone, selectEditModeZ, selectOpenZone } from './features/zoneSlice'
import { selectOpenWhs } from './features/whsSlice'
import { db } from './firebase';
import firebase from 'firebase'

function AddEditZone() {
    const editMode = useSelector(selectEditModeZ)
    const selectedZone = useSelector(selectOpenZone)
    const selectedWhs = useSelector(selectOpenWhs)
    const [zoneName, setZoneName] = useState(editMode ? selectedZone?.Name : '');
    const [desc, setDesc] = useState(editMode ? selectedZone?.desc : '');
    // const [model, setModel] = useState(editMode ? selectedZone?.model : '');
    // const [nom, setNOM] = useState(editMode ? selectedZone?.nom : '');
    // const [coo, setCOO] = useState(editMode ? selectedZone?.coo : '');


    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (formData) => {
        console.log(formData)

        if (editMode) {
            const doc = selectedZone.Id;
            db.collection('zones').doc(doc).set({
                zoneName: formData.zoneName,
                desc: formData.desc,
                // model: formData.model,
                // nom: formData.nom,
                // coo: formData.coo,
                whsId: selectedWhs.Id,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        else {
            db.collection('zones').add({
                zoneName: formData.zoneName,
                desc: formData.desc,
                // model: formData.model,
                // nom: formData.nom,
                // coo: formData.coo,
                whsId: selectedWhs.Id,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        dispatch(closeCreateZone())
        // const selectedZone = useSelector(selectOpenZone)
    }

    const dispatch = useDispatch();

    function zoneClose() {
        dispatch(closeCreateZone())
    }

    console.log("editModeAddZone:", editMode)


    return (<div className="createZone">
        <div className="createZone__header">
            <h3>{editMode === true ? "Editar " : "Agregar "} Zona</h3>
            <CloseIcon
                className="createZone__close"
                onClick={zoneClose}
            />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <form> */}
            <div className="fieldHeader">
                <p>Zona:</p>
            </div>

            <input
                name='zoneName'
                type="text"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                ref={register({ required: true })}
                tabindex="0"
            />
            {errors.zoneName && <p className="createZone__error">Campo Requerido...</p>}

            <div className="fieldHeader">
                <p>Descripción</p>
            </div>
            <input
                name='desc'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                ref={register({ required: true })}
            />
            {errors.desc && <p className="createZone__error">Campo Requerido...</p>}

            {/* <div className="fieldHeader">
                <p>Modelo:</p>
            </div>
            <input
                name='model'
                onChange={(e) => setModel(e.target.value)}
                value={model}
                type="text"
                ref={register({ required: false })}
            />

            <div className="fieldHeader">
                <p>NOM:</p>
            </div>
            <input
                name='nom'
                value={nom}
                onChange={(e) => setNOM(e.target.value)}
                type="text"
                ref={register({ required: true })}
            />
            {errors.nom && <p className="createZone__error">Campo Requerido...</p>}

            <div className="fieldHeader">
                <p>País de Origen:</p>
            </div>
            <input
                name='coo'
                value={coo}
                onChange={(e) => setCOO(e.target.value)}
                type="text"
                ref={register({ required: true })}
            />
            {errors.coo && <p className="createZone__error">Campo Requerido...</p>} */}


            <div className="createZone__options">
                <Button
                    className="createZone__send"
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Guardar
                </Button>
            </div>

        </form>
    </div >
    );
}

export default AddEditZone;
import React from 'react'
import { useState } from 'react';
import './AddEditPart.css'
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { closeCreatePart, selectEditMode, selectOpenPart } from './features/partSlice'
import { db } from './firebase';
import firebase from 'firebase'

function AddEditPart() {
    const editMode = useSelector(selectEditMode)
    const selectedPart = useSelector(selectOpenPart)
    const [partName, setPartName] = useState(editMode ? selectedPart?.Name : '');
    const [desc, setDesc] = useState(editMode ? selectedPart?.desc : '');
    const [model, setModel] = useState(editMode ? selectedPart?.model : '');
    const [nom, setNOM] = useState(editMode ? selectedPart?.nom : '');
    const [coo, setCOO] = useState(editMode ? selectedPart?.coo : '');


    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (formData) => {
        console.log(formData)

        if (editMode) {
            const doc = selectedPart.Id;
            db.collection('parts').doc(doc).set({
                partName: formData.partName,
                desc: formData.desc,
                model: formData.model,
                nom: formData.nom,
                coo: formData.coo,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        else {
            db.collection('parts').add({
                partName: formData.partName,
                desc: formData.desc,
                model: formData.model,
                nom: formData.nom,
                coo: formData.coo,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        dispatch(closeCreatePart())
    }

    const dispatch = useDispatch();

    function partClose() {
        dispatch(closeCreatePart())
    }

    return (<div className="createPart">
        <div className="createPart__header">
            <h3>{editMode === true ? "Editar " : "Agregar "} Parte</h3>
            <CloseIcon
                className="createPart__close"
                onClick={partClose}
            />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <form> */}
            <div className="fieldHeader">
                <p>Número:</p>
            </div>

            <input
                name='partName'
                type="text"
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
                ref={register({ required: true })}
            />
            {errors.partName && <p className="createPart__error">Campo Requerido...</p>}

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
            {errors.desc && <p className="createPart__error">Campo Requerido...</p>}

            <div className="fieldHeader">
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
            {errors.nom && <p className="createPart__error">Campo Requerido...</p>}
            
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
            {errors.coo && <p className="createPart__error">Campo Requerido...</p>}


            <div className="createPart__options">
                <Button
                    className="createPart__send"
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

export default AddEditPart;
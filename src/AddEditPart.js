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
    const [dir1, setDir1] = useState(editMode ? selectedPart?.dir1 : '');
    const [dir2, setDir2] = useState(editMode ? selectedPart?.dir2 : '');
    const [dir3, setDir3] = useState(editMode ? selectedPart?.dir3 : '');
    const [rfc, setRFC] = useState(editMode ? selectedPart?.rfc : '');


    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (formData) => {
        console.log(formData)

        if (editMode) {
            const doc = selectedPart.Id;
            db.collection('parts').doc(doc).set({
                partName: formData.partName,
                dir1: formData.dir1,
                dir2: formData.dir2,
                dir3: formData.dir3,
                rfc: formData.rfc,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        else {
            db.collection('parts').add({
                partName: formData.partName,
                dir1: formData.dir1,
                dir2: formData.dir2,
                dir3: formData.dir3,
                rfc: formData.rfc,
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
                <p>Name:</p>
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
                <p>Address Line 1:</p>
            </div>
            <input
                name='dir1'
                value={dir1}
                onChange={(e) => setDir1(e.target.value)}
                type="text"
                ref={register({ required: true })}
            />
            {errors.dir1 && <p className="createPart__error">Campo Requerido...</p>}

            <div className="fieldHeader">
                <p>Address Line 2:</p>
            </div>
            <input
                name='dir2'
                onChange={(e) => setDir2(e.target.value)}
                value={dir2}
                type="text"
                ref={register({ required: false })}
            />

            <div className="fieldHeader">
                <p>Address Line 3:</p>
            </div>
            <input
                name='dir3'
                value={dir3}
                onChange={(e) => setDir3(e.target.value)}
                type="text"
                ref={register({ required: false })}
            />

            <div className="fieldHeader">
                <p>RFC:</p>
            </div>
            <input
                name='rfc'
                value={rfc}
                onChange={(e) => setRFC(e.target.value)}
                type="text"
                ref={register({ required: true })}
            />
            {errors.rfc && <p className="createPart__error">Campo Requerido...</p>}

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
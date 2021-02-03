import React from 'react'
import { useState } from 'react';
import './AddEditClient.css'
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { closeCreateClient, selectEditMode, selectOpenClient } from './features/clientSlice'
import { db } from './firebase';
import firebase from 'firebase'

function AddEditClient() {
    const editMode = useSelector(selectEditMode)
    const selectedClient = useSelector(selectOpenClient)
    const [clientName, setClientName] = useState(editMode ? selectedClient?.Name : '');
    const [dir1, setDir1] = useState(editMode ? selectedClient?.dir1 : '');
    const [dir2, setDir2] = useState(editMode ? selectedClient?.dir2 : '');
    const [dir3, setDir3] = useState(editMode ? selectedClient?.dir3 : '');
    const [rfc, setRFC] = useState(editMode ? selectedClient?.rfc : '');


    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (formData) => {
        console.log(formData)

        if (editMode) {
            const doc = selectedClient.Id;
            db.collection('clients').doc(doc).set({
                clientName: formData.clientName,
                dir1: formData.dir1,
                dir2: formData.dir2,
                dir3: formData.dir3,
                rfc: formData.rfc,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        else {
            db.collection('clients').add({
                clientName: formData.clientName,
                dir1: formData.dir1,
                dir2: formData.dir2,
                dir3: formData.dir3,
                rfc: formData.rfc,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        dispatch(closeCreateClient())
    }

    const dispatch = useDispatch();

    function clientClose() {
        dispatch(closeCreateClient())
    }

    return (<div className="createClient">
        <div className="createClient__header">
            <h3>{editMode === true ? "Editar " : "Agregar "} Cliente</h3>
            <CloseIcon
                className="createClient__close"
                onClick={clientClose}
            />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <form> */}
            <div className="fieldHeader">
                <p>Cliente:</p>
            </div>

            <input
                name='clientName'
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                ref={register({ required: true })}
            />
            {errors.clientName && <p className="createClient__error">Campo Requerido...</p>}

            <div className="fieldHeader">
                <p>Dir 1:</p>
            </div>
            <input
                name='dir1'
                value={dir1}
                onChange={(e) => setDir1(e.target.value)}
                type="text"
                ref={register({ required: true })}
            />
            {errors.dir1 && <p className="createClient__error">Campo Requerido...</p>}

            <div className="fieldHeader">
                <p>Dir 2:</p>
            </div>
            <input
                name='dir2'
                onChange={(e) => setDir2(e.target.value)}
                value={dir2}
                type="text"
                ref={register({ required: false })}
            />

            <div className="fieldHeader">
                <p>Dir 3:</p>
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
            {errors.rfc && <p className="createClient__error">Campo Requerido...</p>}

            <div className="createClient__options">
                <Button
                    className="createClient__send"
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

export default AddEditClient;
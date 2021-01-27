import React from 'react';
import './CreateClient.css'
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { closeCreateClient, selectEditMode, selectOpenClient } from './features/clientSlice'
import { db } from './firebase';
import firebase from 'firebase'

function CreateClient() {
    const editMode = useSelector(selectEditMode)
    const selectedClient = useSelector(selectOpenClient)

    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (formData) => {
        console.log(formData)
        db.collection('clients').add({
            clientName: formData.clientName,
            dir1: formData.dir1,
            dir2: formData.dir2,
            dir3: formData.dir3,
            rfc: formData.rfc,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

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
                <p>Name:</p>
            </div>

            <input
                name='clientName'
                // placeholder="Name"
                type="text"
                value={editMode ? selectedClient?.Name : null}
                ref={register({ required: true })}
            />
            {errors.clientName && <p className="createClient__error"> Client Name is Required!!!</p>}

            <div className="fieldHeader">
                <p>Address Line 1:</p>
            </div>
            <input
                name='dir1'
                placeholder=''
                value={editMode ? selectedClient?.dir1 : null}
                type="text"
                ref={register({ required: true })}
            />
            {errors.dir1 && <p className="createClient__error">Address Line 1 is Required!!!</p>}

            <div className="fieldHeader">
                <p>Address Line 2:</p>
            </div>
            <input
                name='dir2'
                // placeholder='Address Line 2'
                value={editMode ? selectedClient?.dir2 : null}
                type="text"
                ref={register({ required: false })}
            />

            <div className="fieldHeader">
                <p>Address Line 3:</p>
            </div>
            <input
                name='dir3'
                value={editMode ? selectedClient?.dir3 : null}
                // placeholder='Address Line 3'
                type="text"
                ref={register({ required: false })}
            />

            <div className="fieldHeader">
                <p>RFC:</p>
            </div>
            <input
                name='rfc'
                value={editMode ? selectedClient?.rfc : null}
                // placeholder='RFC'
                type="text"
                ref={register({ required: true })}
            />
            {errors.rfc && <p className="createClient__error">RFC is Required!!!</p>}

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

export default CreateClient;
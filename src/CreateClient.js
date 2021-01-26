import React from 'react';
import './CreateClient.css'
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { closeCreateClient } from './features/clientSlice'
import { db } from './firebase';
import firebase from 'firebase'

function CreateClient() {
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

    return (<div className="createClient">
        <div className="createClient__header">
            <h3>New Client</h3>
            <CloseIcon
                className="createClient__close"
                onClick={() => dispatch(closeCreateClient())}
            />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <form> */}
            <input
                name='clientName'
                placeholder="Name"
                type="text"
                ref={register({ required: true })}
            />
            {errors.clientName && <p className="createClient__error"> Client Name is Required!!!</p>}

            <input
                name='dir1'
                placeholder='Address Line 1'
                type="text"
                ref={register({ required: true })}
            />
            {errors.dir1 && <p className="createClient__error">Address Line 1 is Required!!!</p>}

            <input
                name='dir2'
                placeholder='Address Line 2'
                type="text"
                ref={register({ required: false })}
            />

            <input
                name='dir3'
                placeholder='Address Line 3'
                type="text"
                ref={register({ required: false })}
            />

            <input
                name='rfc'
                placeholder='RFC'
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
                    Send
                </Button>
            </div>

        </form>
    </div >
    );
}

export default CreateClient;
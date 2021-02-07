import React from 'react'
import { useState } from 'react';
import './AddEditClient.css'
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { closeCreateWhs, selectEditMode, selectOpenWhs } from './features/whsSlice'
import { db } from './firebase';
import firebase from 'firebase'

function AddEditWhs() {
    const editMode = useSelector(selectEditMode)
    const selectedWhs = useSelector(selectOpenWhs)
    const [whsName, setWhsName] = useState(editMode ? selectedWhs?.Name : '');
    const [dir1, setDir1] = useState(editMode ? selectedWhs?.dir1 : '');
    const [dir2, setDir2] = useState(editMode ? selectedWhs?.dir2 : '');
    const [dir3, setDir3] = useState(editMode ? selectedWhs?.dir3 : '');
    const [active, setActive] = useState(editMode ? selectedWhs?.active : '');


    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (formData) => {
        console.log(formData)

        if (editMode) {
            const doc = selectedWhs.Id;
            db.collection('warehouses').doc(doc).set({
                whsName: formData.whsName,
                dir1: formData.dir1,
                dir2: formData.dir2,
                dir3: formData.dir3,
                active: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        else {
            db.collection('warehouses').add({
                whsName: formData.whsName,
                dir1: formData.dir1,
                dir2: formData.dir2,
                dir3: formData.dir3,
                active: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        dispatch(closeCreateWhs())
    }

    const dispatch = useDispatch();

    function whsClose() {
        dispatch(closeCreateWhs())
    }

    return (<div className="createClient">
        <div className="createClient__header">
            <h3>{editMode === true ? "Editar " : "Agregar "} Bodega</h3>
            <CloseIcon
                className="createClient__close"
                onClick={whsClose}
            />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <form> */}
            <div className="fieldHeader">
                <p>Bodega:</p>
            </div>

            <input
                name='whsName'
                type="text"
                value={whsName}
                onChange={(e) => setWhsName(e.target.value)}
                ref={register({ required: true })}
            />
            {errors.whsName && <p className="createWhs__error">Campo Requerido...</p>}

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
            {errors.dir1 && <p className="createWhs__error">Campo Requerido...</p>}

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
                <p>Active:</p>
            </div>
            <input
                name='active'
                value={active}
                onChange={(e) => setActive(e.target.value)}
                type="text"
            // ref={register({ required: true })}
            />
            {errors.active && <p className="createWhs__error">Campo Requerido...</p>}

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

export default AddEditWhs;
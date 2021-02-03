import React from 'react'
import './ClientRow.css'
// import EditIcon from '@material-ui/icons/Edit';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import { selectClient } from './features/clientSlice';
import { useDispatch, useSelector } from 'react-redux'
import { db } from './firebase';
import EditIcon from '@material-ui/icons/Edit';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { openCreateClient, changeToEdit, selectOpenClient, } from './features/clientSlice'



function ClientRow({ Id, Name, dir1, dir2, dir3, rfc }) {
    const selectedClient = useSelector(selectOpenClient)

    const history = useHistory()
    const dispatch = useDispatch()

    const openClient = () => {
        dispatch(
            selectClient({
                Id,
                Name,
                dir1,
                dir2,
                dir3,
                rfc,
            })
        );
    }

    function deleteClient() {
        if (window.confirm("¿Está seguro que quiere borrar Cliente?")) {
            db.collection("clients").doc(Id).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
            dispatch(
                selectClient({
                    Id: null,
                    Name: null,
                    dir1: null,
                    dir2: null,
                    dir3: null,
                    rfc: null,
                })
            );
        }

    }

    function editClient(client) {
        dispatch(
            selectClient({
                Id,
                Name,
                dir1,
                dir2,
                dir3,
                rfc,
            })
        );
        dispatch(changeToEdit())
        dispatch(openCreateClient())
        // if (selectedClient?.Id) {
        //    dispatch(changeToEdit())
        //    dispatch(openCreateClient())    
        // }
    }

    return (
        <div className="clientRow">
            <div className="clientRowIcons">
                {/* <IconButton className="clientRowIconsColor">
                    <div onClick={openClient} className="editIcon">
                        <ListAltIcon className="clientRowEditIcon" />
                    </div>
                </IconButton> */}
                <IconButton>
                    {/* <div className="" > */}
                    <EditIcon
                        className="clientDetailsEditIcon"
                        onClick={() => editClient(selectedClient?.Id)}
                    />
                    {/* </div> */}
                </IconButton>
                <IconButton className="clientRowIconsColor">
                    <div className="deleteIcon" onClick={deleteClient}>
                        <DeleteIcon className="clientRowDeleteIcon" />
                    </div>
                </IconButton>

            </div>
            {/* <div className="clientRowId">{Id}</div> */}
            <div className="clientRowName"
                onClick={openClient}
                style={{ cursor: 'pointer' }}
            >{Name}</div>
            {/* <div className="clientRowDescription">{Description}</div> */}
        </div>
    )
}

export default ClientRow

import React from 'react'
import './PartRow.css'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import { selectPart, changeToEditP, openCreatePart, selectOpenPart } from './features/partSlice';
import { useDispatch, useSelector } from 'react-redux'
import { db } from './firebase';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { selectOpenClient, } from './features/clientSlice'
import EditIcon from '@material-ui/icons/Edit';


function PartRow({ Id, Name, desc, model, nom, coo, clientId }) {
    const selectedClient = useSelector(selectOpenClient)
    const selectedPart = useSelector(selectOpenPart)
    const history = useHistory()
    const dispatch = useDispatch()

    const openPart = () => {
        dispatch(
            selectPart({
                Id,
                Name,
                desc,
                model,
                nom,
                coo,
                clientId,
            })
        );
        // history.push("/mail")
        // console.log (Id, Name, dir1, dir2, dir3, rfc)

    }

    function deletePart() {
        if (window.confirm("¿Está seguro que quiere borrar Parte: " + Name + "?")) {
            db.collection("parts").doc(Id).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
            dispatch(
                selectPart({
                    Id: null,
                    Name,
                    desc,
                    model,
                    nom,
                    coo,
                    clientId,
                })
            );
        }
    }

    function editPart(client) {
        dispatch(
            selectPart({
                Id,
                Name,
                desc,
                model,
                nom,
                coo,
                clientId,
            })
        );
        dispatch(changeToEditP())
        dispatch(openCreatePart())
    }

    if (selectedClient?.Id === clientId) {
        return (
            <div className="partRow">
                <div className="partRowIcons">                   
                    <IconButton>
                        <EditIcon
                            className="clientDetailsEditIcon"
                            onClick={() => editPart(selectedPart?.Id)}
                        />
                    </IconButton>
                    <IconButton className="partRowIconsColor">
                        <div className="deleteIcon" onClick={deletePart}>
                            <DeleteIcon className="partRowDeleteIcon"
                            />

                        </div>
                    </IconButton>
                </div>
                <div className="partRowName"><strong>{Name}</strong> {" - " + desc.substring(0, 30) + "..."}</div>
            </div>
        )
    }
    else {
        return (null)
    }
}

export default PartRow

import React from 'react'
import './PartRow.css'
// import EditIcon from '@material-ui/icons/Edit';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import { selectPart } from './features/partSlice';
import { useDispatch } from 'react-redux'
import { db } from './firebase';
import ListAltIcon from '@material-ui/icons/ListAlt';


function PartRow({ Id, Name, desc, model, nom, coo }) {
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
                coo
            })
        );
        // history.push("/mail")
        // console.log (Id, Name, dir1, dir2, dir3, rfc)

    }

    function deletePart() {
        if (window.confirm("¿Está seguro que quiere borrar Parte?")) {
            db.collection("parts").doc(Id).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
            dispatch(
                selectPart({
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

    return (
        <div className="partRow">
            <div className="partRowIcons">
                <IconButton className="partRowIconsColor">
                    <div onClick={openPart} className="editIcon">
                        <ListAltIcon className="partRowEditIcon" />
                    </div>
                </IconButton>
                <IconButton className="partRowIconsColor">
                    <div className="deleteIcon" onClick={deletePart}>
                        <DeleteIcon className="partRowDeleteIcon" />
                    </div>
                </IconButton>

            </div>
            {/* <div className="partRowId">{Id}</div> */}
            <div className="partRowName">{Name}</div>
            {/* <div className="partRowDescription">{Description}</div> */}
        </div>
    )
}

export default PartRow

import React from 'react'
import './PartRow.css'
// import EditIcon from '@material-ui/icons/Edit';
// import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import { selectZone, changeToEditZ, openCreateZone, selectOpenZone } from './features/zoneSlice';
import { useDispatch, useSelector } from 'react-redux'
import { db } from './firebase';
import { selectOpenWhs, } from './features/whsSlice'
import EditIcon from '@material-ui/icons/Edit';


function ZoneRow({ Id, Name, desc, whsId }) {
    const selectedWhs = useSelector(selectOpenWhs)
    const selectedZone = useSelector(selectOpenZone)
    const history = useHistory()
    const dispatch = useDispatch()

    const openZone = () => {
        dispatch(
            selectZone({
                Id,
                Name,
                desc,
                whsId,
            })
        );

    }

    function deleteZone() {
        if (window.confirm("¿Está seguro que quiere borrar Locación: " + Name + "?")) {
            db.collection("zones").doc(Id).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
            dispatch(
                selectZone({
                    Id: null,
                    Name,
                    desc,
                    whsId,
                })
            );
        }
    }

    function editZone(whs) {
        dispatch(
            selectZone({
                Id,
                Name,
                desc,
                whsId,
            })
        );
        dispatch(changeToEditZ())
        dispatch(openCreateZone())

    }

    if (selectedWhs?.Id === whsId) {
        return (
            <div className="partRow">
                <div className="partRowIcons">
                    <IconButton>
                        <EditIcon
                            className="clientDetailsEditIcon"
                            onClick={() => editZone(selectedZone?.Id)}
                        />
                    </IconButton>
                    <IconButton className="partRowIconsColor">
                        <div className="deleteIcon" onClick={deleteZone}>
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

export default ZoneRow

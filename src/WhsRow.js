import React from 'react'
import './ClientRow.css'
// import EditIcon from '@material-ui/icons/Edit';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom"
// import { selectWhs } from './features/clientSlice';
import { useDispatch, useSelector } from 'react-redux'
import { db } from './firebase';
import EditIcon from '@material-ui/icons/Edit';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { openCreateWhs, changeToEditW, selectOpenWhs, selectWhs } from './features/whsSlice'



function WhsRow({ Id, Name, dir1, dir2, dir3, active }) {
    const selectedWhs = useSelector(selectOpenWhs)

    const history = useHistory()
    const dispatch = useDispatch()

    const openWhs = () => {
        dispatch(
            selectWhs({
                Id,
                Name,
                dir1,
                dir2,
                dir3,
                active,
            })
        );
    }

    function deleteWhs() {
        if (window.confirm("¿Está seguro que quiere borrar esta Bodega?")) {
            db.collection("warehouses").doc(Id).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
            dispatch(
                selectWhs({
                    Id: null,
                    Name: null,
                    dir1: null,
                    dir2: null,
                    dir3: null,
                    active: null,
                })
            );
        }

    }

    function editWhs(client) {
        dispatch(
            selectWhs({
                Id,
                Name,
                dir1,
                dir2,
                dir3,
                active,
            })
        );
        dispatch(changeToEditW())
        dispatch(openCreateWhs())
    }

    return (
        <div className="clientRow">
            <div className="clientRowIcons">
                <IconButton>
                    <EditIcon
                        className="clientDetailsEditIcon"
                        onClick={() => editWhs(selectedWhs?.Id)}
                    />
                </IconButton>
                <IconButton className="clientRowIconsColor">
                    <div className="deleteIcon" onClick={deleteWhs}>
                        <DeleteIcon className="clientRowDeleteIcon" />
                    </div>
                </IconButton>

            </div>
            {/* <div className="clientRowId">{Id}</div> */}
            <div className="clientRowName"
                onClick={openWhs}
                style={{ cursor: 'pointer' }}
            >{Name}</div>
            {/* <div className="clientRowDescription">{Description}</div> */}
        </div>
    )
}

export default WhsRow

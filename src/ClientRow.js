import React from 'react'
import './ClientRow.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import { selectClient } from './features/clientSlice';
import { useDispatch } from 'react-redux'

function ClientRow({ Id, Name, dir1, dir2, dir3, rfc }) {
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
        history.push("/mail")
    }

    return (
        <div onClick={openClient} className="clientRow">
            <div className="clientRowIcons">
                <IconButton className="clientRowIconsColor">
                    <div className="editIcon">
                        <EditIcon className="clientRowEditIcon" />
                    </div>
                </IconButton>
                <IconButton className="clientRowIconsColor">
                    <div className="deleteIcon">
                        <DeleteIcon className="clientRowDeleteIcon" />
                    </div>
                </IconButton>

            </div>
            {/* <div className="clientRowId">{Id}</div> */}
            <div className="clientRowName">{Name}</div>
            {/* <div className="clientRowDescription">{Description}</div> */}
        </div>
    )
}

export default ClientRow

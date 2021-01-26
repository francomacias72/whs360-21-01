import React from 'react'
import './ListRow.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

function ListRow({ Id, Name, Description }) {
    return (
        <div className="listRow">
            <div className="listRowIcons">
                <IconButton className="listRowIconsColor">
                    <EditIcon className="listRowEditIcon" />
                </IconButton>
                <IconButton className="listRowIconsColor">
                    <DeleteIcon className="listRowDeleteIcon" />
                </IconButton>

            </div>
            {/* <div className="listRowId">{Id}</div> */}
            <div className="listRowName">{Name}</div>
            <div className="listRowDescription">{Description}</div>
        </div>
    )
}

export default ListRow

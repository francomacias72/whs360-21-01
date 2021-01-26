import React from 'react'
import './List.css'
import ListRow from './ListRow'
import PersonIcon from '@material-ui/icons/Person';

function List({ header }) {
    return (
        <div className="list">
            <div className="listHeader">
                <div className="listHeaderIcon">
                    <PersonIcon />
                </div>

                <p>{header}</p>
            </div>
            {/* <p>LIST</p> */}
            <ListRow Id="1" Name="EATON Technologies S. de R.L. de C.V." Description="This is our first client" />
            <ListRow Id="2" Name="Client 2" Description="This is our first client" />
            <ListRow Id="3" Name="Client 3" Description="This is our first client" />
            <ListRow Id="4" Name="Client 4" Description="This is our first client" />
            <ListRow Id="5" Name="Client 5" Description="This is our first client" />
            <ListRow Id="6" Name="Client 6" Description="This is our first client" />
            <ListRow Id="7" Name="Client 7" Description="This is our first client" />
        </div>
    )
}

export default List

import React from 'react'
import MaterialTable from 'material-table'
// import { Icon } from '@material-ui/core';
import { AddBox, ArrowDownward, ChevronLeft, ChevronRight } from "@material-ui/icons";
import Icon from '@material-ui/core/Icon'

function Table() {
    return (
        <MaterialTable
            title="Positioning Actions Column Preview"
            columns={[
                { title: 'Name', field: 'name' },
                { title: 'Surname', field: 'surname' },
                { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                },
            ]}
            data={[
                { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
            ]}
            actions={[
                {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                },
                rowData => ({
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => window.confirm("You want to delete " + rowData.name),
                    disabled: rowData.birthYear < 2000
                })
            ]}
            options={{
                actionsColumnIndex: -1
            }}
        />
    )
}

export default Table
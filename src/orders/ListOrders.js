import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import './ListOrders.css'
import { DataGrid } from '@material-ui/data-grid';
import { db } from '../firebase';
import { selectListClients } from '../features/clientSlice';
import { selectListWhss } from '../features/whsSlice';

const columns = [
    { field: 'whsName', headerName: 'Warehouse', width: 130 },
    { field: 'clientName', headerName: 'Name', width: 250 },
    { field: 'orderNumber', headerName: 'Order #', width: 130 },
    { field: 'supplierName', headerName: 'Vendedor', width: 200 },
    { field: 'trackingNumber', headerName: 'Tracking #', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
];

function ListOrders() {
    const [rows, setRows] = useState([])
    let clients = useSelector(selectListClients)
    let warehouses = useSelector(selectListWhss)

    useEffect(() => {
        function clientName(id) {
            const cliente = clients.filter(client => client.id === id)
            return cliente[0]?.data.clientName
        }
        function whsName(id) {
            const warehouse = warehouses.filter(whs => whs.id === id)
            return warehouse[0]?.data.whsName
        }
        db.collection('inboundOrders')
            .onSnapshot(snapshot => {
                setRows(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        whsName: whsName(doc.data().whsId),
                        clientName: clientName(doc.data().clientId),
                        clientId: doc.data().clientId,
                        orderNumber: doc.data().orderNumber,
                        supplierName: doc.data().supplierName,
                        trackingNumber: doc.data().trackingNumber,
                        status: doc.data().status,
                    }))
                )
            }
            )
    }, [clients, warehouses,])

    return (
        <div className="listOrders">
            <div style={{ height: 600, width: '100%', }}>
                {/* <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection /> */}
                <DataGrid rows={rows} columns={columns} pageSize={10} />
            </div>
        </div>
    )
}

export default ListOrders

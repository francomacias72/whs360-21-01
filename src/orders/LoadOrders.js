import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectClientMain, selectOpenClientMain } from '../features/clientSlice'
import { selectOpenWhsMain, selectWhsMain } from '../features/whsSlice'
import './LoadOrders.css'
// import { FilePicker, ImagePicker } from 'react-file-picker'
import readXlsxFile from 'read-excel-file'
import { db } from '../firebase';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function LoadOrders() {
    const dispatch = useDispatch()
    const [warehouses, setWarehouses] = useState([])
    const [clients, setClients] = useState([])
    const whsMain = useSelector(selectOpenWhsMain)
    const clientMain = useSelector(selectOpenClientMain)
    const [open, setOpen] = React.useState(false);
    const [orderNumber, setOrderNumber] = useState([])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const createOrders = () => {
        const input = document.getElementById('input2')
        readXlsxFile(input.files[0]).then((rows) => {
            rows.map(col => createRecords(col))
        })
    }
    function bodegaChange(e) {
        // setFilterZ(e.target.value)
        selectChange(e)
        dispatch(selectWhsMain(e.target.value))
    }
    function clientChange(e) {
        // setFilterP(e.target.value)
        selectChange(e)
        dispatch(selectClientMain(e.target.value))
    }
    function selectChange(e) {
        document.getElementById(e.target.id).classList.add('borderGreen')
    }
    const createRecords = (col) => {
        if (col[0].toString() !== 'PO Number') {
            db.collection('inboundOrders').doc(col[0].toString()).set({
                whsId: whsMain,
                clientId: clientMain,
                status: 'Released',
                orderNumber: col[0],
                supplierName: col[1],
                trackingNumber: col[2],
                clientRef1: col[3]
            })
                .then((docRef) => {
                    console.log("Document successfully written!");
                    handleOpen()
                    setOrderNumber(docRef.id)
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })
            db.collection('inboundOrderLines').add({
                orderNumber: col[0],
                partNumber: col[4],
                qty: col[5],
                uom: col[6]
            })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })
        }
    }
    useEffect(() => {
        db.collection('clients')
            .orderBy('clientName', 'asc')
            .onSnapshot(snapshot =>
                setClients(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
        db.collection('warehouses')
            .orderBy('whsName', 'asc')
            .onSnapshot(snapshot =>
                setWarehouses(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )

            )
    }, [])

    return (
        <div className="loadOrders">
            <div className="loadOrdersHeader">
                <h1>Cargar Ordenes</h1>
            </div>
            <div className="loadOrdersFilters">
                <div className="combo">
                    <div className="checkError">
                        <select id="selectBodega" name="bodega" onChange={bodegaChange}>
                            <option value="" disabled selected > Elegir Bodega</option>
                            <option value="" > All </option>
                            {warehouses.map(({ id, data: { whsName, }
                            }) => (
                                <option value={id}>{whsName.substr(0, 25)}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="combo">
                    <select id="selectCliente" name="cliente" onChange={clientChange} >
                        <option value="" disabled selected > Elegir Cliente</option>
                        <option value="" > All </option>
                        {clients.map(({ id, data: { clientName, }
                        }) => (
                            <option value={id}>{clientName.substr(0, 25) + "..."}</option>
                        ))}                    </select>
                </div>
            </div>
            <div className="loadOrdersMiddle">
                <label className="custom-file-upload" >
                    <input type="file" id="input2" />
                    <i className="fa fa-cloud-upload" /> Archivo
                </label>
                <button onClick={createOrders}>Crear Ordenes</button>
            </div>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    ¡¡¡Archivo cargado con éxito!!!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default LoadOrders
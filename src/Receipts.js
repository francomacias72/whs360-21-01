import React, { useEffect, useState } from 'react'
import './Receipts.css'
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import firebase from 'firebase'
import { db } from './firebase';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { saveReceipt, getSavedReceipt, saveOrderId } from './features/receiptSlice'
import { selectUser } from './features/userSlice'
import { useBarcode } from 'react-barcodes';
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'
import { selectListClients, selectOpenClientMain } from './features/clientSlice'
import { selectListParts } from './features/partSlice'
import { selectListWhss, selectOpenWhsMain } from './features/whsSlice'
import { selectListZones, selectOpenZone } from './features/zoneSlice'
import { selectListCarriers } from './features/carrierSlice'
import { selectListSuppliers } from './features/supplierSlice'
import { selectListUoms } from './features/uomSlice'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function Receipts() {
    const whsMain = useSelector(selectOpenWhsMain)
    const clientMain = useSelector(selectOpenClientMain)
    const zoneMain = useSelector(selectOpenZone)
    const history = useHistory()
    // const [clients, setClients] = useState([])
    const clients = useSelector(selectListClients)
    // const [warehouses, setWarehouses] = useState([])
    const warehouses = useSelector(selectListWhss)
    // const [zones, setZones] = useState([])
    const zones = useSelector(selectListZones)
    const [filterZ, setFilterZ] = useState([])
    // const [suppliers, setSuppliers] = useState([])
    const suppliers = useSelector(selectListSuppliers)
    // const [carriers, setCarriers] = useState([])
    const carriers = useSelector(selectListCarriers)
    // const [parts, setParts] = useState([])
    const parts = useSelector(selectListParts)
    // const [uoms, setUOMs] = useState([])
    const uoms = useSelector(selectListUoms)
    const [filterP, setFilterP] = useState([])
    const [orderNumber, setOrderNumber] = useState([])
    const dispatch = useDispatch()
    const savedReceipt = useSelector(getSavedReceipt)
    const [receipt, setReceipt] = useState()
    const user = useSelector(selectUser);


    function crearPDF() {
        const doc = new jsPDF()
        const x = 0, y = 0, width = 200, height = 100
        const element = document.getElementById('svg')
        doc
            .svg(element, {
                x,
                y,
                width,
                height
            })
            .then(() => {
                doc.save('myPDF.pdf')
            })
    }
    const { inputRef } = useBarcode({
        value: receipt?.id,
        options: {
        }
    });


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const { register, handleSubmit, watch, errors } = useForm();


    async function getDoc() {
        let query = await db.collection('warehouses').orderBy('whsName').limit(1).get();
        let snapshot = query.docs[0];
        let data = snapshot.id;
        setFilterZ(data)
        query = await db.collection('clients').orderBy('clientName').limit(1).get();
        snapshot = query.docs[0];
        data = snapshot.id;
        setFilterP(data)
    }

    async function getOrderId() {
        let query = await db.collection('orders').orderBy('orderId', 'desc').limit(1).get();
        let snapshot = 1
        if (query.docs[0]) {
            snapshot = query.docs[0]?.data()
            return snapshot?.orderId + 1;
        }
        else {
            return 1
        }
    }



    useEffect(() => {

    }, [])

    function bodegaChange(e) {
        setFilterZ(e.target.value)
        selectChange(e)
        alert(zones.filter(c => c.data.whsId.includes(e.target.value)).length)

    }
    function clientChange(e) {
        setFilterP(e.target.value)
        selectChange(e)
    }
    function selectChange(e) {
        document.getElementById(e.target.id).classList.add('borderGreen')
    }
    const onSubmit = (formData) => {
        let docRef = db.collection("clients").doc(formData.cliente)
        let clientName = ''
        let whsName = ''
        docRef.get().then((doc) => {
            clientName = doc.data().clientName
        })
        docRef = db.collection("warehouses").doc(formData.bodega)
        const d = new Date()
        const newOrderId = getOrderId().then((orden) => {
            docRef.get().then((doc) => {
                whsName = doc.data().whsName
                db.collection('orders').add({
                    orderId: orden,
                    warehouse: whsName,
                    recZone: formData.zona,
                    client: clientName,
                    carrier: formData.carrier,
                    supplier: formData.proveedor,
                    poNumber: formData.po,
                    clientReference: formData.cr,
                    bill: formData.bill,
                    part: formData.parte,
                    qty: formData.cantidad,
                    uomq: formData.uomq,
                    weight: formData.peso,
                    uomw: formData.uomp,
                    recNotes: formData.notas,
                    orderStatus: "Received",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    recTimestamp: d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes(),
                    recUser: user?.email,
                    orderActive: true,
                    recActive: true,
                })
                    .then((docRef) => {
                        handleOpen()
                        setOrderNumber(docRef.id)
                        dispatch(saveReceipt({
                            id: docRef.id,
                            orderId: orden,
                            warehouse: whsName,
                            recZone: formData.zona,
                            client: clientName,
                            carrier: formData.carrier,
                            supplier: formData.proveedor,
                            poNumber: formData.po,
                            clientReference: formData.cr,
                            bill: formData.bill,
                            part: formData.parte,
                            qty: formData.cantidad,
                            uomq: formData.uomq,
                            weight: formData.peso,
                            uomw: formData.uomp,
                            recNotes: formData.notas,
                            orderStatus: "Received",
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            recTimestamp: d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes(),
                            recUser: user?.email,
                            orderActive: true,
                            recActive: true,
                        }))
                        //dispatch(saveReceipt())
                        // console.log("Document written with ID: ", docRef.id);
                        // console.log("mando llamar pdf del save")
                        // crearPDF();
                        // console.log("linea posterior a crearPDF en save")
                        window.setTimeout(() => { history.push("/etiqueta") }, 2000)
                        // history.push("/")
                    })
                    .catch((error) => {
                        console.error("Error creating Receipt: ", error);
                    });
            })
        })
        console.log("New Order ID: ", newOrderId)

    }

    return (
        <div className="receipts">
            <div className="header">
                <h1>Recibos</h1>
                <div className="" style={{ visibility: "visible" }}> <svg id="svg" ref={inputRef} /> </div>
            </div>
            <form className="container" onSubmit={handleSubmit(onSubmit)}>
                <div className="containerHeader">
                    <div className="col1" >
                        <div className="combo">
                            <div className="izq">
                                <select id="selectZona" onChange={selectChange}
                                    ref={register({ required: true })}
                                    name="zona"
                                // value={zoneMain ? zoneMain : ''}
                                >
                                    <option value="" disabled selected > Elegir Zona</option>
                                    {zones.filter(c => c.data.whsId.includes(whsMain)).map(({ id, data: { zoneName, }
                                    }) => (
                                        <option value={zoneName}>{zoneName.substr(0, 25)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="combo">
                            <div className="izq">
                                <input type="text" placeholder="No de Ref del Cliente" className="opcional"
                                    name="cr"
                                    ref={register({ required: false })}
                                    value=''
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col2">
                        <div className="combo">
                            <div className="izq">
                                {/* <p>Proveedor</p> */}
                                <select id="selectProveedor" onChange={selectChange}
                                    ref={register({ required: true })}
                                    name="proveedor"
                                >
                                    <option value="" disabled selected > Elegir Proveedor</option>
                                    {suppliers.map(({ id, data: { name, }
                                    }) => (
                                        <option value={name}>{name?.substr(0, 25)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="combo">
                            <div className="izq">
                                {/* <p>PO Number</p> */}
                                <input type="text" placeholder="No de PO" className="opcional"
                                    name="po"
                                    ref={register({ required: false })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col2">
                        <div className="combo">
                            <select id="selectCarrier" onChange={selectChange}
                                name="carrier"
                                ref={register({ required: true })}
                            >
                                <option value="" disabled selected > Elegir Carrier</option>
                                {carriers.map(({ id, data: { name, }
                                }) => (
                                    <option value={name}>{name?.substr(0, 25)}</option>
                                ))}
                            </select>

                        </div>
                        <div className="combo">
                            <div className="izq">
                                {/* <p>Bill of Lading</p> */}
                                <input type="text" placeholder="123abc" className="opcional"
                                    name="bill"
                                    ref={register({ required: false })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col3">
                        <div className="combo">
                            <textarea placeholder="Notas opcionales" name="notas" id="" cols="30" rows="10"
                                ref={register({ required: false })}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="detCol1">
                        <div className="combo">
                            <div className="izq"><p>Parte</p></div>
                            <select id="selectParte" onChange={selectChange}
                                name="parte"
                                ref={register({ required: true })}
                            >
                                <option value="" disabled selected > Elegir Parte</option>
                                {parts.filter(c => c.data.clientId.includes(clientMain)).map(({ id, data: { partName, }
                                }) => (
                                    <option value={partName}>{partName?.substr(0, 25)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="combo">
                            <div className="izq">
                                <p>Cantidad</p>
                                <input id="cantidad" placeholder="123" type="number" style={{ width: "3rem" }}
                                    name="cantidad"
                                    onChange={selectChange}
                                    ref={register({ required: true })}
                                />
                            </div>
                            <div className="der">
                                <select id="selectUOMqty" onChange={selectChange} style={{ width: "4rem" }}
                                    name="uomq"
                                    ref={register({ required: true })}
                                >
                                    <option value="" disabled selected >UOM</option>
                                    {uoms.filter(c => c.data.type.includes('qty')).map(({ id, data: { name, }
                                    }) => (
                                        <option value={name}>{name?.substr(0, 25)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="combo">
                            <div className="izq"><p>Condición</p></div>
                            <select id="selectCondicion" onChange={selectChange}
                                name="condicion"
                                ref={register({ required: true })}
                            >
                                <option value="" selected disabled>Elegir Condición</option>
                                <option value="Good">Good</option>
                                <option value="Bad">Bad</option>
                            </select>
                        </div>
                        <div className="combo">
                            <div className="izq">
                                <p>Peso</p>
                                <input id="qtyPeso" onChange={selectChange} placeholder="1.23" type="number" step=".01" style={{ width: "3rem" }}
                                    name="peso"
                                    ref={register({ required: true })}
                                />
                            </div>
                            <div className="der">
                                <select id="selectUOMweight" onChange={selectChange} style={{ width: "4rem" }}
                                    name="uomp"
                                    ref={register({ required: true })}
                                >
                                    <option value="" disabled selected >UOM</option>
                                    {uoms.filter(c => c.data.type.includes('weight')).map(({ id, data: { name, }
                                    }) => (
                                        <option value={name}>{name?.substr(0, 25)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="detCol2">

                    </div>
                </div>
                <div className="createClient__options" style={{ justifyContent: "flex-end", marginRight: "50px" }}>
                    <Button
                        className="createReceipt"
                        // variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Guardar
                </Button>
                </div>
            </form>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    ¡¡¡Recibo procesado con éxito con No: {orderNumber}!!!
        </Alert>
            </Snackbar>
        </div>

    )
}


export default Receipts

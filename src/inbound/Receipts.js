import React, { useEffect, useState } from 'react'
import './Receipts.css'
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import firebase from 'firebase'
import { db } from '../firebase';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { saveReceipt, getSavedReceipt, saveOrderId } from '../features/receiptSlice'
import { selectUser } from '../features/userSlice'
import { useBarcode } from 'react-barcodes';
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'
import { selectListClients, selectOpenClientMain } from '../features/clientSlice'
import { selectListParts } from '../features/partSlice'
import { selectListWhss, selectOpenWhsMain } from '../features/whsSlice'
import { selectListZones, selectOpenZone } from '../features/zoneSlice'
import { selectListCarriers } from '../features/carrierSlice'
import { selectListSuppliers } from '../features/supplierSlice'
import { selectListUoms } from '../features/uomSlice'
import ReceiptLine from './ReceiptLine'
import ReceiptLineRecord from './ReceiptLineRecord'

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
    const [receiptLines, setReceiptLines] = useState([])
    const history = useHistory()
    const clients = useSelector(selectListClients)
    const warehouses = useSelector(selectListWhss)
    const zones = useSelector(selectListZones)
    const [filterZ, setFilterZ] = useState([])
    const suppliers = useSelector(selectListSuppliers)
    const carriers = useSelector(selectListCarriers)
    const parts = useSelector(selectListParts)
    const uoms = useSelector(selectListUoms)
    const [filterP, setFilterP] = useState([])
    const [orderNumber, setOrderNumber] = useState([])
    const dispatch = useDispatch()
    const savedReceipt = useSelector(getSavedReceipt)
    const [receipt, setReceipt] = useState()
    const user = useSelector(selectUser);
    const [pn, SetPN] = useState('')
    const [qty, SetQty] = useState()
    const [UOMQ, SetUOMQ] = useState('')
    const [UOMW, SetUOMW] = useState('')
    const [condition, SetCondition] = useState('')
    const [weight, SetWeight] = useState()

    const changePN = (e) => {
        SetPN(e.target.value)
        selectChange(e)
    }
    const changeQTY = (e) => {
        SetQty(e.target.value)
        selectChange(e)
    }
    const changeUOMQ = (e) => {
        SetUOMQ(e.target.value)
        selectChange(e)
    }
    const changeUOMW = (e) => {
        SetUOMW(e.target.value)
        selectChange(e)
        console.log("Target Value: ", e.target.value)
        console.log("UOMW: ", UOMW)
    }
    const changeCondition = (e) => {
        SetCondition(e.target.value)
        selectChange(e)
    }
    const changeWeight = (e) => {
        SetWeight(e.target.value)
        selectChange(e)
    }

    const addLine = () => {
        setReceiptLines([...receiptLines, {
            id: receiptLines.length + 1,
            partNumber: pn,
            qty: qty,
            uomQ: UOMQ,
            condition: condition,
            weight: weight,
            uomW: UOMW,
        }])
        SetPN('')
        SetQty('')
        SetUOMQ('')
        SetCondition('')
        SetWeight('')
        SetUOMW('')
        removeBorderGreen('selectParte')
        removeBorderGreen('cantidad')
        removeBorderGreen('selectUOMqty')
        removeBorderGreen('selectCondicion')
        removeBorderGreen('qtyPeso')
        removeBorderGreen('selectUOMweight')
        console.log('receiptlines:', receiptLines)
    }


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
    function removeBorderGreen(id) {
        document.getElementById(id).classList.remove('borderGreen')
    }
    const onSubmit = (formData) => {
        if (receiptLines.length > 0) {
            let docRef = db.collection("clients").doc(clientMain)
            let clientName = ''
            let whsName = ''
            docRef.get().then((doc) => {
                clientName = doc.data().clientName
            })
            docRef = db.collection("warehouses").doc(whsMain)
            const d = new Date()
            // const newOrderId = getOrderId().then((orden) => {
            const newOrderId =
                docRef.get().then((doc) => {
                    whsName = doc.data().whsName
                    db.collection('inboundOrders').add({
                        // orderId: orden,
                        warehouse: whsName,
                        recZone: formData.zona,
                        client: clientName,
                        carrier: formData.carrier,
                        supplier: formData.proveedor,
                        poNumber: formData.po,
                        clientReference: formData?.cr1,
                        bill: formData.bill,
                        recNotes: formData.notas,
                        orderStatus: "Received",
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        recTimestamp: d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes(),
                        recUser: user?.email,
                        orderActive: true,
                    })
                        .then((docRef) => {
                            let reciboId = ''
                            handleOpen()
                            setOrderNumber(docRef.id)
                            dispatch(saveReceipt({
                                id: docRef.id,
                                // orderId: orden,
                                warehouse: whsName,
                                recZone: formData.zona,
                                client: clientName,
                                carrier: formData.carrier,
                                supplier: formData.proveedor,
                                poNumber: formData.po,
                                clientReference: formData.cr,
                                bill: formData.bill,
                                recNotes: formData.notas,
                                orderStatus: "Received",
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                recTimestamp: d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes(),
                                recUser: user?.email,
                                orderActive: true,
                            }))
                            db.collection('receipts').add({
                                orderId: docRef.id,
                                warehouse: whsName,
                                recZone: formData.zona,
                                client: clientName,
                                carrier: formData.carrier,
                                supplier: formData.proveedor,
                                poNumber: formData.po,
                                clientReference: formData?.cr1,
                                bill: formData.bill,
                                recNotes: formData.notas,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                recTimestamp: d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes(),
                                recUser: user?.email,
                                recActive: true,
                            })
                                .then((rec) => {
                                    console.log(rec)
                                    reciboId = rec.id
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                            //window.setTimeout(() => { history.push("/etiqueta") }, 2000)
                            receiptLines.map(rec => (
                                db.collection('inboundOrderLines').add({
                                    orderId: docRef.id,
                                    lineId: rec.id,
                                    PN: rec.partNumber,
                                    qty: rec.qty,
                                    UOMQ: rec.uomQ,
                                    UOMW: rec.uomW,
                                    condition: rec.condition,
                                    weight: rec.weight,
                                    timestamp: d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes(),
                                    user: user?.email,
                                })
                                    .then((line) => {
                                        db.collection('receiptLines').add({
                                            orderId: docRef.id,
                                            recId: reciboId,
                                            lineId: rec.id,
                                            PN: rec.partNumber,
                                            qty: rec.qty,
                                            UOMQ: rec.uomQ,
                                            UOMW: rec.uomW,
                                            condition: rec.condition,
                                            weight: rec.weight,
                                            timestamp: d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes(),
                                            user: user?.email,
                                        })
                                    })
                            ))
                            receiptLines.map(rec => (
                                db.collection('items').add({
                                    warehouse: whsName,
                                    recZone: formData.zona,
                                    client: clientName,
                                    PN: rec.partNumber,
                                    qty: rec.qty,
                                    UOMQ: rec.uomQ,
                                    timestamp: d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes(),
                                    user: user?.email,
                                    active: true,
                                })
                            ))


                        })
                        .catch((error) => {
                            console.error("Error creating Receipt: ", error);
                            // });
                        })
                })
        }
        else {
            alert('Necesita crear al menos una línea para esta orden!!!')
        }
    }

    return (
        <div className="receipts">
            <div className="header">
                <h1>Recibo Directo</h1>
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
                                    name="cr1"
                                    ref={register({ required: false })}
                                // value=''
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col2">
                        <div className="combo">
                            <div className="izq">
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
                <div className="recLinesHeader">
                    <p>Line No</p>
                    <p>PN</p>
                    <p>QTY </p>
                    <p>UOM</p>
                    <p>Condition</p>
                    <p>Weight</p>
                    <p>UOM</p>
                </div>
                {receiptLines.map(rec => (
                    <ReceiptLineRecord
                        id={rec.id}
                        PN={rec.partNumber}
                        qty={rec.qty}
                        UOMQ={rec.uomQ}
                        UOMW={rec.uomW}
                        condition={rec.condition}
                        weight={rec.weight}
                    // UOMW 	={rec.UOMW}
                    />
                ))}
                <div className="receiptLine">
                    <select id="selectParte" onChange={changePN}
                        name="parte"
                        value={pn}
                    // ref={register({ required: true })}  
                    >
                        <option value="" disabled selected > Elegir Parte</option>
                        {parts.filter(c => c.data.clientId.includes(clientMain)).map(({ id, data: { partName, }
                        }) => (
                            <option value={partName}>{partName?.substr(0, 25)}</option>
                        ))}
                    </select>
                    <input id="cantidad" placeholder="123" type="number" style={{ width: "3rem" }}
                        name="cantidad"
                        value={qty}
                        onChange={changeQTY}
                    // ref={register({ required: true })} 
                    />
                    <select id="selectUOMqty" onChange={changeUOMQ} style={{ width: "4rem" }}
                        name="uomq"
                        value={UOMQ}
                    // ref={register({ required: true })}
                    >
                        <option value="" disabled selected >UOM</option>
                        {uoms.filter(c => c.data.type.includes('qty')).map(({ id, data: { name, }
                        }) => (
                            <option value={name}>{name?.substr(0, 25)}</option>
                        ))}
                    </select>
                    <select id="selectCondicion" onChange={changeCondition}
                        name="condicion"
                        value={condition}
                    // ref={register({ required: true })}  
                    >
                        <option value="" selected disabled>Elegir Condición</option>
                        <option value="Good">Good</option>
                        <option value="Bad">Bad</option>
                    </select>
                    <input id="qtyPeso" onChange={changeWeight} placeholder="1.23" type="number" step=".01" style={{ width: "3rem" }}
                        name="peso"
                        value={weight}
                    // ref={register({ required: true })} 
                    />
                    <select id="selectUOMweight" onChange={changeUOMW} style={{ width: "4rem" }}
                        name="uomp"
                        value={UOMW}
                    // ref={register({ required: true })}
                    >
                        <option value="" disabled selected >UOM</option>
                        {uoms.filter(c => c.data.type.includes('weight')).map(({ id, data: { name, }
                        }) => (
                            <option value={name}>{name?.substr(0, 25)}</option>
                        ))}
                    </select>
                    {/* <div className="createClient__options" style={{ justifyContent: "flex-end", marginRight: "10px" }}> */}
                    <Button
                        className="addLineButton"
                        // variant="contained"
                        color="secondary"
                        // type="submit"
                        onClick={addLine}
                    >
                        Add Line
                </Button>
                    {/* </div> */}
                </div>

                <div className="createClient__options" style={{ justifyContent: "center !important", marginRight: "50px" }}>
                    <Button
                        className="createReceipt"
                        // variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Crear Orden
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

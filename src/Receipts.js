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
import JsBarcode from "jsbarcode"
// import { jsPDF } from "jspdf";

// const doc = new jsPDF();

// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");
// alert("document generated")
// window.setTimeout(function () { JsBarcode("#barcode", "Hi!"); }, 100)


// import { jsPDF } from 'jspdf'
// import 'svg2pdf.js'

// const doc = new jsPDF()
// const x = 0, y = 0, width = 200, height = 100

// JsBarcode("#barcode", "franco");

// const element = document.getElementById('svg')
// doc
//     .svg(element, {
//         x,
//         y,
//         width,
//         height
//     })
//     .then(() => {
//         // save the created pdf
//         doc.save('myPDF.pdf')
//     })

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
    const history = useHistory()
    const [clients, setClients] = useState([])
    const [warehouses, setWarehouses] = useState([])
    const [zones, setZones] = useState([])
    const [filterZ, setFilterZ] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [carriers, setCarriers] = useState([])
    const [parts, setParts] = useState([])
    const [uoms, setUOMs] = useState([])
    const [filterP, setFilterP] = useState([])
    const [orderNumber, setOrderNumber] = useState([])


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



    useEffect(() => {
        // getDoc()
        db.collection("clients")
            .orderBy('clientName', 'asc')
            .get()
            .then(snapshot =>
                setClients(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ))
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        db.collection("warehouses")
            .orderBy('whsName', 'asc')
            .get()
            .then(snapshot =>
                setWarehouses(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ))
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        db.collection("zones")
            .orderBy('zoneName', 'asc')
            .get()
            .then(snapshot =>
                setZones(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ))
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        db.collection("suppliers")
            .orderBy('name', 'asc')
            .get()
            .then(snapshot =>
                setSuppliers(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ))
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        db.collection("carriers")
            .orderBy('name', 'asc')
            .get()
            .then(snapshot =>
                setCarriers(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ))
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        db.collection("parts")
            .orderBy('partName', 'asc')
            .get()
            .then(snapshot =>
                setParts(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ))
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        db.collection("uoms")
            .orderBy('name', 'asc')
            .get()
            .then(snapshot =>
                setUOMs(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                ))
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [])

    function bodegaChange(e) {
        setFilterZ(e.target.value)
        // console.log(e)
        selectChange(e)
    }
    function clientChange(e) {
        setFilterP(e.target.value)
        selectChange(e)
    }
    function selectChange(e) {
        // console.log(e.target.value)
        // document.getElementById(e.target.id).style.cssText = "border: 1px solid #25cc88"
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
        docRef.get().then((doc) => {
            whsName = doc.data().whsName
            db.collection('receipts').add({
                warehouse: whsName,
                zone: formData.zona,
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
                notes: formData.notas,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
                .then((docRef) => {
                    handleOpen()
                    setOrderNumber(docRef.id)
                    console.log("Document written with ID: ", docRef.id);
                    window.setTimeout(() => { history.push("/") }, 2000)
                    // history.push("/")
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        })
        // whsName = db.collection("warehouses").doc(formData.bodega);

        //alert("record saved")
        // handleOpen(docRef.id)
    }

    return (
        <div className="receipts">
            <div className="header">
                <h1>Recibos</h1>
                <svg id="barcode"></svg>
            </div>
            <form className="container" onSubmit={handleSubmit(onSubmit)}>
                <div className="containerHeader">
                    <div className="col1" >
                        <div className="combo">
                            <div className="izq">
                                <p>Bodega</p>
                                <div className="checkError">
                                    <select id="selectBodega" onChange={bodegaChange}
                                        ref={register({ required: true })}
                                        name="bodega"
                                    >
                                        <option value="" disabled selected > Elegir Bodega</option>
                                        {warehouses.map(({ id, data: { whsName, }
                                        }) => (
                                            <option value={id}>{whsName.substr(0, 25)}</option>
                                        ))}
                                    </select>
                                    {/* {errors.bodega && <p className="createClient__error">Campo Requerido...</p>} */}
                                </div>
                            </div>
                            <div className="der">
                            </div>
                        </div>
                        <div className="combo">
                            <div className="izq">
                                <p>Zona</p>
                                <select id="selectZona" onChange={selectChange}
                                    ref={register({ required: true })}
                                    name="zona"
                                >
                                    <option value="" disabled selected > Elegir Locación</option>
                                    {zones.filter(c => c.data.whsId.includes(filterZ)).map(({ id, data: { zoneName, }
                                    }) => (
                                        <option value={zoneName}>{zoneName.substr(0, 25)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col2">
                        <div className="combo">
                            <div className="izq">
                                <p>Cliente</p>
                                <select id="selectCliente" onChange={clientChange}
                                    name="cliente"
                                    ref={register({ required: true })}
                                >
                                    <option value="" disabled selected > Elegir Cliente</option>
                                    {clients.map(({ id, data: { clientName, }
                                    }) => (
                                        <option value={id}>{clientName.substr(0, 25) + "..."}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="der">
                            </div>
                        </div>
                        <div className="combo">
                            <div className="izq">
                                <p>Client Ref.</p>
                                <input type="text" placeholder="No de Referencia" className="opcional"
                                    name="cr"
                                    ref={register({ required: false })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col2">
                        <div className="combo">
                            <div className="izq">
                                <p>Proveedor</p>
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
                                <p>PO Number</p>
                                <input type="text" placeholder="No de PO" className="opcional"
                                    name="po"
                                    ref={register({ required: false })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col3">
                        <div className="combo">
                            <div className="izq">
                                <p>Carrier Level</p>
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
                            <div className="der">
                            </div>
                        </div>
                        <div className="combo">
                            <div className="izq">
                                <p>Bill of Lading</p>
                                <input type="text" placeholder="123abc" className="opcional"
                                    name="bill"
                                    ref={register({ required: false })}
                                />
                            </div>
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
                                {parts.filter(c => c.data.clientId.includes(filterP)).map(({ id, data: { partName, }
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
                        <h3>Notas</h3>
                        <textarea placeholder="Notas opcionales" name="notas" id="" cols="30" rows="10"
                            ref={register({ required: false })}
                        ></textarea>
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

import React, { useEffect, useState } from 'react'
import './Receipts.css'
import { Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import firebase from 'firebase'
import { db } from './firebase';

function Receipts() {
    const [clients, setClients] = useState([])
    const [warehouses, setWarehouses] = useState([])
    const [zones, setZones] = useState([])
    const [filterZ, setFilterZ] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [carriers, setCarriers] = useState([])
    const [parts, setParts] = useState([])
    const [uoms, setUOMs] = useState([])
    const [filterP, setFilterP] = useState([])

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
        getDoc()
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
        // setFilterZ(warehouses.slice(0, 1).shift().id)
        db.collection('zones')
            .orderBy('zoneName', 'asc')
            .onSnapshot(snapshot =>
                setZones(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
        db.collection('suppliers')
            .orderBy('name', 'asc')
            .onSnapshot(snapshot =>
                setSuppliers(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
        db.collection('carriers')
            .orderBy('name', 'asc')
            .onSnapshot(snapshot =>
                setCarriers(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
        db.collection('parts')
            .orderBy('partName', 'asc')
            .onSnapshot(snapshot =>
                setParts(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
        db.collection('uoms')
            .orderBy('name', 'asc')
            .onSnapshot(snapshot =>
                setUOMs(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            )
    }, [])

    function bodegaChange(e) {
        setFilterZ(e.target.value)
        selectChange(e)
    }
    function clientChange(e) {
        setFilterP(e.target.value)
        selectChange(e)
    }
    function selectChange(e) {
        console.log(e.target.id)
        // document.getElementById(e.target.id).style.cssText = "border: 1px solid #25cc88"
        document.getElementById(e.target.id).classList.add('borderGreen')
    }
    const onSubmit = (formData) => {
        // alert("on submit")
        console.log(formData)
        db.collection('receipts').add({
            warehouse: formData.bodega,
            zone: formData.zona,
            client: formData.cliente,
            carrier: formData.carrier,
            supplier: formData.proveedor,
            bill: formData.bill,
            part: formData.parte,
            qty: formData.cantidad,
            uomq: formData.uomq,
            weight: formData.peso,
            uomw: formData.uomp,
            notes: formData.notas,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        alert("record saved")
        // dispatch(closeCreateClient())
    }

    return (
        <div className="receipts">
            <div className="header">
                <h1>Recibos</h1>
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
                                        <option value={id}>{zoneName.substr(0, 25)}</option>
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
                                <p>Proveedor</p>
                                <select id="selectProveedor" onChange={selectChange}
                                    ref={register({ required: true })}
                                    name="proveedor"
                                >
                                    <option value="" disabled selected > Elegir Proveedor</option>
                                    {suppliers.map(({ id, data: { name, }
                                    }) => (
                                        <option value={id}>{name?.substr(0, 25)}</option>
                                    ))}
                                </select>
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
                                        <option value={id}>{name?.substr(0, 25)}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="der">
                            </div>
                        </div>
                        <div className="combo">
                            <div className="izq">
                                <p>Bill of Lading</p>
                                <input type="text" placeholder="Introducir número" className="opcional"
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
                                    <option value={id}>{partName?.substr(0, 25)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="combo">
                            <div className="izq">
                                <p>Cantidad</p>
                                <input id="cantidad" placeholder="???" type="text" style={{ width: "3rem" }}
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
                                        <option value={id}>{name?.substr(0, 25)}</option>
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
                                <option value="1" selected disabled>Elegir Condición</option>
                                <option value="1">Good</option>
                                <option value="2">Bad</option>
                            </select>
                        </div>
                        <div className="combo">
                            <div className="izq">
                                <p>Peso</p>
                                <input id="qtyPeso" onChange={selectChange} placeholder="???" type="text" style={{ width: "3rem" }}
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
                                        <option value={id}>{name?.substr(0, 25)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="detCol2">
                        <h3>Notas</h3>
                        <textarea placeholder="Notas opcionales" name="notas" id="" cols="30" rows="10"
                            ref={register({ required: true })}
                        ></textarea>
                    </div>
                </div>
                <div className="createClient__options">
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

        </div>
    )
}


export default Receipts

import React from 'react'
import { useSelector } from "react-redux"
import { selectClientMain, selectOpenClientMain } from '../features/clientSlice'
import { selectOpenWhsMain, selectWhsMain } from '../features/whsSlice'
import './CreateOrders.css'
import { FilePicker, ImagePicker } from 'react-file-picker'
import readXlsxFile from 'read-excel-file'
import { db } from '../firebase';



function CreateOrders() {
    const whsMain = useSelector(selectOpenWhsMain)
    const clientMain = useSelector(selectOpenClientMain)
    const createOrders = () => {
        const input = document.getElementById('input2')
        readXlsxFile(input.files[0]).then((rows) => {
            rows.map(col => createRecords(col))
        })
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
                .then(() => {
                    console.log("Document successfully written!");
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

    return (
        <div>
            <label className="custom-file-upload" >
                <input type="file" id="input2" />
                <i className="fa fa-cloud-upload" /> Attach
        </label>
            <button onClick={createOrders}>Crear Ordenes</button>
        </div >
    )
}

export default CreateOrders

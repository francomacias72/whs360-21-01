import React, { useEffect, useState } from 'react'
import { useBarcode } from 'react-barcodes';
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'
import { useSelector, } from 'react-redux'
import { getSavedReceipt, selectReciboFranco } from './features/receiptSlice'



function Etiqueta() {
    const selectedReceipt = useSelector(getSavedReceipt)
    console.log(selectedReceipt)
    function crearPDF() {
        let fSize1 = 14, fSize2 = 12, fSize3 = 10, fSize4 = 8, fSizeDetails = 7
        let rowSize = .25, y = .25, x = .25
        var d = new Date();
        var recibotime = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
        const doc = new jsPDF({
            // orientation: "landscape",
            unit: "in",
            format: [4, 6]
        })
        // first need to set text
        doc.setFont('Helvetica', 'bold')
        doc.setFontSize(fSize2)
        doc.text("Sustaita Forwarding L.L.C.", 2, y, { align: 'center' })
        y += rowSize
        doc.setFontSize(fSize1)
        doc.text("Recibo de Inventario", 2, y, { align: 'center' })
        // doc.text(selectedReceipt.orderId.toString(), 1, 1)
        y += rowSize * 2
        doc.setFontSize(fSize2)
        doc.text("No. de Orden: SF-0000" + selectedReceipt.orderId + "-21", x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Cliente: " + selectedReceipt.client, x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Proveer: " + selectedReceipt.supplier, x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Carrier: " + selectedReceipt.carrier, x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Referencia: " + selectedReceipt.clientReference, x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Tracking: " + selectedReceipt.bill, x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Tipo Embarque: " + "Paqueteria???", x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("No Caja: " + "", x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("No Parte: " + selectedReceipt.part, x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Sección: " + selectedReceipt.zone, x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Peso: " + selectedReceipt.weight + " " + selectedReceipt.uomw, x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Cantidad: " + selectedReceipt.qty + " " + selectedReceipt.uomq, x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Recibido: " + recibotime, x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Usuario: " + selectedReceipt.user, x, y, { align: 'left' })
        y += rowSize
        doc.setFontSize(fSize3)
        doc.text("Notas: *" + selectedReceipt.notes.substr(0, 43) + "*", x, y, { align: 'left' })
        y += .2
        doc.setFontSize(fSize3)
        doc.text("" + selectedReceipt.notes.substr(43, 52) + "*", x, y, { align: 'left' })
        y += .2
        doc.setFontSize(fSize3)
        doc.text("" + selectedReceipt.notes.substr(95, 52) + "*", x, y, { align: 'left' })

        //then I can insert the barcode and open document
        console.log("timestamp: ", selectedReceipt.recTimestamp)
        const width = 4, height = .8
        y = 5
        const element = document.getElementById('svg')

        doc
            .svg(element, {
                x,
                y,
                width,
                height
            })
            .then(() => {

                window.open(doc.output('bloburl'), '_blank')
            })
    }
    const { inputRef } = useBarcode({
        // value: selectedReceipt.id,
        value: "*SF04370/21*",
        format: "CODE39",
        options: {
            // background: '#ccffff',
            //displayValue: false,

        }
    });
    return (
        <div>
            <div className="" style={{ visibility: "hidden" }}> <svg id="svg" ref={inputRef} /> </div>
            <button onClick={crearPDF}>crear</button>
        </div>
    )
}
export default Etiqueta

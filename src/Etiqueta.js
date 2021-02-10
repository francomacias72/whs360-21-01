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
                // doc.save('myPDF.pdf')
                window.open(doc.output('bloburl'), '_blank')
            })
    }
    const { inputRef } = useBarcode({
        // value: 'franco macias',
        value: selectedReceipt.orderId,
        options: {
            // background: '#ccffff',
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

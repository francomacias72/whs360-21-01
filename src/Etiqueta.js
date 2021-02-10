import React from 'react'
import { useBarcode } from 'react-barcodes';
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'



function Etiqueta() {
    function crearPDF() {
        const doc = new jsPDF()
        const x = 0, y = 0, width = 200, height = 100

        // JsBarcode("#barcode", "franco");

        const element = document.getElementById('svg')
        doc
            .svg(element, {
                x,
                y,
                width,
                height
            })
            .then(() => {
                // save the created pdf
                doc.save('myPDF.pdf')
                // alert('saved')
            })
    }
    const { inputRef } = useBarcode({
        value: 'franco macias',
        options: {
            background: '#ccffff',
        }
    });
    return (
        <div>
            {/* <barcode type="code128b">Hello</barcode> */}
            <div className="" style={{ visibility: "hidden" }}> <svg id="svg" ref={inputRef} /> </div>
            <button onClick={crearPDF}>crear</button>

        </div>
    )
}

export default Etiqueta

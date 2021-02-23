import React from 'react'
import './ReceiptLineRecord.css'

function ReceiptLineRecord(props) {
    // const parte = PN
    return (
        <div className='receiptLineRecord'>
            <p>{props.id}</p>
            <p>{props.PN}</p>
            <p>{props.qty}</p>
            <p>{props.UOMQ}</p>
            <p>{props.condition}</p>
            <p>{props.weight}</p>
            <p>{props.UOMW}</p>
            {/* {props.PN}, QTY: {props.qty}, UOMQ: {props.UOMQ}, Condicion: {props.condition},
               Weight: {props.weight}, UOMW2: {props.UOMW} */}
        </div>
    )
}

export default ReceiptLineRecord

import React from 'react'
import './ReceiptLine.css'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectOpenClientMain } from '../features/clientSlice'
import { selectListParts } from '../features/partSlice'
import { selectListUoms } from '../features/uomSlice'

function ReceiptLine() {
    const clientMain = useSelector(selectOpenClientMain)
    const parts = useSelector(selectListParts)
    const uoms = useSelector(selectListUoms)

    const { register } = useForm();

    function selectChange(e) {
        document.getElementById(e.target.id).classList.add('borderGreen')
    }
    return (
        <div className="receiptLine">
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
            <input id="cantidad" placeholder="123" type="number" style={{ width: "3rem" }}
                name="cantidad"
                onChange={selectChange}
                ref={register({ required: true })}
            />
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
            <select id="selectCondicion" onChange={selectChange}
                name="condicion"
                ref={register({ required: true })}
            >
                <option value="" selected disabled>Elegir Condición</option>
                <option value="Good">Good</option>
                <option value="Bad">Bad</option>
            </select>
            <input id="qtyPeso" onChange={selectChange} placeholder="1.23" type="number" step=".01" style={{ width: "3rem" }}
                name="peso"
                ref={register({ required: true })}
            />
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
    )
}

export default ReceiptLine

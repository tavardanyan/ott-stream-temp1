import { useState } from "react"

export function Checkbox(params) {
    let { id, checked, disabled, isBlock, cb } = params
    const [select, setSelected] = useState(checked)
    const check = () => {
        if (!isBlock) {
            setSelected(!select)
            cb(id, select)
        }
    }

    return <div className="G-checkbox" onClick={() => check()}>
        <div className={`checkbox-marker  ${select ? 'checkbox-marker-active' : ''} ${disabled ? 'checkbox-marker-disabled' : ''}`}></div>
    </div>
}
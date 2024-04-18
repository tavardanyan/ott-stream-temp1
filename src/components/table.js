import { useState } from "react"

export function Table(props) {
    const { cols, rows } = props
    const [columns, setColumns] = useState(cols())


    return <div className="G-table">
        <div className="table-headers">
            {columns.length && columns.map((item, index) => <div key={index} className="table-col">{item}</div>)}
        </div>
        <div className="table-rows">
            <div className="table-col">Hopar</div>
            <div className="table-col">55</div>
            <div className="table-col">Gexam</div>
        </div>
    </div>
}
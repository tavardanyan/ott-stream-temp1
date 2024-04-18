export function Modal(props) {
    return <div className="G-modal-wrap">
        <div className="G-modal">
            {props.children}
        </div>
    </div>
}
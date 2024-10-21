const Modal = ({ isOpen, onClose, onConfirm, eventNames }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirm Deletion</h2>
                <p>You are about to delete the user and all associated events:</p>
                <ul>
                    {Array.isArray(eventNames) && eventNames.map((event, index) => (
                        <li key={index}>{event.name}</li>
                    ))}
                </ul>
                <p>Do you want to proceed?</p>
                <button onClick={onConfirm}>Yes, Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default Modal;

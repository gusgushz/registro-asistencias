import React from "react";
import "./modalScanner.css";

interface ModalScannerProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const ModalScanner: React.FC<ModalScannerProps> = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Registro de Asistencia:</h2>
                <div style={{ whiteSpace: 'pre-line' }}>
                    {message}
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ModalScanner;

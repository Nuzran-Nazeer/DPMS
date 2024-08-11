import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
                {children}
                <button className="absolute top-2 right-2" onClick={onClose}>
                    ✖️
                </button>
            </div>
        </div>
    );
};

export default Modal;

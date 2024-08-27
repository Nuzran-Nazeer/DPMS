import React, { useState } from "react";

export default function Popup({ setIsOpen, children }) {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          {children}
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="bg-sky-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function Popup({ setIsOpen, children }) {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-2 rounded-lg shadow-lg max-w-md w-full text-center mt-16">
          {children}
        </div>
      </div>
    </div>
  );
}

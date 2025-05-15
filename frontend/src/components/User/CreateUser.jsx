import React, { useState } from "react";
import RegistrationForm from '../RegistrationForm';

// const [isOpen, setIsOpen] = useState(false);

const CreateUser = ({ setIsOpen }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create New User</h2>
      <RegistrationForm onSuccess={() => setIsOpen(false)} />
      <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="bg-sky-500 mt-2 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
    </div>
  );
};

export default CreateUser;

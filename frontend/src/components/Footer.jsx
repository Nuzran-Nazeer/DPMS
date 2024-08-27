import React from 'react';

const Footer = () => {
  return (
    <footer className="absolute bottom-4 text-center text-gray-600">
      <div className=" mx-60 text-center item">
        <p className="text-sm">© {new Date().getFullYear()} Drug Prevention & Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

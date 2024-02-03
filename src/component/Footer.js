import React from 'react';

const Footer = () => {
  return (
    <footer className="sticky-footer bg-gradient-light">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright &copy; TrucksUp {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

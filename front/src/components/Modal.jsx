// Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #31322F;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`;

const Button = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  color: white;
  

  &:hover {
    background-color: #A5A5A5;
    color: black;
  }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        {children}
        <Button onClick={onClose}>Cerrar</Button>
      </ModalContent>
    </ModalOverlay>,
    document.getElementById('modal-root') // El contenedor para el modal debe estar en el HTML
  );
};

export default Modal;

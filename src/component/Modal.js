import React, { useEffect, useState } from "react";

function Modal({ isOpen, onClose, children }) {
    
  const [modalState, setModalState] = useState(isOpen);
 

  const closeModal = () => {
    setModalState(false);
    onClose();
  };

  const contentStyle={

    backgroundColor: "#fefefe",
        margin: "15% auto",
        padding: "20px",
        border: "1px solid #888",
        width: "80%",

  }

  useEffect(()=>{

      setModalState(isOpen)
    

    

  },[isOpen])


  const modalStyle={
    display: modalState ? "block" : "none",
    position: "fixed",
    zIndex: "1",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.4)",
  }

  
  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <span style={{ float: "right" }} onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

export default Modal;

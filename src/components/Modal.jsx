import React from 'react';
import styles from './Modal.module.css'; 

function Modal({ children, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={(e) => { e.stopPropagation(); onClose(); }}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

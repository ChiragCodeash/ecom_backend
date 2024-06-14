import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const CustomeModal = ({
  show,
  handleClose,
  children,
  centered,
  size,
  dialogClassName,
  title,
  backdrop,
  onSubmit,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size={size || "lg"}
        centered={centered || false}
        backdrop={backdrop || "static"}
        dialogClassName={{ ...dialogClassName }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" id="modalSubmitBtn" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomeModal;

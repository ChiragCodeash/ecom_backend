import React, { useState } from "react";
import TextEditor from "./common/TextEditor";
import CustomeModal from "./common/CustomeModal";

const Dashboard = () => {
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <TextEditor />
      <button onClick={handleOpen}>Open Modal</button>
      <CustomeModal handleClose={handleClose} show={show}>
        This is Custome Modal
      </CustomeModal>
    </>
  );
};

export default Dashboard;

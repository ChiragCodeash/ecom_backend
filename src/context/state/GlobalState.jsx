import React, { useState } from "react";
import { GlobalContext } from "../CreateContext";

const GlobalState = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [loading , setLoading] = useState({
    GET_PRODUCT : true,
    GET_VARIANT : false,
    CREATE_VARIANT  : false,
    CREATE_PRODUCT : false,
    GET_ADD_VARIANT : true
  })
  const DefaultObj = { collapsed, setCollapsed , loading , setLoading };

  return (
    <GlobalContext.Provider value={DefaultObj}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;

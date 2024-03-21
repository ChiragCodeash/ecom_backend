import React from "react";
import { GlobalContext } from "../CreateContext";

const GlobalState = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const DefaultObj = { collapsed, setCollapsed };
  return (
    <GlobalContext.Provider value={DefaultObj}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;

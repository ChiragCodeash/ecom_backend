import React from "react";

const Loading = ({ type }) => {
  switch (type) {
    case "button":
      return (  <>
       <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      />
      <span className=""> Loading...</span>
      </>
      )
      break;

    default:
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
      break;
  }
};

export default Loading;

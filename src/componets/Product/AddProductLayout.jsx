import React from "react";
import { Link, Outlet } from "react-router-dom";

const AddProductLayout = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            {/* Page header */}
            <div className="mb-5">
              <h3 className="mb-0 ">Create Product</h3>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductLayout;

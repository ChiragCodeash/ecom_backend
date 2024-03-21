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
          {/* row */}
          {/* <div className="row">
            <div className="col-xxl-12 col-12">
              <div>
                <div id="stepperForm" className="bs-stepper">
                  <div
                    className="bs-stepper-header p-0 bg-transparent mb-4"
                    role="tablist"
                  >
                    <div className="step active" data-target="#test-l-1">
                      <button
                        type="button"
                        className="step-trigger"
                        role="tab"
                        id="stepperFormtrigger1"
                        aria-controls="test-l-1"
                        aria-selected="true"
                      >
                        <span className="bs-stepper-circle me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-users icon-xs"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx={9} cy={7} r={4} />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </span>
                        <Link to={"/addproduct"} className="bs-stepper-label">
                          Basic Information
                        </Link>
                      </button>
                    </div>
                    <div className="bs-stepper-line" />

                    <div className="step" data-target="#test-l-2">
                      <button
                        type="button"
                        className="step-trigger"
                        role="tab"
                        id="stepperFormtrigger2"
                        aria-controls="test-l-2"
                        aria-selected="false"
                      >
                        <span className="bs-stepper-circle me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-shopping-bag icon-xs"
                          >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1={3} y1={6} x2={21} y2={6} />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                          </svg>
                        </span>
                        <Link
                          to={"/addproduct/createvariant"}
                          className="bs-stepper-label"
                        >
                          Variant Information
                        </Link>
                      </button>
                    </div>
                    <div className="bs-stepper-line" />

                    <div className="step" data-target="#test-l-3">
                      <button
                        type="button"
                        className="step-trigger"
                        role="tab"
                        id="stepperFormtrigger3"
                        aria-controls="test-l-3"
                        aria-selected="false"
                      >
                        <span className="bs-stepper-circle me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-credit-card icon-xs"
                          >
                            <rect
                              x={1}
                              y={4}
                              width={22}
                              height={16}
                              rx={2}
                              ry={2}
                            />
                            <line x1={1} y1={10} x2={23} y2={10} />
                          </svg>
                        </span>
                        <span className="bs-stepper-label">
                          Confirm Listing
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="row">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductLayout;

import React, { useContext } from "react";
import { GlobalContext } from "../../context/CreateContext";
import Dropdown from "react-bootstrap/Dropdown";
import {
  DropdownDivider,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const { setCollapsed, collapsed } = useContext(GlobalContext);
  const logout =()=>{
    localStorage.removeItem("token")
    navigate("/login")
  } 
  return (
    <>
      <div
        className="navbar-custom navbar navbar-expand-lg"
        style={{ left: collapsed ? 0 : "" }}
      >
        <div className="container-fluid px-0">
          <a className="navbar-brand d-block d-md-none" href="index.html">
            <img src="/assets/images/brand/logo/logo-2.svg" alt="Image" />
          </a>
          <a
            onClick={() => setCollapsed(!collapsed)}
            className="ms-auto ms-md-0 me-0 me-lg-3 pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              fill="currentColor"
              className="bi bi-text-indent-left text-muted"
              viewBox="0 0 16 16"
            >
              <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
          </a>
          <div className="d-none d-md-none d-lg-block">
            {/* Form */}
            <form action="#">
              <div className="input-group ">
                <input
                  className="form-control rounded-3"
                  type="search"
                  defaultValue=""
                  id="searchInput"
                  placeholder="Search"
                />
                <span className="input-group-append">
                  <button
                    className="btn  ms-n10 rounded-0 rounded-end"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={15}
                      height={15}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-search text-dark"
                    >
                      <circle cx={11} cy={11} r={8} />
                      <line x1={21} y1={21} x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </span>
              </div>
            </form>
          </div>
          {/*Navbar nav */}
          <ul className="navbar-nav navbar-right-wrap ms-lg-auto d-flex nav-top-wrap align-items-center ms-4 ms-lg-0">
            <a
              href="#"
              className="form-check form-switch theme-switch btn btn-ghost btn-icon rounded-circle mb-0 "
            >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              />
            </a>
            <li className="dropdown stopevent ms-2">
              <a
                className="btn btn-ghost btn-icon rounded-circle"
                href="#!"
                role="button"
                id="dropdownNotification"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
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
                  className="feather feather-bell icon-xs"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </a>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end"
                aria-labelledby="dropdownNotification"
              >
                <div>
                  <div className="border-bottom px-3 pt-2 pb-3 d-flex justify-content-between align-items-center">
                    <p className="mb-0 text-dark fw-medium fs-4">
                      Notifications
                    </p>
                    <a href="#!" className="text-muted">
                      <span>
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
                          className="feather feather-settings me-1 icon-xs"
                        >
                          <circle cx={12} cy={12} r={3} />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                      </span>
                    </a>
                  </div>
                  <div data-simplebar="init" style={{ height: 250 }}>
                    <div className="simplebar-wrapper" style={{ margin: 0 }}>
                      <div className="simplebar-height-auto-observer-wrapper">
                        <div className="simplebar-height-auto-observer" />
                      </div>
                      <div className="simplebar-mask">
                        <div
                          className="simplebar-offset"
                          style={{ right: 0, bottom: 0 }}
                        >
                          <div
                            className="simplebar-content-wrapper"
                            tabIndex={0}
                            role="region"
                            aria-label="scrollable content"
                            style={{ height: "auto", overflow: "hidden" }}
                          >
                            <div
                              className="simplebar-content"
                              style={{ padding: 0 }}
                            >
                              {/* List group */}
                              <ul className="list-group list-group-flush notification-list-scroll">
                                {/* List group item */}
                                <li className="list-group-item bg-light">
                                  <a href="#!" className="text-muted">
                                    <h5 className=" mb-1">Rishi Chopra</h5>
                                    <p className="mb-0">
                                      Mauris blandit erat id nunc blandit, ac
                                      eleifend dolor pretium.
                                    </p>
                                  </a>
                                </li>
                                {/* List group item */}
                                <li className="list-group-item">
                                  <a href="#!" className="text-muted">
                                    <h5 className=" mb-1">Neha Kannned</h5>
                                    <p className="mb-0">
                                      Proin at elit vel est condimentum
                                      elementum id in ante. Maecenas et sapien
                                      metus.
                                    </p>
                                  </a>
                                </li>
                                {/* List group item */}
                                <li className="list-group-item">
                                  <a href="#!" className="text-muted">
                                    <h5 className=" mb-1">Nirmala Chauhan</h5>
                                    <p className="mb-0">
                                      Morbi maximus urna lobortis elit
                                      sollicitudin sollicitudieget elit vel
                                      pretium.
                                    </p>
                                  </a>
                                </li>
                                {/* List group item */}
                                <li className="list-group-item">
                                  <a href="#!" className="text-muted">
                                    <h5 className=" mb-1">Sina Ray</h5>
                                    <p className="mb-0">
                                      Sed aliquam augue sit amet mauris volutpat
                                      hendrerit sed nunc eu diam.
                                    </p>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="simplebar-placeholder"
                        style={{ width: 0, height: 0 }}
                      />
                    </div>
                    <div
                      className="simplebar-track simplebar-horizontal"
                      style={{ visibility: "hidden" }}
                    >
                      <div
                        className="simplebar-scrollbar"
                        style={{ width: 0, display: "none" }}
                      />
                    </div>
                    <div
                      className="simplebar-track simplebar-vertical"
                      style={{ visibility: "hidden" }}
                    >
                      <div
                        className="simplebar-scrollbar"
                        style={{ height: 0, display: "none" }}
                      />
                    </div>
                  </div>
                  <div className="border-top px-3 py-2 text-center">
                    <a href="#!" className="text-inherit ">
                      View all Notifications
                    </a>
                  </div>
                </div>
              </div>
            </li>
            {/* List */}
            <Dropdown className="ms-2">
              <Dropdown.Toggle as={"a"} bsPrefix="a">
                <div className="avatar avatar-md avatar-indicators avatar-online pointer">
                  <img
                    alt="avatar"
                    src="/assets/images/avatar/avatar-11.jpg"
                    className="rounded-circle"
                  />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="mt-4 ">
                <Dropdown.Item className="fw-bold">Chirag
                  
                </Dropdown.Item>
                <DropdownDivider></DropdownDivider>
                <Dropdown.Item>
                  <div>
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
                      className="feather feather-user me-2 icon-xxs dropdown-item-icon"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    Profile
                  </div>
                </Dropdown.Item>

                <Dropdown.Item>
                  <div>
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
                      className="feather feather-settings me-2 icon-xxs dropdown-item-icon"
                    >
                      <circle cx={12} cy={12} r={3} />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    Setting
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={logout}>
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
                      className="feather feather-power me-2 icon-xxs dropdown-item-icon"
                    >
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                      <line x1={12} y1={2} x2={12} y2={12} />
                    </svg>
                    Sigh out
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

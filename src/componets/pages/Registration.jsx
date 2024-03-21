import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CPasswordValidation,
  EmailValidation,
  PasswordValidation,
  UserNameValidation,
} from "../../Validation";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/CreateContext";

const Registration = () => {
  const navigate = useNavigate()
  const {Registration} = useContext(AuthContext)
  const [RegiData, setRegiData] = useState({
    uname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [isChecked, setChecked] = useState(false);

  const handleForm = (e) => {
    setRegiData({ ...RegiData, [e.target.name]: e.target.value });
  };

  const validation = () => {
    var isValidate;
    isValidate = UserNameValidation(RegiData.uname);
    if (!isValidate.status) {
      return isValidate;
    }
    isValidate = EmailValidation(RegiData.email);
    if (!isValidate.status) {
      return isValidate;
    }
    isValidate = PasswordValidation(RegiData.password);
    if (!isValidate.status) {
      return isValidate;
    }
    isValidate = CPasswordValidation(RegiData.password, RegiData.cpassword);
    if (!isValidate.status) {
      return isValidate;
    }
    if (!isChecked) {
      return {
        status: false,
        message: "Please Check Term And Condition",
      };
    }

    return { status: true };
  };

  const submitForm = (e) => {
    e.preventDefault();
    const ValidationMsg = validation();
    if (!ValidationMsg.status) {
      toast.success(ValidationMsg.message, {
        position: "top-right",
      });
    } else {
      Registration(RegiData)
      // navigate("/login")
    }
  };

  return (
    <>
      <main className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center g-0 min-vh-100">
          <div className="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
            <a
              href="#"
              className="form-check form-switch theme-switch btn btn-light btn-icon rounded-circle d-none"
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
            {/* Card */}
            <div className="card smooth-shadow-md">
              {/* Card body */}
              <div className="card-body p-6">
                <div className="mb-4">
                  <a href="../index.html">
                    <img
                      src="../assets/images/brand/logo/logo-2.svg"
                      className="mb-2  text-inverse"
                      alt="Image"
                    />
                  </a>
                  <p className="mb-6">Please enter your user information.</p>
                </div>
                {/* Form */}
                <form>
                  {/* Username */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      User Name
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      name="uname"
                      placeholder="User Name"
                      value={RegiData.uname}
                      onChange={handleForm}
                    />
                  </div>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="Email address here"
                      value={RegiData.email}
                      onChange={handleForm}
                    />
                  </div>
                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      value={RegiData.password}
                      onChange={handleForm}
                    />
                  </div>
                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="cpassword"
                      className="form-control"
                      name="cpassword"
                      placeholder="**************"
                      value={RegiData.cpassword}
                      onChange={handleForm}
                    />
                  </div>
                  {/* Checkbox */}
                  <div className="mb-3">
                    <div className="form-check custom-checkbox">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreeCheck"
                        name="tandc"
                        checked={RegiData.tandc}
                        onChange={() => {
                          setChecked(!isChecked);
                        }}
                      />
                      <label className="form-check-label" htmlFor="agreeCheck">
                        <span className="fs-5">
                          I agree to the{" "}
                          <a href="terms-condition-page.html">
                            Terms of Service{" "}
                          </a>
                          and
                          <a href="terms-condition-page.html">
                            Privacy Policy.
                          </a>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    {/* Button */}
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={submitForm}
                      >
                        Create Free Account
                      </button>
                    </div>
                    <div className="d-md-flex justify-content-between mt-4">
                      <div className="mb-2 mb-md-0">
                        <Link to={"/login"} className="fs-5">
                          Already member? Login{" "}
                        </Link>
                      </div>
                      <div>
                        <Link
                          to={"/resetpass"}
                          className="text-inherit
                  fs-5"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Registration;
